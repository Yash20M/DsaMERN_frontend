import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, problemsAPI } from '../services/api';
import Navbar from './Navbar';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState({ completedCount: 0, totalProblems: 0, progressPercentage: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const [profileRes, progressRes] = await Promise.all([
        authAPI.getProfile(),
        problemsAPI.getProgress()
      ]);
      
      setProfile(profileRes.data);
      setProgress(progressRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">My Profile</h1>
          <p className="text-lg opacity-90">Track your DSA learning journey</p>
        </div>

        <div className="card p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">{profile?.name}</h2>
              <p className="text-gray-600">{profile?.email}</p>
            </div>
          </div>

          
          <div className="border-t-2 border-gray-200 pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Overall Progress</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {progress.completedCount}
                </div>
                <div className="text-sm text-gray-600">Problems Solved</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {progress.totalProblems}
                </div>
                <div className="text-sm text-gray-600">Total Problems</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {progress.progressPercentage}%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
            </div>

         
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span className="font-semibold">{progress.completedCount} / {progress.totalProblems}</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
                  style={{ width: `${progress.progressPercentage}%` }}
                />
              </div>
            </div>

           
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full btn-primary py-3 text-lg font-semibold"
            >
              Go to Topcis
            </button>
          </div>
        </div>

        {/* Motivational Section */}
        {progress.progressPercentage < 100 && (
          <div className="card p-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            <h3 className="text-xl font-bold mb-2">Keep Going! 🚀</h3>
            <p className="opacity-90">
              You're doing great! {progress.totalProblems - progress.completedCount} more problems to complete your DSA journey.
            </p>
          </div>
        )}

        {progress.progressPercentage === 100 && (
          <div className="card p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <h3 className="text-xl font-bold mb-2">Congratulations! 🎉</h3>
            <p className="opacity-90">
              You've completed all problems! You're a DSA master!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
