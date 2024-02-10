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
        <div className="bg-green-200 min-h-screen pt-16">
          <div id="sortbuttons" className="flex justify-end pt-8 pr-4 w-full">
            <button onClick={setToAll} className="bg-green-800 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline mr-2">All</button>
            <button onClick={setToLastHour} className="bg-green-800 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline mr-2">Last Hour</button>
            <button onClick={setToNewest} className="bg-green-800 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline">Newest</button>
            <Link to="/" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Back to Home
                </Link>
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <table className="text-center w-auto">
              <tbody>
                {sortGames(allgames, currentSortOrder).map((game) => (
                  <tr key={game.id}>
                    <th className="pr-4">Player1: {game.player1}</th>
                    <th className="px-4">Player2: {game.player2}</th>
                    <th className="px-4">Winner: {game.winner}</th>
                    <th className="pl-4">Time:{game.endttime.toLocaleString('en-US', {year: 'numeric',month: '2-digit',day: '2-digit',hour: '2-digit',
                        minute: '2-digit',second: '2-digit',hour12: false,})}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      
};
export default StatsPage;
