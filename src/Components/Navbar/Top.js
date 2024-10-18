import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '../../store/company';
import { Navigate, useNavigate } from 'react-router';

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
        const response = await axios.get('http://localhost:5000/api/company', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setCompanyName(response.data.data.name);
          setEmail(response.data.data.companyEmail); // Assuming email is in the response
          setPhone(response.data.data.phoneNumber); // Assuming phone is in the response
        }
        else navigate('/')
      } catch (error) {
        navigate('/')
        console.error('Failed to fetch company details:', error);
      }
    };

    fetchCompanyDetails();
  }, [token]);

  const handleLogout = () => {
    navigate('/')
    clearToken(); // Clear the token from the store
  };

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white shadow-md fixed top-0 z-10">
      {/* Logo */}
      <div className="text-lg font-bold text-blue-600">Covette</div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-600">Contact</a>
        <div className="relative">
          {/* Profile Icon */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center bg-gray-200 text-gray-600 px-3 py-1 rounded-md focus:outline-none"
          >
            <i className="fas fa-user-circle mr-2"></i> 

            {companyName || 'Your Name'}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
              <div className="px-4 py-2 text-gray-600">
                <div>Email: {email}</div>
                <div>Phone: {phone}</div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
              >
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
