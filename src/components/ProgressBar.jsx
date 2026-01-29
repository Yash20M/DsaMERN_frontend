const ProgressBar = ({ progress }) => {
  const { completedCount, totalProblems, progressPercentage } = progress;

  return (
    <div className="card p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Progress</h3>
        <p className="text-gray-600">
          <span className="text-2xl font-bold text-primary-600">{completedCount}</span>
          <span className="text-gray-500"> / {totalProblems}</span> problems completed
        </p>
      </div>
      
      <div className="relative mb-6">
        <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-end pr-3 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage > 5 && (
              <span className="text-white font-bold text-sm">
                {progressPercentage}%
              </span>
            )}
          </div>
        </div>
        {progressPercentage <= 5 && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600 font-bold text-sm">
            {progressPercentage}%
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg text-center">
          <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Remaining</p>
          <p className="text-3xl font-bold text-gray-700">{totalProblems - completedCount}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
          <p className="text-xs text-green-700 uppercase tracking-wide mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-600">{completedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
