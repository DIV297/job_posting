import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { classnames } from '../../constants/classnames';
import { buttonPrimary } from '../../constants/colors';
import { fixedWidth } from '../../constants/style';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        countryCode: '+91', // Default country code
        companyName: '',
        companyEmail: '',
        empSize: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // For handling button submission state
    const navigate = useNavigate();

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to check if the form is valid
    const isFormValid = () => {
        return (
            formData.name &&
            formData.phoneNumber &&
            formData.companyName &&
            formData.companyEmail &&
            formData.empSize
        );
    };

    // Function to encode the _id in base64
    const encodeBase64 = (str) => {
        return btoa(str); // 'btoa' encodes a string to base64
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set submitting state to true
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASEURL}/api/registerCompany`,
                {
                    ...formData,
                    phoneNumber: `${formData.countryCode}${formData.phoneNumber}`, // Concatenate country code and phone number
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.success === 1) {
                const encodedId = encodeBase64(response.data.details);
                navigate(`/verify?id=${encodedId}`); // Redirect to verify page with encoded _id
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <div className={classnames("items-center justify-center")}>
            <div className={classnames("w-full container mx-auto flex justify-between items-center mt-24", fixedWidth)}>
                {/* Left Section */}
                <div className="w-1/2">
                    <p className="text-gray-600 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>

                {/* Right Section */}
                <div className="w-1/3 bg-white p-8 py-4 shadow-md rounded-lg border">
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

                        {/* Phone Input with Country Code */}
                        <div className="mb-4 flex items-center">
                            <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="+1">+1 (USA)</option>
                                <option value="+91">+91 (India)</option>
                                <option value="+44">+44 (UK)</option>
                            </select>
                            <div className="relative">
                                <i className="fas fa-phone absolute left-3 top-3 text-gray-400"></i>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone no."
                                    className="w-full px-10 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={classnames(
                                "w-full text-white py-2 rounded-md focus:outline-none",
                                buttonPrimary,
                                !isFormValid() || isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                            )}
                            disabled={!isFormValid() || isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Proceed'}
                        </button>
                    </form>

                    <div className="text-sm text-center text-gray-500 mt-4">
                        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
