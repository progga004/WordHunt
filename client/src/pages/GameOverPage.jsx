import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GameOverPage = ({socket}) => {
  const navigate = useNavigate();
  const gameResult = useLocation().state.result;
  console.log("reaching here");

  useEffect(() => {
    setTimeout(() => {
      socket.disconnect();
    }, 10)
  })

  const renderMessage = () => {
    switch (gameResult) {
      case "win":
        return "Congratulations, You won!";
      case "lose":
        return "You lost. Better luck next time!";
      case "draw":
        return "It's a draw!";
      default:
        return "You Forfeited";
    }
  };

  const handlePlayAgain = () => {
    navigate("/");
  };

  const handleStats = () => {
    navigate("/stats");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-200">
      <div className="max-w-md w-full rounded-lg border border-gray-200 shadow-md flex flex-col p-6 bg-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 self-center">
          Game Over
        </h2>
        <p className="text-xl text-gray-700 mb-8 self-center">
          {renderMessage()}
        </p>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handlePlayAgain}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 w-full"
          >
            Play Again
          </button>
          <button
            onClick={handleStats}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 w-full"
          >
            Show Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverPage;
