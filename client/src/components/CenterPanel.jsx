import React, { useState, useEffect } from "react";
import LetterBox from "./LetterBox";

const CenterPanel = ({
  actualWord,
  isYourTurn,
  onSubmitGuess,
  resetInputs,
}) => {
  const [inputs, setInputs] = useState(Array(actualWord.length).fill(""));
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    setInputs(Array(actualWord.length).fill(""));
  }, [resetInputs, actualWord]);

  const handleLetterChange = (index) => (e) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value.toUpperCase();
    setInputs(newInputs);
    if (feedbackMessage) {
      setFeedbackMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.some((input) => input === "")) {
      setFeedbackMessage("Please fill in all the letters before submitting.");
      return;
    }

    const userGuess = inputs.join("");
    onSubmitGuess(userGuess);

    if (userGuess.toUpperCase() === actualWord.toUpperCase()) {
      setFeedbackMessage("Correct! Well done.");
    } else {
      setFeedbackMessage("Incorrect guess, try again!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Guess the Word</h1>
      {isYourTurn ? (
        <h2 className="text-2xl font-bold text-green-800 mb-6">Your Turn!</h2>
      ) : (
        <h2 className="text-2xl font-bold text-red-800 mb-6">Player 2 Turn!</h2>
      )}

      <div className="flex mb-4">
        {inputs.map((letter, index) => (
          <LetterBox
            key={index}
            letter={letter}
            onChange={handleLetterChange(index)}
            id={`letter-${index}`}
          />
        ))}
      </div>

      {feedbackMessage && (
        <div
          className={`text-xl mt-4 p-4 rounded ${
            feedbackMessage.startsWith("Correct")
              ? "text-green-700 bg-green-200"
              : "text-red-700 bg-red-200"
          } font-bold shadow-md mb-6`}
        >
          {feedbackMessage}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="text-xl bg-green-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-colors"
      >
        Submit
      </button>
    </div>
  );
};

export default CenterPanel;
