import React from 'react';

const TopNavbar = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-white shadow-md fixed top-0 z-10">
      {/* Logo */}
      <div className="text-lg font-bold text-blue-600">Covette</div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-600">Contact</a>
        <div className="relative">
          <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md">
            Your Name
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
