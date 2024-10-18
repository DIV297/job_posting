import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Section */}
                <div className="w-1/2">
                    <img src="/logo.svg" alt="Covette Logo" className="mb-4" />
                    <p className="text-gray-600 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                    </p>
                </div>

                {/* Right Section */}
                <div className="w-1/3 bg-white p-8 shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Sign Up</h2>
                    <p className="text-center text-gray-400 mb-6">
                        Lorem ipsum is simply dummy text.
                    </p>
                    <form>
                        {/* Name Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-phone absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Phone no."
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Company Name Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-building absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Company Email Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="email"
                                placeholder="Company Email"
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Employee Size Input */}
                        <div className="mb-6 relative">
                            <i className="fas fa-users absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="number"
                                placeholder="Employee Size"
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="text-sm text-center text-gray-500 mb-4">
                            By clicking on proceed you will accept our <a href="#" className="text-blue-500">Terms & Conditions</a>
                        </div>

                        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                            <Link to='/verify'>
                                Proceed
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
