import { useState, useEffect } from 'react';
import { topicsAPI, problemsAPI } from '../services/api';
import Navbar from './Navbar';
import ProblemList from './ProblemList';
import ProgressBar from './ProgressBar';

const Dashboard = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [problems, setProblems] = useState([]);
  const [completedProblems, setCompletedProblems] = useState([]);
  const [progress, setProgress] = useState({ completedCount: 0, totalProblems: 0, progressPercentage: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
    fetchProgress();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      fetchProblems(selectedTopic._id);
    }
  }, [selectedTopic]);

  const fetchTopics = async (preserveSelection = false) => {
    try {
      const response = await topicsAPI.getAll();
      setTopics(response.data);
      
      if (preserveSelection && selectedTopic) {
        // Find and update the currently selected topic with fresh data
        const updatedSelectedTopic = response.data.find(t => t._id === selectedTopic._id);
        if (updatedSelectedTopic) {
          setSelectedTopic(updatedSelectedTopic);
        }
      } else if (response.data.length > 0 && !selectedTopic) {
        // Only set first topic if no topic is selected
        setSelectedTopic(response.data[0]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching topics:', error);
      setLoading(false);
    }
  };

  const fetchProblems = async (topicId) => {
    try {
      const response = await problemsAPI.getByTopic(topicId);
      setProblems(response.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await problemsAPI.getProgress();
      setProgress(response.data);
      setCompletedProblems(response.data.completedProblems);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleToggleProblem = async (problemId) => {
    try {
      await problemsAPI.toggleCompletion(problemId);
      await fetchProgress();
      await fetchTopics(true); // Refresh topics while preserving selection
    } catch (error) {
      console.error('Error toggling problem:', error);
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">DSA Sheet Tracker</h1>
          <p className="text-lg opacity-90">Master Data Structures & Algorithms step by step</p>
        </div>

        <ProgressBar progress={progress} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Topics Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Topics</h2>
              <div className="space-y-3">
                {topics.map((topic) => (
                  <div
                    key={topic._id}
                    onClick={() => handleTopicClick(topic)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedTopic?._id === topic._id
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg transform scale-105'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-base">{topic.name}</h3>
                      {topic.isCompleted && (
                        <span className="text-green-400 text-xl" title="Topic Completed!">
                          ✅
                        </span>
                      )}
                    </div>
                    <p className={`text-xs ${selectedTopic?._id === topic._id ? 'text-white opacity-90' : 'text-gray-600'}`}>
                      {topic.description}
                    </p>
                    {topic.totalProblems > 0 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={selectedTopic?._id === topic._id ? 'text-white' : 'text-gray-600'}>
                            {topic.completedProblems}/{topic.totalProblems}
                          </span>
                          <span className={selectedTopic?._id === topic._id ? 'text-white font-semibold' : 'text-gray-700 font-semibold'}>
                            {topic.completionPercentage}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              topic.isCompleted ? 'bg-green-400' : 'bg-yellow-400'
                            }`}
                            style={{ width: `${topic.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Problems Content */}
          <div className="lg:col-span-3">
            <div className="card p-6">
              {selectedTopic && (
                <>
                  <div className="mb-6 pb-4 border-b-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                          {selectedTopic.name}
                        </h2>
                        <p className="text-gray-600">{selectedTopic.description}</p>
                      </div>
                      {selectedTopic.isCompleted && (
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-5xl">🎉</span>
                          <span className="text-sm font-bold text-green-600">Completed!</span>
                        </div>
                      )}
                    </div>
                    {selectedTopic.totalProblems > 0 && (
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          Progress: <span className="font-semibold text-primary-600">
                            {selectedTopic.completedProblems}/{selectedTopic.totalProblems}
                          </span>
                        </span>
                        <span className="text-gray-600">
                          <span className="font-semibold text-primary-600">
                            {selectedTopic.completionPercentage}%
                          </span> Complete
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <ProblemList
                    problems={problems}
                    completedProblems={completedProblems}
                    onToggleProblem={handleToggleProblem}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
