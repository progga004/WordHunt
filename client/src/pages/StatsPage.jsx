import { useState } from "react";
import { Link } from "react-router-dom";
import { gamesAPI } from "../components/Api";
import { userAPI } from "../components/Api";
import { useEffect } from "react";
const StatsPage = () => {
    //sorry about the messy code, will fix once backend is connected

    
    const testUser= {username:"test", games:[{}]}//replace with current User
    const [allgames, setAllGames] = useState([]);
    // const testGames=[{id:1,player1:"me",player2:"test", winner:"me",endttime:new Date()},
    // {id:2,player1:"a",player2:"b",winner:"a",endttime:new Date(1999, 0, 1)}]//replace this with an actual list of Games
    const [currentSortOrder, setCurrentSortOrder] = useState("asIs");

    useEffect(() => {
      const fetchGames = async () => {
        try {
          const allGames = await gamesAPI.getAllGames(); 
          setAllGames(allGames); 
        } catch (error) {
          console.error("Error fetching games:", error);
        }
      };
  
      fetchGames();
    }, []);

    //testUserNameData="test"//replace this with the current users name
    //implement logic for grabbing games from each player in the database
    //implement logic for getting all games from database

    const setToNewest=() =>{
        setCurrentSortOrder("newest");
    }

    //displays all games
    const setToAll=()=>{
        setCurrentSortOrder("asIs");
    }

    //sets sortorder to games from last hour
    const setToLastHour = ()=>{
        setCurrentSortOrder("lastHour");
    }

    //use this function for sorting the games
    const sortGames=(games, sortOrder)=>{
        
        if(sortOrder==="newest"){// sorts all games by newest first
            return games.sort(
                (a, b) => a.endttime - b.endttime
              );
        }
        else if(sortOrder==="byUser"){//use this when getting specific user data
            let usersGames=[]
            for(let i=0;i<allgames.length;i++){
                if (allgames[i].player1===testUser["username"] || allgames[i].player2===testUser["username"] )
                usersGames.push(allgames[i])
            }
            return usersGames
        }
        else if (sortOrder==="lastHour"){
            let lastHour=[]
            for(let i=0;i<allgames.length;i++){
                if ((new Date())-allgames[i].endttime<=3600000){
                    lastHour.push(allgames[i])
                }
                
            }
            return lastHour;
        }
        else if(sortOrder==="asIs"){
            return games
        }
    }

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