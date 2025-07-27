import React, { useState } from 'react';
import { 
  LayoutDashboard,
  BarChart3,
  LogOut,
  Menu,
  X,
  Users,
  FileText,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar,
  Settings,
  Bell,
  Search,
  Filter,
  Eye,
  ThumbsUp,
  User,
  ChevronRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser] = useState({
    name: 'Admin User',
    role: 'Administrator',
    avatar: null
  });

  // Mock data for dashboard
  const [dashboardStats] = useState({
    totalComplaints: 156,
    pendingComplaints: 42,
    resolvedComplaints: 89,
    inProgressComplaints: 25,
    totalUsers: 1247,
    activeUsers: 892
  });

  const [recentComplaints] = useState([
    {
      id: 1,
      title: 'Broken Air Conditioning in Office 3A',
      author: 'Sarah Johnson',
      department: 'Marketing',
      category: 'Maintenance',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z',
      upvotes: 15,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Cafeteria Food Quality Issues',
      author: 'Mike Chen',
      department: 'IT',
      category: 'Food & Dining',
      status: 'in-progress',
      createdAt: '2024-01-14T14:20:00Z',
      upvotes: 23,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Parking Space Shortage',
      author: 'Emily Davis',
      department: 'HR',
      category: 'Facilities',
      status: 'resolved',
      createdAt: '2024-01-13T09:15:00Z',
      upvotes: 31,
      priority: 'low'
    },
    {
      id: 4,
      title: 'Slow Internet Connection',
      author: 'David Wilson',
      department: 'Sales',
      category: 'Technology',
      status: 'pending',
      createdAt: '2024-01-12T16:45:00Z',
      upvotes: 18,
      priority: 'high'
    }
  ]);

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      active: true
    },
    {
      id: 'stats',
      label: 'Statistics',
      icon: BarChart3,
      active: false
    }
  ];

  const statusConfig = {
    pending: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle, label: 'Pending' },
    'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'In Progress' },
    resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' }
  };

  const priorityConfig = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out... This would redirect to login page');
      // In real app: clear auth tokens, redirect to login
    }
  };

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

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {currentUser.name}!</h1>
        <p className="text-blue-100">Here's what's happening in your organization today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalComplaints}</p>
              <p className="text-sm text-gray-600">Total Complaints</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">{dashboardStats.pendingComplaints}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{dashboardStats.inProgressComplaints}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{dashboardStats.resolvedComplaints}</p>
              <p className="text-sm text-gray-600">Resolved</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">{dashboardStats.totalUsers}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-indigo-600">{dashboardStats.activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Complaints</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-gray-900">{complaint.title}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityConfig[complaint.priority]}`}>
                      {complaint.priority.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {complaint.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(complaint.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {complaint.upvotes}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig[complaint.status].color}`}>
                    {getStatusIcon(complaint.status)}
                    <span className="ml-1">{statusConfig[complaint.status].label}</span>
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Complaint Resolution Rate</h3>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {Math.round((dashboardStats.resolvedComplaints / dashboardStats.totalComplaints) * 100)}%
            </div>
            <p className="text-blue-700 text-sm">
              {dashboardStats.resolvedComplaints} out of {dashboardStats.totalComplaints} resolved
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">User Engagement</h3>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {Math.round((dashboardStats.activeUsers / dashboardStats.totalUsers) * 100)}%
            </div>
            <p className="text-green-700 text-sm">
              {dashboardStats.activeUsers} active out of {dashboardStats.totalUsers} users
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">Pending Issues</h3>
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {dashboardStats.pendingComplaints + dashboardStats.inProgressComplaints}
            </div>
            <p className="text-orange-700 text-sm">
              Requires immediate attention
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {[
            { name: 'Technology', count: 45, color: 'bg-blue-500' },
            { name: 'Maintenance', count: 38, color: 'bg-green-500' },
            { name: 'Facilities', count: 32, color: 'bg-purple-500' },
            { name: 'Food & Dining', count: 28, color: 'bg-orange-500' },
            { name: 'Environment', count: 13, color: 'bg-red-500' }
          ].map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span className="text-gray-700">{category.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-medium">{category.count}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${(category.count / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-64 lg:w-64'
      } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed lg:relative z-30 h-full`}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200">
          {/* User Profile */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser.role}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                <p className="text-sm text-gray-500">
                  {activeTab === 'dashboard' ? 'Overview of system activity' : 'Detailed analytics and reports'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-64"
                />
              </div>
              
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'stats' && renderStats()}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;