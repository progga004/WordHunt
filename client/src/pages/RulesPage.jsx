import { Link } from "react-router-dom"

const RulesPage = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-200">
          <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8 m-4">
              <h1 className="text-2xl font-bold text-center mb-6">Game Rules</h1>
              <div className="space-y-4">
                  <p><strong>Game Objective:</strong> The goal is for players to guess the five-letter word their opponent has chosen from a provided list. Players alternate turns after each guess. The first to accurately guess the opponent's word wins.</p>
                  <p><strong>Word Selection:</strong> Each player secretly chooses a five-letter word from the provided list.</p>
                  <p><strong>Guessing Turns:</strong> Players take turns attempting to guess the word selected by their opponent.</p>
                  <p><strong>Feedback Mechanism:</strong> After each guess, immediate feedback is provided: Green for a completely correct guess. Red for an incorrect guess. The feedback will also indicate which letters from the guess are correct and part of the word.</p>
                  <p><strong>Winning the Game:</strong> A player wins by guessing their opponent's word correctly first.</p>
                  <p><strong>Stats Tracking:</strong> Wins and losses are recorded for each player after the game concludes.</p>
              </div>
              <div className="text-center mt-6">
                  <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Back to Home
                  </Link>
              </div>
          </div>
      </div>
    )
  }
  
  export default RulesPage
  