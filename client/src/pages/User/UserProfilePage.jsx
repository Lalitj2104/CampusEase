import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Eye, 
  EyeOff, 
  Lock,
  Calendar,
  MapPin,
  Briefcase,
  Settings,
  Bell,
  Shield,
  LogOut
} from 'lucide-react';

const UserProfilePage = () => {
  // Mock user data - replace with actual user data from your API/context
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    phoneNumber: '+1 (555) 123-4567',
    joinDate: '2023-01-15',
    location: 'New York, NY',
    bio: 'Senior Software Engineer with 5+ years of experience in full-stack development.',
    avatar: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData(userData);
    }
    setIsEditing(!isEditing);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!editData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!editData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!editData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(editData.email)) newErrors.email = 'Email is invalid';
    if (!editData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUserData(editData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordModal(false);
      alert('Password updated successfully!');
    } catch (error) {
      alert('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newData = { ...editData, avatar: e.target.result };
        setEditData(newData);
        if (!isEditing) {
          setUserData(newData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
                <label htmlFor="avatar-upload" className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                Member since {new Date(userData.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {userData.firstName} {userData.lastName}
                </h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <Building className="w-4 h-4 mr-2" />
                  {userData.department}
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  {userData.location}
                </div>
                <p className="text-gray-700 max-w-2xl">{userData.bio}</p>
              </div>
              
              <div className="flex space-x-2">
                <div
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </div>
                <div
                  onClick={handleEditToggle}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className={labelClasses}>First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={isEditing ? editData.firstName : userData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`${inputClasses} ${!isEditing ? 'bg-gray-50' : ''} ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={isEditing ? editData.lastName : userData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`${inputClasses} ${!isEditing ? 'bg-gray-50' : ''} ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClasses}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={isEditing ? editData.email : userData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`${inputClasses} ${!isEditing ? 'bg-gray-50' : ''} ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Department and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="department" className={labelClasses}>Department</label>
                    <select
                      id="department"
                      name="department"
                      value={isEditing ? editData.department : userData.department}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`${inputClasses} ${!isEditing ? 'bg-gray-50' : ''}`}
                    >
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
                  
                  <div>
                    <label htmlFor="phoneNumber" className={labelClasses}>Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={isEditing ? editData.phoneNumber : userData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`${inputClasses} ${!isEditing ? 'bg-gray-50' : ''} ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className={labelClasses}>Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={isEditing ? editData.location : userData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`${inputClasses} ${!isEditing ? 'bg-gray-50' : ''}`}
                    placeholder="City, State/Country"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className={labelClasses}>Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={isEditing ? editData.bio : userData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`${inputClasses} ${!isEditing ? 'bg-gray-50' : ''} resize-none`}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex justify-end">
                    <div
                      onClick={handleSave}
                      className={`flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 cursor-pointer ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Member Since</span>
                  </div>
                  <span className="text-sm font-medium">{new Date(userData.joinDate).getFullYear()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">Department</span>
                  </div>
                  <span className="text-sm font-medium">{userData.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-600">Location</span>
                  </div>
                  <span className="text-sm font-medium">{userData.location}</span>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Settings className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">General Settings</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Bell className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Notifications</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Shield className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Privacy & Security</span>
                </div>
                <div className="flex items-center p-3 hover:bg-red-50 text-red-600 rounded-lg cursor-pointer transition-colors">
                  <LogOut className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">Sign Out</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl border border-white/20 p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
                <div
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className={labelClasses}>Current Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={inputClasses}
                      placeholder="Enter current password"
                    />
                    <div
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className={labelClasses}>New Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={inputClasses}
                      placeholder="Enter new password"
                    />
                    <div
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className={labelClasses}>Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={inputClasses}
                      placeholder="Confirm new password"
                    />
                    <div
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <div
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Cancel
                </div>
                <div
                  onClick={handlePasswordUpdate}
                  className={`flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 cursor-pointer ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;