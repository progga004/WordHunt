import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { userAPI } from './Api'; 
import './find.css';
import Countdown from './Countdown';


const socket = io('http://localhost:3000', { autoConnect: false });

const FindingPlayerPage = () => {
    const [playerFound, setPlayerFound] = useState(false);

    useEffect(() => {
        const handleLoginAndFindPlayer = async () => {
            try {
                const userData = await userAPI.loginUser();
                console.log('Logged in user:', userData.username);

 
                socket.connect();

                socket.emit('USERNAME', userData.username);

                socket.on('FINDING PLAYER', () => {
                    console.log('Finding player...');
                });

                socket.on('PLAYER FOUND', () => {
                    console.log('Player found!');
                    setPlayerFound(true); 
                });

            } catch (error) {
                console.error('Error during user login or finding player:', error);
            }
        };

        handleLoginAndFindPlayer();

        return () => {
            socket.off('FINDING PLAYER');
            socket.off('PLAYER FOUND');
        };
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-green-200">
            <div className="max-w-md w-full rounded-lg border border-gray-200 shadow-md flex flex-col">
                <div className="bg-green-500 p-4 rounded-t-lg flex justify-center items-center">
                    <h2 className="text-3xl font-bold text-white">{playerFound ?  <Countdown /> : 'Finding Player...'}</h2>
                </div>
                <div className="bg-gray-300 p-10 rounded-b-lg flex justify-center items-center">
                    <div className="w-full flex justify-center items-center">
                        <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden w-3/4">
                            <div className={`absolute bg-green-600 h-4 rounded-full progress-bar-animation ${playerFound ? 'stop-animation' : ''}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindingPlayerPage;
