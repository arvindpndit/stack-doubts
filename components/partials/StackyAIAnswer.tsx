import React from 'react';

const StackyAIAnswer = () => {
  return (
    <div className="flex items-center mt-10 border rounded-2xl border-gray-300  dark:border-gray-800">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between p-6 bg-gradient-to-b from-red-100 to-white dark:from-gray-900 dark:to-black text-center sm:text-left rounded-2xl shadow-lg">
        {/* Left Section: Logo & Subtext */}
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-500 dark:text-yellow-400">★</span>
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">
              Stacky AI
            </span>
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
            AI assistance, powered by Google Gemini.
          </p>
        </div>

        {/* Right Section: Button */}
        <button className="mt-4 sm:mt-0 px-5 sm:px-6 py-2 font-semibold rounded-full shadow-md transition bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:opacity-90">
          Ask Stacky AI
        </button>
      </div>
    </div>
  );
};

export default StackyAIAnswer;

