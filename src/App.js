import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Verify from "./Components/Register/Verify";

import TopNavbar from "./Components/Navbar/Top";
import LeftSidebar from "./Components/Navbar/LeftSide";
import Home from "./Components/Home/Home";
import JobForm from "./Components/Home/AddJob";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <TopNavbar />
      <LeftSidebar />
      <div className="ml-20 mt-16 p-6">
        {/* Render the child routes here */}
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without layout */}
        <Route path="/" element={<Register />} />
        <Route path="/verify" element={<Verify />} />

        {/* Wrap routes that need the layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/jobform" element={<JobForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
