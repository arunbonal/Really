import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApiData } from "../contexts/ApiContext";
const backendUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useApiData();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScanHistory, setShowScanHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAllScans = async (category = null) => {
    setDeleting(true);
    try {
      const url = category 
        ? `${backendUrl}/auth/scans?category=${category}`
        : `${backendUrl}/auth/scans`;
        
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      
      if (response.ok) {
        const result = await response.json();
        // Refresh user stats
        const statsResponse = await fetch(`${backendUrl}/auth/stats`, {
          credentials: "include",
        });
        if (statsResponse.ok) {
          const stats = await statsResponse.json();
          setUserStats(stats);
        }
        setShowDeleteConfirm(false);
        setSelectedCategory(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to delete scans:", response.status, errorData);
        alert(`Failed to delete scans: ${errorData.message || response.statusText || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting scans:", error);
      alert("Error deleting scans. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/auth/stats`, {
          credentials: "include",
        });
        if (response.ok) {
          const stats = await response.json();
          setUserStats(stats);
        } else {
          console.error("Failed to fetch stats:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserStats();
    }
  }, [user]);

  // Refresh stats when component comes into focus
  useEffect(() => {
    const handleFocus = () => {
      if (user) {
        const fetchUserStats = async () => {
          try {
            const response = await fetch(`${backendUrl}/auth/stats`, {
              credentials: "include",
            });
            if (response.ok) {
              const stats = await response.json();
              setUserStats(stats);
            }
          } catch (error) {
            console.error("Error refreshing user stats:", error);
          }
        };
        fetchUserStats();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4 gradient-text">
            Not Authenticated
          </h2>
          <p className="text-gray-600 mb-8">
            Please sign in to view your profile
          </p>
          <button 
            onClick={() => navigate("/")}
            className="btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Profile Header */}
        <div className="glass-effect p-8 rounded-3xl mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="text-center md:text-left">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.displayName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mx-auto md:mx-0">
                  <span className="text-white font-bold text-4xl">
                    {user.displayName?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2 gradient-text">
                {user.displayName}
              </h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => navigate("/product/food")}
                  className="btn-primary"
                >
                  Browse Products
                </button>
                <button 
                  onClick={() => navigate("/")}
                  className="btn-secondary"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Account Information */}
          <div className="glass-effect p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 gradient-text">
              Account Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-gray-600">{user.displayName}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">{user.email}</span>
              </div>

            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-effect p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 gradient-text">
              Your Activity
            </h2>
            {loading ? (
              <div className="space-y-4">
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                  <span className="font-semibold text-gray-700">Total Products Scanned:</span>
                  <span className="text-2xl font-bold gradient-text">{userStats?.totalScans || 0}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <button 
                    onClick={() => {
                      setSelectedCategory('food');
                      setShowScanHistory(true);
                    }}
                    className="text-center p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-green-600">{userStats?.foodScans || 0}</div>
                    <div className="text-xs text-gray-600">Food</div>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedCategory('beauty');
                      setShowScanHistory(true);
                    }}
                    className="text-center p-2 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-pink-600">{userStats?.beautyScans || 0}</div>
                    <div className="text-xs text-gray-600">Beauty</div>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedCategory('meds');
                      setShowScanHistory(true);
                    }}
                    className="text-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-blue-600">{userStats?.medsScans || 0}</div>
                    <div className="text-xs text-gray-600">Meds</div>
                  </button>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                  <span className="font-semibold text-gray-700">Saved Searches:</span>
                  <span className="text-lg font-bold gradient-text">{userStats?.savedSearches || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                  <span className="font-semibold text-gray-700">Reviews Given:</span>
                  <span className="text-lg font-bold gradient-text">{userStats?.reviews || 0}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="glass-effect p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 gradient-text">
            Account Actions
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate("/product/food")}
              className="btn-primary flex-1"
            >
              Browse Categories
            </button>
            <button 
              onClick={() => navigate("/")}
              className="btn-secondary flex-1"
            >
              Go Home
            </button>
            <button 
              onClick={() => {
                setDeleteCategory(null);
                setShowDeleteConfirm(true);
              }}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 flex-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Scan History
            </button>
            <button 
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Scan History Modal */}
      {showScanHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold gradient-text">
                {selectedCategory === 'food' && '🥤 Food Scans'}
                {selectedCategory === 'beauty' && '🧴 Beauty Scans'}
                {selectedCategory === 'meds' && '💊 Medicine Scans'}
              </h2>
              <button
                onClick={() => setShowScanHistory(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {userStats?.recentScans && userStats.recentScans.length > 0 ? (
                <div className="space-y-4">
                  {userStats.recentScans
                    .filter(scan => scan.category === selectedCategory)
                    .map((scan, index) => (
                                              <div key={index} className="glass-effect p-4 rounded-xl">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800 mb-1">
                                {scan.productName || "Unknown Product"}
                              </div>
                              <div className="text-sm text-gray-600 mb-1">
                                Barcode: {scan.productId}
                              </div>
                              <div className="text-xs text-gray-500">
                                Category: {scan.category.charAt(0).toUpperCase() + scan.category.slice(1)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-700">
                                {new Date(scan.scanDate).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(scan.scanDate).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  
                  {userStats.recentScans.filter(scan => scan.category === selectedCategory).length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">
                        {selectedCategory === 'food' && '🥤'}
                        {selectedCategory === 'beauty' && '🧴'}
                        {selectedCategory === 'meds' && '💊'}
                      </div>
                      <p className="text-gray-600">No {selectedCategory} scans found</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">
                    {selectedCategory === 'food' && '🥤'}
                    {selectedCategory === 'beauty' && '🧴'}
                    {selectedCategory === 'meds' && '💊'}
                  </div>
                  <p className="text-gray-600">No scans found for this category</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total {selectedCategory} scans: {userStats?.recentScans?.filter(scan => scan.category === selectedCategory).length || 0}
                </div>
                <div className="flex gap-2">
                  {userStats?.recentScans?.filter(scan => scan.category === selectedCategory).length > 0 && (
                    <button
                      onClick={() => {
                        setDeleteCategory(selectedCategory);
                        setShowScanHistory(false);
                        setShowDeleteConfirm(true);
                      }}
                      className="px-4 py-2 text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-sm"
                    >
                      Clear {selectedCategory}
                    </button>
                  )}
                  <button
                    onClick={() => setShowScanHistory(false)}
                    className="btn-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full">
            {/* Modal Header */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                ⚠️ {deleteCategory ? `Clear ${deleteCategory} Scans` : 'Clear All Scan History'}
              </h2>
              <p className="text-gray-600">
                {deleteCategory 
                  ? `Are you sure you want to delete all your ${deleteCategory} scan history? This action cannot be undone.`
                  : 'Are you sure you want to delete all your scan history? This action cannot be undone.'
                }
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-red-700 font-medium">Warning</span>
                </div>
                <p className="text-red-600 text-sm mt-1">
                  {deleteCategory 
                    ? `This will permanently delete all ${userStats?.recentScans?.filter(scan => scan.category === deleteCategory).length || 0} ${deleteCategory} scanned products from your history.`
                    : `This will permanently delete all ${userStats?.totalScans || 0} scanned products from your history.`
                  }
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAllScans(deleteCategory)}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  deleteCategory ? `Delete ${deleteCategory} Scans` : 'Delete All Scans'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 