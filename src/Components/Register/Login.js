import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../../store/company';
import { classnames } from '../../constants/classnames';
import { fixedWidth } from '../../constants/style';
import { buttonPrimary } from '../../constants/colors';

const Login = () => {
    const [formData, setFormData] = useState({
        loginIdentifier: '', // Either email or phone number
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission
    const navigate = useNavigate();
    const setToken = useStore((state) => state.setToken); // Zustand setToken function

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
        return formData.loginIdentifier && formData.password; // Ensure both fields are filled
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set submitting state to true
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/company/login`, formData); 
            if (response.data.success) {
                setToken(response.data.token);
                navigate('/home'); // Navigate to the home page after successful login
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
        <div className="min-h-screen flex items-center justify-center ">
            <div className={classnames("container mx-auto flex justify-between items-center", fixedWidth)}>
                {/* Left Section */}
                <div className="w-1/2">
                    <p className="text-gray-600 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>

                {/* Right Section */}
                <div className="w-1/3 bg-white p-8 shadow-md rounded-lg border">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>
                    <p className="text-center text-gray-400 mb-6">
                        Login using your email or phone number
                    </p>
                    <form onSubmit={handleSubmit}>
                        {/* Email/Phone Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="text"
                                name="loginIdentifier"
                                value={formData.loginIdentifier}
                                onChange={handleInputChange}
                                placeholder="Email or Phone no."
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4 relative">
                            <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={classnames(
                                "w-full text-white py-2 rounded-md focus:outline-none",
                                isSubmitting || !isFormValid() ? "opacity-50 cursor-not-allowed" : " hover:shadow-lg"
                            ,buttonPrimary)}
                            disabled={!isFormValid() || isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="text-sm text-center text-gray-500 mt-4">
                        Don't have an account? <Link to="/" className="text-blue-500">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
