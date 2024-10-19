import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '../../store/company';
import { Navigate, useNavigate } from 'react-router';
import { classnames } from '../../constants/classnames';
import { borderTop } from '../../constants/colors';

const TopNavbar = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState(''); // State to store the company name
  const [email, setEmail] = useState(''); // State for company email
  const [phone, setPhone] = useState(''); // State for company phone
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const token = useStore((state) => state.token);
  const clearToken = useStore((state) => state.clearToken); // Function to clear the token

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/company`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setCompanyName(response.data.data.name);
          setEmail(response.data.data.companyEmail); // Assuming email is in the response
          setPhone(response.data.data.phoneNumber); // Assuming phone is in the response
          navigate('/home')
        }
        else navigate('/')
      } catch (error) {
        navigate('/')
        console.error('Failed to fetch company details:', error);
      }
    };

    fetchCompanyDetails();
    //eslint-disable-next-line
  }, [token]);

  const handleLogout = () => {
    navigate('/')
    clearToken(); // Clear the token from the store
  };

  return (
    <div className={classnames(`w-full flex justify-between items-center p-4 px-8 bg-white fixed top-0 z-10`, token ? "shadow-sm" : "")}>
      {/* Logo */}
      <div className="text-lg font-bold text-blue-600">
        <img src="/logo.svg" alt="Covette Logo" className="" />
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-600">Contact</a>
        <div className="relative">
          {token && (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={classnames("flex items-center text-gray-600 px-3 py-1 rounded-md")}
            >
              <i className="fas fa-user-circle mr-2"></i>
              {companyName || 'Your Name'}
              <span
                className={classnames("ml-2 transition-transform transform inline-block border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-500", dropdownOpen?"rotate-180":"")}
              />
            </button>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && token && (
            <div className="absolute right-0 mt-2 w-fit bg-white shadow-lg rounded-md z-20">
              <div className="px-4 py-2 text-gray-600 text-md font-semibold">
                <div> {email}</div>
                <div> {phone}</div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
