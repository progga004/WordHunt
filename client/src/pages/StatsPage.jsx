import { useState } from "react";
const StatsPage = (props) => {
    //sorry about the messy code, will fix once backend is connected

    const testUser= {username:"test", games:[{}]}//replace with current User
    const testGames=[{id:1,player1:"me",player2:"test", winner:"me"}]//replace this with an actual list of Games
    const [currentSortOrder, setCurrentSortOrder] = useState("asIs");

    //testUserNameData="test"//replace this with the current users name
    //implement logic for grabbing games from each player in the database
    //implement logic for getting all games from database

    function setToNewest(){
        setCurrentSortOrder("newest");
    }

    //displays all games
    function setToAll(){
        setCurrentSortOrder("AsIs");
    }

    //sets sortorder to games from last hour
    function setToLastHour(){
        setCurrentSortOrder("lastHour");
    }

    //use this function for sorting the games
    function sortGames(games, sortOrder="newest"){
        
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
        <div className="bg-green-200 min-h-screen flex items-center justify-center">
            <div id="sortbuttons">
                <button onClick={setToAll}>All</button>
                <button onClick={setToLastHour}>Last Hour</button>
            </div>
            <table>
                {sortGames(testGames).map((game)=>(
                    <tr key={game.id}>
                        <th>{game.player1}</th>
                        <th>{game.player2}</th>
                        <th>{game.winner}</th>
                    </tr>
                )
                )}
            </table>
        </div>
    );
};
export default StatsPage;