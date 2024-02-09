import { useState } from "react";
import { useLocation } from 'react-router-dom';
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import CenterPanel from "../components/CenterPanel";
const GamePage = ({socket}) => {
  const actualWordLeft = "JELLY";
  const actualWordRight = "APPLE";
  const location = useLocation();//
  const [guessesLeft, setGuessesLeft] = useState([]);
  const [guessesRight, setGuessesRight] = useState([]);
  const { isYourTurn, playerOneUsername } = location.state || {};
  const [resetFlag, setResetFlag] = useState(false);

  const handleGuessSubmission = (newGuess) => {
    if (isYourTurn) {
      setGuessesLeft((oldGuesses) => [...oldGuesses, newGuess]);
    } else {
      setGuessesRight((oldGuesses) => [...oldGuesses, newGuess]);
    }
    setIsYourTurn(!isYourTurn);
    setResetFlag((flag) => !flag);
  };

  return (
    <div className="bg-green-200 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 flex justify-between items-start">
        <LeftPanel
          username="player1"
          guesses={guessesLeft}
          actualWord={actualWordRight}
          socket={socket}
        />
        <CenterPanel
          actualWord={isYourTurn ? actualWordRight : actualWordLeft}
          isYourTurn={isYourTurn}
          onSubmitGuess={handleGuessSubmission}
          resetInputs={resetFlag}
        />
        <RightPanel
          username="player2"
          guesses={guessesRight}
          actualWord={actualWordLeft}
        />
      </div>
    </div>
  );
};

export default GamePage;
