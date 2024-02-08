
import React, { useState, useEffect,useContext } from 'react';
import SocketContext from './SocketContext';
import Cookies from 'js-cookie';

const EnterWordPage = () => {
    const [word, setWord] = useState('');
    const [waitingForOtherPlayer, setWaitingForOtherPlayer] = useState(false);

    const socket = useContext(SocketContext);
    useEffect(() => {
        if(socket){
        socket.connect();
        socket.on('WAITING FOR OTHER WORD CHOICE', () => {
            console.log('Waiting for the other player to submit their word...');
            setWaitingForOtherPlayer(true);
        });

        socket.on('SWITCH TURN', () => {
            console.log('Both players have submitted their words. Proceeding to the next turn.');
        });

        return () => {
            socket.off('WAITING FOR OTHER WORD CHOICE');
            socket.off('SWITCH TURN');
        };
    }
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault();

       
       const username = Cookies.get('username');
        if (username && word) {
            console.log("username: word:",username, word);
            socket.emit('WORD CHOICE', { username, word });
            setWord(''); 
            setWaitingForOtherPlayer(false); 
        } else {
            console.error('Username not found or word is empty.');
        }
  
    };

    return (
        <div className="flex items-center justify-center h-screen bg-green-200">
            <div className="max-w-md w-full rounded-lg border border-gray-200 shadow-md flex flex-col p-6 bg-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 self-center">Enter Your Word</h2>
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
                    <input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder="Type a word..."
                        className="px-4 py-2 rounded-lg border border-gray-300 w-3/4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 w-1/2"
                    >
                        Submit
                    </button>
                </form>
                {waitingForOtherPlayer && <p>Waiting for the other player...</p>}
            </div>
        </div>
    );
};

export default EnterWordPage;

