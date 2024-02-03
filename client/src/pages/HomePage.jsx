const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-200">
      {/* Container for the buttons and link */}
      <div className="flex flex-col items-center space-y-4">
        {/* Button 1 */}
        <button className="bg-green-500 text-white font-bold text-xl py-3 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-700">
          Find Game
        </button>
        {/* Button 2 */}
        <button className="bg-green-500 text-white font-bold text-xl py-3 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-700">
          View Stats
        </button>
        {/* Small text link */}
        <a href="#" className="text-green-500 hover:text-green-700 text-base">
          View Rules
        </a>
      </div>
    </div>
  );
};

export default HomePage;
