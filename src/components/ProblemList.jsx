const ProblemList = ({ problems, completedProblems, onToggleProblem, togglingProblem }) => {
  const isProblemCompleted = (problemId) => {
    return completedProblems.includes(problemId);
  };

  if (problems.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg">No problems available for this topic yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => {
        const isCompleted = isProblemCompleted(problem._id);
        const isToggling = togglingProblem === problem._id;
        
        return (
          <div
            key={problem._id}
            className={`card p-5 transition-all duration-300 hover:shadow-xl ${
              isCompleted ? 'bg-green-50 border-2 border-green-300' : 'bg-white border-2 border-gray-100 hover:border-primary-300'
            } ${isToggling ? 'opacity-60' : ''}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={`problem-${problem._id}`}
                    checked={isCompleted}
                    onChange={() => onToggleProblem(problem._id)}
                    disabled={isToggling}
                    className="w-5 h-5 mt-1 cursor-pointer accent-primary-500 disabled:cursor-not-allowed"
                  />
                  {isToggling && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <label
                  htmlFor={`problem-${problem._id}`}
                  className={`cursor-pointer flex-1 ${
                    isCompleted ? 'line-through text-green-600' : 'text-gray-800'
                  } ${isToggling ? 'pointer-events-none' : ''}`}
                >
                  <h3 className="text-lg font-semibold">{problem.title}</h3>
                </label>
              </div>
              
              <span className={`difficulty-badge difficulty-${problem.difficulty.toLowerCase()}`}>
                {problem.difficulty}
              </span>
            </div>

            {problem.description && (
              <p className="text-gray-600 text-sm mb-4 ml-8">{problem.description}</p>
            )}

            <div className="flex flex-wrap gap-2 ml-8">
              {problem.youtubeLink && (
                <a
                  href={problem.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button bg-red-600 hover:bg-red-700"
                >
                  <span>▶️</span>
                  YouTube
                </a>
              )}

              {problem.leetcodeLink && (
                <a
                  href={problem.leetcodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button bg-orange-500 hover:bg-orange-600"
                >
                  <span>💻</span>
                  LeetCode
                </a>
              )}

              {problem.codeforcesLink && (
                <a
                  href={problem.codeforcesLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button bg-blue-600 hover:bg-blue-700"
                >
                  <span>🏆</span>
                  Codeforces
                </a>
              )}

              {problem.articleLink && (
                <a
                  href={problem.articleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button bg-gray-600 hover:bg-gray-700"
                >
                  <span>📄</span>
                  Article
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProblemList;
