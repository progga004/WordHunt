import { useState } from "react";
const StatsPage = () => {
    //sorry about the messy code, will fix once backend is connected

    const testUser= {username:"test", games:[{}]}//replace with current User
    const testGames=[{id:1,player1:"me",player2:"test", winner:"me",endttime:new Date()},
    {id:2,player1:"a",player2:"b",winner:"a",endttime:new Date(1999, 0, 1)}]//replace this with an actual list of Games
    const [currentSortOrder, setCurrentSortOrder] = useState("asIs");

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
            for(let i=0;i<testGames.length;i++){
                if (testGames[i].player1===testUser["username"] || testGames[i].player2===testUser["username"] )
                usersGames.push(testGames[i])
            }
            return usersGames
        }
        else if (sortOrder==="lastHour"){
            let lastHour=[]
            for(let i=0;i<testGames.length;i++){
                if ((new Date())-testGames[i].endttime<=3600000){
                    lastHour.push(testGames[i])
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
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <table className="text-center w-auto">
              <tbody>
                {sortGames(testGames, currentSortOrder).map((game) => (
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