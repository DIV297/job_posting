import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../../store/company'; // Import your Zustand store

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [emailOTP, setEmailOTP] = useState('');
    const [mobileOTP, setMobileOTP] = useState('');
    const [emailVerified, setEmailVerified] = useState(null);
    const [mobileVerified, setMobileVerified] = useState(null);
    const [companyId, setCompanyId] = useState('');
    const setToken = useStore((state) => state.setToken); // Get the setToken function from the store

    // Decode base64 string
    const decodeBase64 = (str) => {
        return atob(str);
    };

    // Extract and decode the companyId from the query parameter
    useEffect(() => {
        const encodedId = searchParams.get('id');
        if (encodedId) {
            const decodedId = decodeBase64(encodedId);
            setCompanyId(decodedId); // Store the decoded companyId
        }
    }, [searchParams]);

    // Handle OTP verification for email
    const verifyEmailOTP = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verifyEmailOTP', {
                emailOTP,
                id: companyId, // Send companyId with OTP
            });
            setEmailVerified(response.data.success);
        } catch (error) {
            setEmailVerified(false);
        }
    };

    // Handle OTP verification for mobile
    const verifyMobileOTP = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verifyMobileOTP', {
                mobileOTP,
                id: companyId, // Send companyId with OTP
            });
            setMobileVerified(response.data.success);
        } catch (error) {
            setMobileVerified(false);
        }
    };

    // Check both verifications and get the token
    const verifyBoth = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verifyBoth', {
                id: companyId,
            });
            if (response.data.success) {
                // Store the token in Zustand
                setToken(response.data.token); // Assuming the token is returned in the response
                navigate('/home'); // Navigate to home
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (emailVerified && mobileVerified) {
            verifyBoth(); // Call verifyBoth if both are verified
        }
        //eslint-disable-next-line
    }, [emailVerified, mobileVerified]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto flex justify-between items-center">
                <div className="w-1/2">
                    <img src="/logo.svg" alt="Covette Logo" className="mb-4" />
                    <p className="text-gray-600 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>

                <div className="w-1/3 bg-white p-8 shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Verify OTP</h2>
                    <p className="text-center text-gray-400 mb-6">Please verify your email and phone.</p>

                    {/* Email OTP Input */}
                    <form onSubmit={(e) => { e.preventDefault(); verifyEmailOTP(); }}>
                        <div className="mb-4 relative">
                            <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="number"
                                value={emailOTP}
                                onChange={(e) => setEmailOTP(e.target.value)}
                                placeholder="Email OTP"
                                className={`w-full px-10 py-2 border ${emailVerified === false ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                            />
                            {emailVerified && <span className="text-green-500">✓</span>}
                            {emailVerified === false && <span className="text-red-500">✗</span>}
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                            Verify Email OTP
                        </button>
                    </form>

                    {/* Mobile OTP Input */}
                    <form onSubmit={(e) => { e.preventDefault(); verifyMobileOTP(); }}>
                        <div className="mb-4 relative">
                            <i className="fas fa-mobile-alt absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="number"
                                value={mobileOTP}
                                onChange={(e) => setMobileOTP(e.target.value)}
                                placeholder="Mobile OTP"
                                className={`w-full px-10 py-2 border ${mobileVerified === false ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                            />
                            {mobileVerified && <span className="text-green-500">✓</span>}
                            {mobileVerified === false && <span className="text-red-500">✗</span>}
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                            Verify Mobile OTP
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Verify;
