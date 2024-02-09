import { useEffect, useState,useContext} from "react";
import { Link } from "react-router-dom";
import { userAPI } from "../components/Api";
import SocketContext from "../components/SocketContext";

const HomePage = () => {
  const [username, setUsername] = useState('');
    const socket = useContext(SocketContext);

    useEffect(() => {
        const loginUser = async () => {
            try {
                const userData = await userAPI.loginUser();
                console.log('Logged in user:', userData.username);
                setUsername(userData.username);
                
                
                if(socket) {
                    socket.connect();
                    socket.emit('USERNAME', userData.username);
                }
            } catch (error) {
                console.error('Error logging in:', error);
                
            }
        };

        loginUser();
    }, [socket]); 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-200">
      <div className="flex flex-col items-center space-y-6">
        <h1>Username: {username}</h1>
        <Link
          to="/find-player"
          className="bg-green-500 text-white font-bold text-2xl py-4 px-10 rounded-xl hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-700 transition duration-200"
        >
          Find Game
        </Link>
        <Link
          to="/stats"
          className="bg-green-500 text-white font-bold text-2xl py-4 px-10 rounded-xl hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-700 transition duration-200"
        >
          View Stats
        </Link>
        <Link
          to="/game-rules"
          className="text-green-600 hover:text-green-800 text-lg font-semibold"
        >
          View Rules
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
