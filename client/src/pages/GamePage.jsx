import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import CenterPanel from "../components/CenterPanel";
const GamePage = ({socket}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [guessesLeft, setGuessesLeft] = useState([]);
  const [guessesRight, setGuessesRight] = useState([]);
  const { isYourTurn, username, otherPlayer, word } = location.state || {};
  const [currentUserTurn, setTurn] = useState(isYourTurn ? username : otherPlayer);
  const [leftLetters, setLeftLetters] = useState([]);
  const [rightLetters, setRightLetters] = useState([]);
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("SWITCH TURN", (nextUser, word, lettersInCommon) => {
        if (username === nextUser) {
          setGuessesRight((oldGuesses) => [...oldGuesses, word]);
          setRightLetters((oldGuesses) => [...oldGuesses, lettersInCommon]);
        }
        else {
          setLeftLetters((oldGuesses) => [...oldGuesses, lettersInCommon]);
        }

        setResetFlag((flag) => !flag);
        setTurn(nextUser);
      });

      socket.on("GAME OVER", winner => {
        let result;
        if (username === winner)
          result = "win";
        else
          result = "lose";

        navigate('/game-over', {state: {result}});
      })
    } else
      navigate("/");
  }, [socket])

  const handleGuessSubmission = (newGuess) => {
    if (currentUserTurn === username) {
      setGuessesLeft((oldGuesses) => [...oldGuesses, newGuess]);
    }
    socket.emit("WORD GUESS", newGuess);
  };

  return (
    <div className="bg-green-200 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 flex justify-between items-start">
        <LeftPanel
          username={username}
          guesses={guessesLeft}
          socket={socket}
          letters={leftLetters}
        />
        {(currentUserTurn === username) ? <CenterPanel
          isYourTurn={currentUserTurn === username}
          word={word}
          onSubmitGuess={handleGuessSubmission}
          resetInputs={resetFlag}
        /> : <h1>Waiting for {otherPlayer}</h1>}
        <RightPanel
          username={otherPlayer}
          guesses={guessesRight}
          letters={rightLetters}
        />
      </div>
    </div>
  );
};

export default GamePage;
