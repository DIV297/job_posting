import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../../store/company';
import { classnames } from '../../constants/classnames';
import { fixedWidth } from '../../constants/style';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [emailOTP, setEmailOTP] = useState('');
    const [mobileOTP, setMobileOTP] = useState('');
    const [emailVerified, setEmailVerified] = useState(null);
    const [mobileVerified, setMobileVerified] = useState(null);
    const [companyId, setCompanyId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailOTPErr, setEmailOTPErr] = useState('');
    const [mobileOTPErr, setMobileOTPErr] = useState('');
    const setToken = useStore((state) => state.setToken);

    const decodeBase64 = (str) => atob(str);

    useEffect(() => {
        const encodedId = searchParams.get('id');
        if (encodedId) {
            setCompanyId(decodeBase64(encodedId));
        }
    }, [searchParams]);

    const verifyEmailOTP = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/verifyEmailOTP`, { emailOTP, id: companyId });
            setEmailVerified(response.data.success);
            if (!response.data.success) setEmailOTPErr("Email OTP is invalid. Please try again.");
        } catch (error) {
            setEmailVerified(false);
            setEmailOTPErr("An error occurred while verifying Email OTP.");
        }
    };

    const verifyMobileOTP = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/verifyMobileOTP`, { mobileOTP, id: companyId });
            setMobileVerified(response.data.success);
            if (!response.data.success) setMobileOTPErr("Mobile OTP is invalid. Please try again.");
        } catch (error) {
            setMobileVerified(false);
            setMobileOTPErr("An error occurred while verifying Mobile OTP.");
        }
    };

    const handleCreatePassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setPasswordError("Password should be at least 8 characters long");
            return;
        }

        setPasswordError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/verifyBoth`, {
                id: companyId,
                password,
            });
            if (response.data.success) {
                setToken(response.data.token);
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  mt-12">
            <div className={classnames(" container mx-auto flex justify-between items-center",fixedWidth)}>
                <div className="w-1/2">
                    <p className="text-gray-600 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="w-1/3 bg-white p-8 shadow-md rounded-lg border">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Verify OTP</h2>
                    <p className="text-center text-gray-400 mb-6">Please verify your email and phone.</p>

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
                            {emailVerified && <img src="./check_circle.svg" alt="loading" className="absolute right-4 top-2"/>}
                            {emailVerified === false && <span className="text-red-500 absolute right-4 top-2">✗</span>}
                            {emailOTPErr && <p className="text-red-500 text-sm">{emailOTPErr}</p>}
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                            Verify Email OTP
                        </button>
                    </form>

                    <form onSubmit={(e) => { e.preventDefault(); verifyMobileOTP(); }}>
                        <div className="mb-4 mt-4 relative">
                            <i className="fas fa-mobile-alt absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="number"
                                value={mobileOTP}
                                onChange={(e) => setMobileOTP(e.target.value)}
                                placeholder="Mobile OTP "
                                className={`w-full px-10 py-2 border ${mobileVerified === false ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                            />
                            {mobileVerified && <img src="./check_circle.svg" alt="loading" className="absolute right-4 top-2"/>}
                            {mobileVerified === false && <span className="text-red-500 absolute right-4 top-2">✗</span>}
                            {mobileOTPErr && <p className="text-red-500 text-sm">{mobileOTPErr}</p>}
                            <p className="text-sm">for testing mobile otp is 000000</p>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                            Verify Mobile OTP
                        </button>
                    </form>

                    {mobileVerified && emailVerified && <form onSubmit={handleCreatePassword}>
                        <div className="mb-4 mt-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create Password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none ${password !== confirmPassword || password.length < 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={password !== confirmPassword || password.length < 1}
                        >
                            Create Password
                        </button>
                    </form>}
                </div>
            </div>
        </div>
    );
};

export default Verify;
