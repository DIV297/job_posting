import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        companyName: '',
        companyEmail: '',
        empSize: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to encode the _id in base64
    const encodeBase64 = (str) => {
        return btoa(str); // 'btoa' encodes a string to base64
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/registerCompany', formData); // Assuming your backend is running on localhost:5000
            if (response.data.success === 1) {
                // Encode the _id in base64
                const encodedId = encodeBase64(response.data.details);
                // Redirect to verify page with encoded _id in query string
                navigate(`/verify?id=${encodedId}`);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-phone absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Phone no."
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Company Name Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-building absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Company Name"
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Company Email Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="email"
                                name="companyEmail"
                                value={formData.companyEmail}
                                onChange={handleInputChange}
                                placeholder="Company Email"
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Employee Size Input */}
                        <div className="mb-6 relative">
                            <i className="fas fa-users absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="number"
                                name="empSize"
                                value={formData.empSize}
                                onChange={handleInputChange}
                                placeholder="Employee Size"
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                        )}

                        <div className="text-sm text-center text-gray-500 mb-4">
                            By clicking on proceed you will accept our <a href="#" className="text-blue-500">Terms & Conditions</a>
                        </div>

                        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                            Proceed
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
