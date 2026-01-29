import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Topics = lazy(() => import('./components/Topics'));
const Progress = lazy(() => import('./components/Progress'));
const Profile = lazy(() => import('./components/Profile'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    <p className="text-white mt-4 text-lg">Loading...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Topics />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/topics"
              element={
                <PrivateRoute>
                  <Topics />
                </PrivateRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <PrivateRoute>
                  <Progress />
                </PrivateRoute>
              }
            />
            {/* Redirect old dashboard route to topics */}
            <Route path="/dashboard" element={<Navigate to="/topics" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
