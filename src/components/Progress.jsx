import { useState, useEffect } from 'react';
import { topicsAPI, problemsAPI } from '../services/api';
import Navbar from './Navbar';

const Progress = () => {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState({ 
    completedCount: 0, 
    totalProblems: 0, 
    progressPercentage: 0,
    byDifficulty: {
      easy: { total: 0, completed: 0, percentage: 0 },
      medium: { total: 0, completed: 0, percentage: 0 },
      hard: { total: 0, completed: 0, percentage: 0 }
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [topicsRes, progressRes] = await Promise.all([
        topicsAPI.getAll(),
        problemsAPI.getProgress()
      ]);
      
      setTopics(topicsRes.data);
      setProgress(progressRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const completedTopics = topics.filter(t => t.isCompleted).length;
  const totalTopics = topics.length;
  const byDifficulty = progress.byDifficulty || {
    easy: { total: 0, completed: 0, percentage: 0 },
    medium: { total: 0, completed: 0, percentage: 0 },
    hard: { total: 0, completed: 0, percentage: 0 }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">Your Progress</h1>
          <p className="text-lg opacity-90">Track your DSA learning journey</p>
        </div>

        {/* Overall Progress Card */}
        <div className="card p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Overall Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-5xl mb-2">📝</div>
              <div className="text-4xl font-bold mb-1">{progress.totalProblems}</div>
              <div className="text-blue-100">Total Problems</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-5xl mb-2">✅</div>
              <div className="text-4xl font-bold mb-1">{progress.completedCount}</div>
              <div className="text-green-100">Completed</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-5xl mb-2">📊</div>
              <div className="text-4xl font-bold mb-1">{parseFloat(progress.progressPercentage).toFixed(0)}%</div>
              <div className="text-purple-100">Progress</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span className="font-semibold">{progress.completedCount} / {progress.totalProblems}</span>
            </div>
            <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${progress.progressPercentage}%` }}
              >
                {parseFloat(progress.progressPercentage) > 10 && (
                  <span className="text-white text-xs font-bold">{parseFloat(progress.progressPercentage).toFixed(0)}%</span>
                )}
              </div>
            </div>
          </div>

          {/* Topics Progress */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Topics Completed</span>
              <span className="text-2xl font-bold text-primary-600">{completedTopics} / {totalTopics}</span>
            </div>
          </div>

          {/* Difficulty-wise Progress */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Progress by Difficulty</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Easy */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🟢</span>
                    <h4 className="text-lg font-bold text-green-700">Easy</h4>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {parseFloat(byDifficulty.easy.percentage).toFixed(0)}%
                  </span>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  {byDifficulty.easy.completed} / {byDifficulty.easy.total} problems
                </div>
                <div className="w-full h-3 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                    style={{ width: `${byDifficulty.easy.percentage}%` }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🟡</span>
                    <h4 className="text-lg font-bold text-yellow-700">Medium</h4>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">
                    {parseFloat(byDifficulty.medium.percentage).toFixed(0)}%
                  </span>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  {byDifficulty.medium.completed} / {byDifficulty.medium.total} problems
                </div>
                <div className="w-full h-3 bg-yellow-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
                    style={{ width: `${byDifficulty.medium.percentage}%` }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔴</span>
                    <h4 className="text-lg font-bold text-red-700">Hard</h4>
                  </div>
                  <span className="text-2xl font-bold text-red-600">
                    {parseFloat(byDifficulty.hard.percentage).toFixed(0)}%
                  </span>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  {byDifficulty.hard.completed} / {byDifficulty.hard.total} problems
                </div>
                <div className="w-full h-3 bg-red-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"
                    style={{ width: `${byDifficulty.hard.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Topic-wise Progress */}
        <div className="card p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Topic-wise Progress</h2>
          
          <div className="space-y-4">
            {topics.map((topic) => (
              <div
                key={topic._id}
                className={`p-6 rounded-xl transition-all duration-200 ${
                  topic.isCompleted
                    ? 'bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-800">{topic.name}</h3>
                    {topic.isCompleted && (
                      <span className="text-2xl" title="Topic Completed!">🎉</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      {topic.completionPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {topic.completedProblems}/{topic.totalProblems} problems
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full transition-all duration-500 ${
                      topic.isCompleted
                        ? 'bg-gradient-to-r from-green-400 to-green-500'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-400'
                    }`}
                    style={{ width: `${topic.completionPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
