import { useEffect, useState, useContext } from 'react';
import './find.css';
import Countdown from './Countdown';
import { useLocation, useNavigate } from 'react-router-dom';
const FindingPlayerPage = ({socket}) => {
    const username = useLocation().state.username;
    const navigate = useNavigate();
    const [playerFound, setPlayerFound] = useState(false);
    const [findingPlayer, setFindingPlayer] = useState(false);
 
    useEffect(() => {
        if (socket && socket.connected) {
            if (username) {
                console.log('Logged in user:', username);
                socket.emit('USERNAME', username);

                socket.on('FINDING PLAYER', () => {
                    console.log('Finding player...');
                    setFindingPlayer(true);
                });

                socket.on('PLAYER FOUND', () => {
                    console.log('Player found!');
                    setPlayerFound(true);
                });
            } else {
                console.error('Username not found. Make sure the user is logged in before reaching this page.');
            }
        } else
            navigate("/")
    }, [socket]);

    return (
        <div className="flex items-center justify-center h-screen bg-green-200">
            <div className="max-w-md w-full rounded-lg border border-gray-200 shadow-md flex flex-col">
                <div className="bg-green-500 p-4 rounded-t-lg flex justify-center items-center">
                    <h2 className="text-3xl font-bold text-white">{playerFound ? <Countdown username={username}/> : 'Finding Player...'}</h2>
                </div>
                <div className="bg-gray-300 p-10 rounded-b-lg flex justify-center items-center">
                    <div className="w-full flex justify-center items-center">
                        <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden w-3/4">
                            {findingPlayer && (
                                <div className="absolute bg-green-600 h-4 rounded-full progress-bar-animation w-full"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindingPlayerPage;
