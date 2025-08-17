import React, { useState } from "react";
import {
	Eye,
	EyeOff,
	User,
	Mail,
	Phone,
	Building,
	Lock,
	UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
		phoneNumber: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate=useNavigate();
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.firstName.trim())
			newErrors.firstName = "First name is required";
		if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = "Email is invalid";
		if (!formData.department.trim())
			newErrors.department = "Department is required";
		if (!formData.phoneNumber.trim())
			newErrors.phoneNumber = "Phone number is required";
		if (!formData.password.trim()) newErrors.password = "Password is required";
		else if (formData.password.length < 6)
			newErrors.password = "Password must be at least 6 characters";
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = validateForm();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		setIsLoading(true);
		setErrors({});
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			console.log("Registration data:", formData);
			navigate("/verify")
		} catch (error) {
			console.error("Registration failed:", error);
			setErrors({ submit: "Registration failed. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	const inputClasses =
		"w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm";
	const labelClasses = "block text-sm font-medium text-gray-700 mb-2";
	const iconClasses =
		"absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-1400 w-5 h-5";

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
			<div className="w-full max-w-2xl">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
						<UserPlus className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Create Account
					</h1>
					<p className="text-gray-600">Join us and start your journey today</p>
				</div>

				{/* Form Container */}
				<div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Name Fields Row */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* First Name */}
							<div>
								<label htmlFor="firstName" className={labelClasses}>
									First Name
								</label>
								<div className="relative">
									<User className={iconClasses} />
									<input
										type="text"
										id="firstName"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
										className={`${inputClasses} ${
											errors.firstName ? "border-red-500" : ""
										}`}
										placeholder="Enter your first name"
									/>
								</div>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-600">
										{errors.firstName}
									</p>
								)}
							</div>
							{/* Last Name */}
							<div>
								<label htmlFor="lastName" className={labelClasses}>
									Last Name
								</label>
								<div className="relative">
									<User className={iconClasses} />
									<input
										type="text"
										id="lastName"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
										className={`${inputClasses} ${
											errors.lastName ? "border-red-500" : ""
										}`}
										placeholder="Enter your last name"
									/>
								</div>
								{errors.lastName && (
									<p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
								)}
							</div>
						</div>
						{/* Email */}
						<div>
							<label htmlFor="email" className={labelClasses}>
								Email Address
							</label>
							<div className="relative">
								<Mail className={iconClasses} />
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className={`${inputClasses} ${
										errors.email ? "border-red-500" : ""
									}`}
									placeholder="Enter your email address"
								/>
							</div>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">{errors.email}</p>
							)}
						</div>
						{/* Department and Phone Row */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Department */}
							<div>
								<label htmlFor="department" className={labelClasses}>
									Department
								</label>
								<div className="relative">
									<Building className={iconClasses} />
									<select
										id="department"
										name="department"
										value={formData.department}
										onChange={handleChange}
										className={`${inputClasses} ${
											errors.department ? "border-red-500" : ""
										}`}
									>
										<option value="">Select Department</option>
										<option value="Engineering">Engineering</option>
										<option value="Marketing">Marketing</option>
										<option value="Sales">Sales</option>
										<option value="HR">Human Resources</option>
										<option value="Finance">Finance</option>
										<option value="Operations">Operations</option>
										<option value="IT">Information Technology</option>
										<option value="Design">Design</option>
									</select>
								</div>
								{errors.department && (
									<p className="mt-1 text-sm text-red-600">
										{errors.department}
									</p>
								)}
							</div>
							{/* Phone Number */}
							<div>
								<label htmlFor="phoneNumber" className={labelClasses}>
									Phone Number
								</label>
								<div className="relative">
									<Phone className={iconClasses} />
									<input
										type="tel"
										id="phoneNumber"
										name="phoneNumber"
										value={formData.phoneNumber}
										onChange={handleChange}
										className={`${inputClasses} ${
											errors.phoneNumber ? "border-red-500" : ""
										}`}
										placeholder="Enter your phone number"
									/>
								</div>
								{errors.phoneNumber && (
									<p className="mt-1 text-sm text-red-600">
										{errors.phoneNumber}
									</p>
								)}
							</div>
						</div>
						{/* Password */}
						<div>
							<label htmlFor="password" className={labelClasses}>
								Password
							</label>
							<div className="relative">
								<Lock className={iconClasses} />
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									className={`${inputClasses} pr-12 ${
										errors.password ? "border-red-500" : ""
									}`}
									placeholder="Create a strong password"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
									tabIndex={-1}
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">{errors.password}</p>
							)}
						</div>
						{/* Submit Error */}
						{errors.submit && (
							<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
								<p className="text-sm text-red-600">{errors.submit}</p>
							</div>
						)}
						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Creating Account...
								</div>
							) : (
								<div className="flex items-center justify-center">
									<UserPlus className="w-5 h-5 mr-2" />
									Create Account
								</div>
							)}
						</button>
						{/* Login Link */}
						<div className="text-center">
							<p className="text-gray-600">
								Already have an account?{" "}
								<a
									href="/login"
									className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
								>
									Sign in here
								</a>
							</p>
						</div>
					</form>
				</div>
				{/* Footer */}
				<div className="text-center mt-8">
					<p className="text-sm text-gray-500">
						By creating an account, you agree to our{" "}
						<a href="/terms" className="text-blue-600 hover:text-blue-800">
							Terms of Service
						</a>{" "}
						and{" "}
						<a
							href="/privacy"
							className="text-purple-600 hover:text-purple-800"
						>
							Privacy Policy
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
