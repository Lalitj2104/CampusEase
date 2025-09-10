import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
  Clock,
  Send,
  KeyRound,
} from 'lucide-react';
import {
  changeUserPassword,
  forgotUserPassword,
  resetUserPassword,
} from '../../redux/Actions/userAction';

const ForgotPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({ new: false, confirm: false });
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [errors, setErrors] = useState({});

  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error, id } = useSelector((state) => state.user);

  // Timer effect for OTP expiry
  useEffect(() => {
    if (timeLeft > 0 && currentStep === 2) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentStep]);

  // Step transition based on messages
  useEffect(() => {
    if (!message) return;

    if (message === 'otp send successfully') {
      setCurrentStep(2);
      setTimeLeft(600);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
    
    if (message === 'OTP verified successfully.') {
      setCurrentStep(3);
    }


    if (message === 'Password changed successfully.') {
      setCurrentStep(4);
    }
  
    
  }, [message,loading]);
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const clearErrors = () => setErrors({});

  // Step 1: Email Submission
  const handleEmailSubmit = () => {
    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    dispatch(forgotUserPassword(email));
  };

  // OTP Handlers
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    clearErrors();
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    if (digits.length === 6) {
      setOtp(digits.split(''));
      clearErrors();
      handleOtpVerify(digits);
    }
  };

  // Step 2: OTP Verification
  const handleOtpVerify = (otpValue = otp.join('')) => {
    if (otpValue.length !== 6) {
      setErrors({ otp: 'Please enter the complete 6-digit code' });
      return;
    }
    dispatch(resetUserPassword(id, otpValue));
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (isResending || timeLeft > 540) return;
    setIsResending(true);
    clearErrors();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTimeLeft(600);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      alert('A new reset code has been sent to your email.');
    } finally {
      setIsResending(false);
    }
  };

  // Step 3: Password Reset
  const handlePasswordReset = () => {
    const newErrors = {};
    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(changeUserPassword(id, newPassword.trim()));
  };

  const handleGoBack = () => {
    if (currentStep === 1) {
      navigate('/login');
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setOtp(['', '', '', '', '', '']);
      setTimeLeft(0);
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setNewPassword('');
      setConfirmPassword('');
    }
    clearErrors();
  };

  const inputClasses =
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm';
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-2';

  // Success State
  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Password Reset Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Your password has been updated. You can now sign in with your new password.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            {currentStep === 1 && <Mail className="w-8 h-8 text-white" />}
            {currentStep === 2 && <Shield className="w-8 h-8 text-white" />}
            {currentStep === 3 && <KeyRound className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentStep === 1 && 'Forgot Password?'}
            {currentStep === 2 && 'Verify Reset Code'}
            {currentStep === 3 && 'Set New Password'}
          </h1>
          <p className="text-gray-600">
            {currentStep === 1 && 'Enter your email address to receive a password reset code'}
            {currentStep === 2 && `We've sent a 6-digit code to ${email}`}
            {currentStep === 3 && 'Create a strong new password for your account'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-8 h-1 mx-2 transition-all duration-300 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Step 1: Email */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearErrors();
                    }}
                    className={`${inputClasses} pl-12 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <button
                onClick={handleEmailSubmit}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending Reset Code...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Reset Code
                  </div>
                )}
              </button>
            </div>
          )}

          {/* Step 2: OTP */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  {timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)}` : 'Code expired'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter Reset Code
                </label>
                <div className="flex justify-center space-x-3" onPaste={handleOtpPaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                      } ${digit ? 'border-blue-500 bg-blue-50' : ''}`}
                      disabled={loading || timeLeft === 0}
                    />
                  ))}
                </div>

                {errors.otp && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 text-center">{errors.otp}</p>
                  </div>
                )}

                {timeLeft === 0 && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-600 text-center">
                      Your reset code has expired. Please request a new one.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleOtpVerify()}
                disabled={loading || timeLeft === 0 || otp.join('').length !== 6}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg ${
                  loading || timeLeft === 0 || otp.join('').length !== 6
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Verify Code
                  </div>
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-600 text-sm mb-3">Didn't receive the code?</p>
                <button
                  onClick={handleResendOtp}
                  disabled={isResending || timeLeft > 540}
                  className={`inline-flex items-center text-blue-600 font-medium transition-colors ${
                    isResending || timeLeft > 540
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:text-blue-800'
                  }`}
                >
                  {isResending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                      Sending new code...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend code
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Password */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="newPassword" className={labelClasses}>
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      clearErrors();
                    }}
                    className={`${inputClasses} pl-12 pr-12 ${errors.newPassword ? 'border-red-500' : ''}`}
                    placeholder="Enter new password"
                  />
                  <div
                    onClick={() =>
                      setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </div>
                </div>
                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className={labelClasses}>
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearErrors();
                    }}
                    className={`${inputClasses} pl-12 pr-12 ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                    placeholder="Confirm new password"
                  />
                  <div
                    onClick={() =>
                      setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                onClick={handlePasswordReset}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Updating Password...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Update Password
                  </div>
                )}
              </button>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="mt-6 w-full flex items-center justify-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 1 ? 'Back to Login' : 'Back'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
