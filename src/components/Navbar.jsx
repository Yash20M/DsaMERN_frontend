import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/topics" className="flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              DSA Tracker
            </span>
          </Link>
          
          {user && (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="text-gray-600 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                Profile
              </Link>
              <Link
                to="/topics"
                className="text-gray-600 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                Topics
              </Link>
              <Link
                to="/progress"
                className="text-gray-600 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                Progress
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
