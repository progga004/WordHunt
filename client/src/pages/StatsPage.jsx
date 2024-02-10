import { useState } from "react";
import { Link } from "react-router-dom";
import { gamesAPI } from "../components/Api";
import { useEffect } from "react";
import Cookies from 'js-cookie';
const StatsPage = () => {
  const username=Cookies.get('username');
  const [allGames, setAllGames] = useState([]);
  const [playerStats, setPlayerStats] = useState({});
  const [mostGuessedWord, setMostGuessedWord] = useState({
    word: "",
    count: 0,
  });
  const [currentSortOrder, setCurrentSortOrder] = useState("asIs");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const allGamesResponse = await gamesAPI.getAllGames();
        setAllGames(allGamesResponse);
        calculatePlayerStats(allGamesResponse);
        calculateMostGuessedWords(allGamesResponse);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();

    const pollingInterval = setInterval(fetchGames, 5000);

    return () => clearInterval(pollingInterval);
  }, []);

  const calculateMostGuessedWords = (games) => {
    let wordCounts = {};
    games.forEach((game) => {
      ["p1word", "p2word"].forEach((key) => {
        const word = game[key];
        const player = game[key === "p1word" ? "player1" : "player2"];
        if (word) {
          if (!wordCounts[player]) {
            wordCounts[player] = {};
          }
          wordCounts[player][word] = (wordCounts[player][word] || 0) + 1;
        }
      });
    });

    let mostGuessed = {};
    Object.keys(wordCounts).forEach((player) => {
      mostGuessed[player] = Object.entries(wordCounts[player]).reduce(
        (acc, [word, count]) => {
          return count > acc.count ? { word, count } : acc;
        },
        { word: "", count: 0 }
      );
    });

    setMostGuessedWord(mostGuessed);
  };

  const calculatePlayerStats = (games) => {
    const stats = {};
    games.forEach((game) => {
      const { player1, player2, winner } = game;
      const players = [player1, player2];

      players.forEach((player) => {
        if (!stats[player]) {
          stats[player] = { wins: 0, losses: 0 };
        }
        if (winner === player) {
          stats[player].wins += 1;
        } else if (winner && winner !== player) {
          stats[player].losses += 1;
        }
      });
    });
    setPlayerStats(stats);
  };

  const setToNewest = () => {
    setCurrentSortOrder("newest");
  };

  //displays all games
  const setToAll = () => {
    setCurrentSortOrder("asIs");
  };

  //sets sortorder to games from last hour
  const setToLastHour = () => {
    setCurrentSortOrder("lastHour");
  };

  //use this function for sorting the games
  const sortGames = (games, sortOrder) => {
    if (sortOrder === "newest") {
      // sorts all games by newest first
      return games.sort((a, b) => a.endttime - b.endttime);
    }  else if (sortOrder === "lastHour") {
      let lastHour = [];
      for (let i = 0; i < allGames.length; i++) {
        if (new Date() - allGames[i].endttime <= 3600000) {
          lastHour.push(allGames[i]);
        }
      }
      return lastHour;
    } else if (sortOrder === "asIs") {
      return games;
    }
  };

  return (
    <div className="bg-green-200 min-h-screen pt-10">
      <div className="flex justify-between items-center px-5 lg:px-10 py-10">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Back to Home
        </Link>
        <div className="px-5 lg:px-10 py-2">
        <h1 className="text-2xl text-yellow-700 font-bold font-serif">Hello, {username}</h1>
      </div>
        <div className="space-x-2">
          <button
            onClick={setToAll}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            All
          </button>
          <button
            onClick={setToLastHour}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Last Hour
          </button>
          <button
            onClick={setToNewest}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Newest
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center w-full py-4 lg:py-8">
        <div className="overflow-x-auto overflow-y-auto w-full max-w-6xl mx-auto">
          <table className="table-auto shadow-lg bg-white w-full">
            <thead className="bg-green-600 text-white text-left text-sm leading-normal">
              <tr>
                <th className="py-3 px-6">Player 1</th>
                <th className="py-3 px-6">Player 2</th>
                <th className="py-3 px-6 text-center">Winner</th>
                <th className="py-3 px-6 text-center">Start Time</th>
                <th className="py-3 px-6 text-center">End Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {sortGames(allGames, currentSortOrder).map((game) => (
                <tr
                  key={game}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{game.player1}</td>
                  <td className="py-3 px-6 ">{game.player2}</td>
                  <td className="py-3 px-6 text-center">{game.winner}</td>
                  <td className="py-3 px-6 text-center">
                    {new Date(game.starttime).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {new Date(game.endttime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center w-full py-4 lg:py-8">
        <table className="table-auto shadow-lg bg-white w-full max-w-6xl mx-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6">Player</th>
              <th className="py-3 px-6 text-center">Wins</th>
              <th className="py-3 px-6 text-center">Losses</th>
              <th className="py-3 px-6 text-center">Most Guessed Word</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {Object.entries(playerStats).map(([player, stats], index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{player}</td>
                <td className="py-3 px-6 text-center">{stats.wins}</td>
                <td className="py-3 px-6 text-center">{stats.losses}</td>
                <td className="py-3 px-6 text-center">
                  {mostGuessedWord[player]
                    ? `${mostGuessedWord[player].word} (${mostGuessedWord[player].count} times)`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StatsPage;
