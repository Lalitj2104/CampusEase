import React, { useState, useEffect, useRef } from 'react';
import { Mail, Shield, CheckCircle, RefreshCw, ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  
  // Mock user data - replace with actual data from registration
  const [userInfo] = useState({
    email: 'john.doe@example.com',
    firstName: 'John'
  });

  const inputRefs = useRef([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isVerified]);
  
  const navigate=useNavigate();
  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'Paste') {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (digits.length === 6) {
      const newOtp = digits.split('');
      setOtp(newOtp);
      setError('');
      handleVerifyOtp(digits);
    }
  };

  const handleVerifyOtp = async (otpValue = otp.join('')) => {
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call - replace with your actual verification endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation - replace with actual API response handling
      if (otpValue === '123456') {

        setIsVerified(true);
        // Redirect to login or dashboard after successful verification
        
      } else {
        setError('Invalid verification code. Please try again.');
        // Clear OTP inputs
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      setError('Verification failed. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
    
}
useEffect(() => {
  if (isVerified) {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }
}, [isVerified, navigate]);



  const handleResendOtp = async () => {
    if (isResending || timeLeft > 540) return; // Prevent spam (allow resend only after 1 minute)

    setIsResending(true);
    setError('');

    try {
      // Simulate API call - replace with your actual resend endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset timer and clear inputs
      setTimeLeft(600);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      
      alert('A new verification code has been sent to your email.');
    } catch (error) {
      console.error('Resend OTP failed:', error);
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to registration page
    // window.history.back();
    alert('Going back to registration page...');
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Verified!</h1>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now access your account.
            </p>
            <div className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Redirecting to dashboard...
              </div>
            </div>
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
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-blue-600 font-medium">{userInfo.email}</p>
        </div>

        {/* Main Container */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Timer */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4 mr-2" />
              {timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)}` : 'Code expired'}
            </div>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter Verification Code
            </label>
            <div className="flex justify-center space-x-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                  } ${digit ? 'border-blue-500 bg-blue-50' : ''}`}
                  disabled={isLoading || timeLeft === 0}
                />
              ))}
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {timeLeft === 0 && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-600 text-center">
                  Your verification code has expired. Please request a new one.
                </p>
              </div>
            )}
          </div>

          {/* Verify Button */}
          <div
            onClick={() => handleVerifyOtp()}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 cursor-pointer shadow-lg mb-4 ${
              isLoading || timeLeft === 0 || otp.join('').length !== 6 
                ? 'opacity-50 cursor-not-allowed transform-none' 
                : 'transform hover:scale-[1.02]'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                Verify Account
              </div>
            )}
          </div>

          {/* Resend Section */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">
              Didn't receive the code?
            </p>
            <div
              onClick={handleResendOtp}
              className={`inline-flex items-center text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors ${
                isResending || timeLeft > 540 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isResending ? (
                <>
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending new code...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend code
                  {timeLeft > 540 && (
                    <span className="ml-1 text-gray-500">
                      (in {Math.ceil((540 - (600 - timeLeft)) / 60)}m)
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 rounded">Need help?</span>
            </div>
          </div>

          {/* Help Section */}
          <div className="text-center space-y-2">
            <div
              onClick={handleGoBack}
              className="inline-flex items-center text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to registration
            </div>
            <p className="text-xs text-gray-500">
              Check your spam folder if you don't see the email
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Having trouble? Contact our{' '}
            <a href="/support" className="text-blue-600 hover:text-blue-800 font-medium">
              support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;