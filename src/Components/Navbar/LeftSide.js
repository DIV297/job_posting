import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../store/company';

const LeftSidebar = () => {
  const clearToken = useStore((state) => state.clearToken); // Function to clear the token

  const handleLogout = () => {
    clearToken(); // Clear the token from the store
  };
  return (
    <div className="w-16 h-full bg-white shadow-md fixed top-[76px] left-0 z-10 flex flex-col items-center py-8">
      {/* Home Icon */}
      <div className="mb-8">
        <Link to='/home'>
          <i className="fas fa-home text-2xl text-gray-600 cursor-pointer"></i>
        </Link>
      </div>
      <div className="mb-8">
        <Link to='/' >
          <i className="fas fa-sign-out-alt text-2xl text-gray-600" onClick={handleLogout}
          ></i>
        </Link>
      </div>

      {/* Create Interview Button */}

    </div>
  );
};

export default LeftSidebar;
