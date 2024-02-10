import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate}from "react-router-dom";
import { userAPI } from "../components/Api";

const HomePage = ({socket}) => {
  const [username, setUsername] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const loginUser = async () => {
      try {
        const userData = await userAPI.loginUser();
        console.log("Logged in user:", userData.username);
        setUsername(userData.username);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    loginUser();
  }, []);
  const handleFindGame = () => {
    if (socket && !socket.connected) {
      socket.connect();
      socket.on('connect', () => {
        console.log('Socket connected successfully');
        navigate('/find-player', {state: {username}}); 
      });
      socket.on('PLAYER LEFT', () => {
        socket.disconnect();
      });
      socket.on("disconnect", () => {
        navigate("/")
      })
     } 
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-200">
      <div className="flex flex-col items-center space-y-6">
        <h1>Username: {username}</h1>
        <button
          onClick={handleFindGame}
          className="bg-green-500 text-white font-bold text-2xl py-4 px-10 rounded-xl hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-700 transition duration-200"
        >
          Find Game
        </button>
        <Link
          to="/stats"
          className="bg-green-500 text-white font-bold text-2xl py-4 px-10 rounded-xl hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-700 transition duration-200"
        >
          View Stats
        </Link>
        <Link
          to="/game-rules"
          className="bg-green-500 text-white font-bold text-2xl py-4 px-10 rounded-xl hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-700 transition duration-200"
        >
          View Rules
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
