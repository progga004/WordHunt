const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-200">
      {/* Container */}
      <div className="flex flex-col items-center space-y-6">
        {/* Find Game */}
        <button className="bg-green-500 text-white font-bold text-2xl py-4 px-10 rounded-xl hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-700 transition duration-200">
          Find Game
        </button>
        {/* View Stats */}
        <button className="bg-green-500 text-white font-bold text-2xl py-4 px-10 rounded-xl hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-700 transition duration-200">
          View Stats
        </button>
        {/* View Rules */}
        <a href="#" className="text-green-600 hover:text-green-800 text-lg font-semibold">
          View Rules
        </a>
      </div>
    </div>
  );
};

export default HomePage;
