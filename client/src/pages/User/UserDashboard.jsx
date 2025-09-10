import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  ThumbsUp, 
  MessageSquare, 
  Calendar, 
  User, 
  Filter, 
  Search, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronDown,
  Bell,
  Settings,
  LogOut,
  FileText,
  Eye,
  ChevronUp,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { logoutUser } from '../../redux/Actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const UserDashboardPage = () => {
  // Mock user data
  // const [currentUser] = useState({
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   department: 'Engineering',
  //   avatar: null
  // });
  const {id:currentUser,loading,error}=useSelector(state=>state.user);

  // Profile dropdown state
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef(null);

  // Mock complaints data
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: 'Broken Air Conditioning in Office 3A',
      category: 'Maintenance',
      description: 'The AC unit has been making loud noises and not cooling properly for the past week.',
      author: 'Sarah Johnson',
      department: 'Marketing',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'open',
      upvotes: 15,
      hasUpvoted: false,
      comments: 8,
      images: []
    },
    {
      id: 2,
      title: 'Cafeteria Food Quality Issues',
      category: 'Food & Dining',
      description: 'Recent meals have been consistently cold and lacking in variety. Multiple employees have complained.',
      author: 'Mike Chen',
      department: 'IT',
      createdAt: '2024-01-14T14:20:00Z',
      status: 'in-progress',
      upvotes: 23,
      hasUpvoted: true,
      comments: 12,
      images: []
    },
    {
      id: 3,
      title: 'Parking Space Shortage',
      category: 'Facilities',
      description: 'Not enough parking spaces for all employees. Many have to park on the street.',
      author: 'Emily Davis',
      department: 'HR',
      createdAt: '2024-01-13T09:15:00Z',
      status: 'resolved',
      upvotes: 31,
      hasUpvoted: false,
      comments: 5,
      images: []
    },
    {
      id: 4,
      title: 'Slow Internet Connection in Conference Room B',
      category: 'Technology',
      description: 'WiFi is extremely slow during video conferences, affecting client meetings.',
      author: 'David Wilson',
      department: 'Sales',
      createdAt: '2024-01-12T16:45:00Z',
      status: 'open',
      upvotes: 18,
      hasUpvoted: true,
      comments: 6,
      images: []
    },
    {
      id: 5,
      title: 'Office Temperature Too Cold',
      category: 'Environment',
      description: 'The office is consistently too cold, especially in the morning hours.',
      author: 'John Doe',
      department: 'Engineering',
      createdAt: '2024-01-11T11:30:00Z',
      status: 'resolved',
      upvotes: 9,
      hasUpvoted: false,
      comments: 3,
      images: []
    },
    {
      id: 6,
      title: 'Printer Issues in Engineering Wing',
      category: 'Technology',
      description: 'The main printer keeps jamming and producing low-quality prints.',
      author: 'John Doe',
      department: 'Engineering',
      createdAt: '2024-01-10T14:20:00Z',
      status: 'open',
      upvotes: 7,
      hasUpvoted: false,
      comments: 2,
      images: []
    }
  ]);

  const [filteredComplaints, setFilteredComplaints] = useState(complaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [myComplaintsFilter, setMyComplaintsFilter] = useState('all'); // New filter for my complaints
  const [showRaiseComplaint, setShowRaiseComplaint] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const navigate=useNavigate();
  // New complaint form data
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    category: '',
    description: '',
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    'Maintenance', 
    'Food & Dining', 
    'Facilities', 
    'Technology', 
    'Environment', 
    'Security', 
    'Transportation',
    'Other'
  ];

  const statusConfig = {
    open: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle, label: 'Open' },
    'in-progress': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'In Progress' },
    resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' },
    closed: { color: 'bg-gray-100 text-gray-800', icon: XCircle, label: 'Closed' }
  };

  // Get user-specific stats
  const getUserStats = () => {
    const userComplaints = complaints.filter(c => c.author === `${currentUser.firstName} ${currentUser.lastName}`);
    const totalComplaints = complaints.length;
    const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;
    const myComplaints = userComplaints.length;
    const myResolvedComplaints = userComplaints.filter(c => c.status === 'resolved').length;
    const myPendingComplaints = userComplaints.filter(c => c.status === 'open' || c.status === 'in-progress').length;

    return {
      total: totalComplaints,
      resolved: resolvedComplaints,
      myComplaints,
      myResolvedComplaints,
      myPendingComplaints
    };
  };

  const stats = getUserStats();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter and sort complaints
  useEffect(() => {
    let filtered = complaints.filter(complaint => {
      const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || complaint.category === selectedCategory;
      
      // Filter by my complaints
      let matchesMyFilter = true;
      if (myComplaintsFilter === 'my-all') {
        matchesMyFilter = complaint.author === `${currentUser.firstName} ${currentUser.lastName}`;
      } else if (myComplaintsFilter === 'my-resolved') {
        matchesMyFilter = complaint.author === `${currentUser.firstName} ${currentUser.lastName}` && complaint.status === 'resolved';
      } else if (myComplaintsFilter === 'my-pending') {
        matchesMyFilter = complaint.author === `${currentUser.firstName} ${currentUser.lastName}` && (complaint.status === 'open' || complaint.status === 'in-progress');
      }
      
      return matchesSearch && matchesCategory && matchesMyFilter;
    });

    // Sort complaints
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'upvotes':
          return b.upvotes - a.upvotes;
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    setFilteredComplaints(filtered);
  }, [complaints, searchTerm, selectedCategory, sortBy, myComplaintsFilter, currentUser]);

  const handleUpvote = (complaintId) => {
    setComplaints(prev => prev.map(complaint => {
      if (complaint.id === complaintId) {
        return {
          ...complaint,
          upvotes: complaint.hasUpvoted ? complaint.upvotes - 1 : complaint.upvotes + 1,
          hasUpvoted: !complaint.hasUpvoted
        };
      }
      return complaint;
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxFiles = 5;
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (newComplaint.images.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images`);
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image`);
        return false;
      }
      return true;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewComplaint(prev => ({
          ...prev,
          images: [...prev.images, {
            id: Date.now() + Math.random(),
            name: file.name,
            url: e.target.result,
            size: file.size
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setNewComplaint(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };
  const dispatch=useDispatch();
  const handleSubmitComplaint = async () => {
    if (!newComplaint.title.trim() || !newComplaint.category || !newComplaint.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const complaint = {
        id: complaints.length + 1,
        title: newComplaint.title,
        category: newComplaint.category,
        description: newComplaint.description,
        author: `${currentUser.firstName} ${currentUser.lastName}`,
        department: currentUser.department,
        createdAt: new Date().toISOString(),
        status: 'open',
        upvotes: 0,
        hasUpvoted: false,
        comments: 0,
        images: newComplaint.images
      };

      setComplaints(prev => [complaint, ...prev]);
      setNewComplaint({ title: '', category: '', description: '', images: [] });
      setShowRaiseComplaint(false);
      alert('Complaint submitted successfully!');
    } catch (error) {
      alert('Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileAction = (action) => {
    setShowProfileDropdown(false);
    if (action === 'profile') {
      navigate('/profile'); 
    } else if (action === 'logout') {
        handleLogoutUser();
    }
  };

  const handleLogoutUser=()=>{
          dispatch(logoutUser());
          setTimeout(()=>{
            navigate("/")
          },500)
        }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const IconComponent = config.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <div 
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100/50 rounded-lg p-2 transition-colors"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{currentUser.department}</p>
                  </div>
                  {showProfileDropdown ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div
                      onClick={() => handleProfileAction('profile')}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-3" />
                      My Profile
                    </div>
                    <div
                      onClick={() => handleProfileAction('logout')}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Complaints</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                <p className="text-sm text-gray-600">Resolved Issues</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6 cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            onClick={() => setMyComplaintsFilter('my-all')}
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.myComplaints}</p>
                <p className="text-sm text-gray-600">My Complaints</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6 cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            onClick={() => setMyComplaintsFilter('my-resolved')}
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.myResolvedComplaints}</p>
                <p className="text-sm text-gray-600">My Resolved</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6 cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            onClick={() => setMyComplaintsFilter('my-pending')}
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.myPendingComplaints}</p>
                <p className="text-sm text-gray-600">My Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div
              onClick={() => setShowRaiseComplaint(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer shadow-lg transform hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5 mr-2" />
              Raise Complaint
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm w-full sm:w-64"
                />
              </div>

              {/* Filters Toggle */}
              <div
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer bg-white/50 backdrop-blur-sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* My Complaints Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">My Complaints</label>
                  <select
                    value={myComplaintsFilter}
                    onChange={(e) => setMyComplaintsFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  >
                    <option value="all">All Complaints</option>
                    <option value="my-all">My All Complaints</option>
                    <option value="my-resolved">My Resolved</option>
                    <option value="my-pending">My Pending</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="upvotes">Most Upvoted</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filter Display */}
        {myComplaintsFilter !== 'all' && (
          <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center">
              <Filter className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800 font-medium">
                Showing: {
                  myComplaintsFilter === 'my-all' ? 'My All Complaints' :
                  myComplaintsFilter === 'my-resolved' ? 'My Resolved Complaints' :
                  myComplaintsFilter === 'my-pending' ? 'My Pending Complaints' : ''
                }
              </span>
            </div>
            <button
              onClick={() => setMyComplaintsFilter('all')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map(complaint => (
            <div key={complaint.id} className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {complaint.title}
                  </h3>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[complaint.status].color}`}>
                    {getStatusIcon(complaint.status)}
                    <span className="ml-1">{statusConfig[complaint.status].label}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {complaint.description}
              </p>

              {/* Images indicator */}
              {complaint.images && complaint.images.length > 0 && (
                <div className="flex items-center mb-4">
                  <ImageIcon className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">{complaint.images.length} image{complaint.images.length > 1 ? 's' : ''}</span>
                </div>
              )}

              {/* Category */}
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-4">
                {complaint.category}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{complaint.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(complaint.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div
                    onClick={() => handleUpvote(complaint.id)}
                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      complaint.hasUpvoted 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 mr-2 ${complaint.hasUpvoted ? 'fill-current' : ''}`} />
                    <span className="font-medium">{complaint.upvotes}</span>
                  </div>

                  <div className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>{complaint.comments}</span>
                  </div>
                </div>

                {/* View Button */}
                <div
                  onClick={() => setSelectedComplaint(complaint)}
                  className="flex items-center px-3 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-lg cursor-pointer transition-all duration-200"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredComplaints.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No complaints found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* View Complaint Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-white/20 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Complaint Details</h3>
              <div
                onClick={() => setSelectedComplaint(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-6">
              {/* Title and Status */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedComplaint.title}</h2>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedComplaint.status].color}`}>
                  {getStatusIcon(selectedComplaint.status)}
                  <span className="ml-2">{statusConfig[selectedComplaint.status].label}</span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {selectedComplaint.category}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-gray-600 bg-gray-50 rounded-lg p-4">{selectedComplaint.description}</p>
              </div>

              {/* Images */}
              {selectedComplaint.images && selectedComplaint.images.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attached Images</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedComplaint.images.map((image, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-2">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <p className="text-xs text-gray-600 truncate">{image.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Submitted By</label>
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-900">{selectedComplaint.author}</span>
                  </div>
                  <p className="text-sm text-gray-500 ml-6">{selectedComplaint.department}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Submitted On</label>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-900">{formatDate(selectedComplaint.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <ThumbsUp className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-900 font-medium">{selectedComplaint.upvotes} upvotes</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-900 font-medium">{selectedComplaint.comments} comments</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <div
                onClick={() => setSelectedComplaint(null)}
                className="px-6 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
              >
                Close
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Raise Complaint Modal */}
      {showRaiseComplaint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-white/20 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Raise New Complaint</h3>
              <div
                onClick={() => setShowRaiseComplaint(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complaint Title *
                </label>
                <input
                  type="text"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the issue"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={newComplaint.category}
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Provide detailed information about the issue..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Images (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Click to upload or drag and drop images
                    </p>
                    <p className="text-xs text-gray-500">
                      Maximum 5 images, 5MB each (PNG, JPG, JPEG)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-3 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      Choose Images
                    </button>
                  </div>
                </div>

                {/* Image Preview */}
                {newComplaint.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {newComplaint.images.map((image) => (
                      <div key={image.id} className="relative bg-gray-50 rounded-lg p-2">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="mt-1">
                          <p className="text-xs text-gray-600 truncate">{image.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                        </div>
                        <button
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <div
                onClick={() => setShowRaiseComplaint(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </div>
              <div
                onClick={handleSubmitComplaint}
                className={`flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 cursor-pointer ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Complaint
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;