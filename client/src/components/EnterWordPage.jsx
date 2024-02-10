import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from './Loader';

const EnterWordPage = ({socket}) => {
    const username = useLocation().state.username;
    const [word, setWord] = useState('');
    const [waitingForOtherPlayer, setWaitingForOtherPlayer] = useState(false);
    const [validWords, setValidWords] = useState(new Set());
    const [invalidWord, setInvalidWord] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        if (socket && socket.connected) {
            fetch('/5_letter_words.txt')
                .then(response => response.text())
                .then(text => {
                    const wordsArray = text.split(/\r?\n/); 
                    setValidWords(new Set(wordsArray)); 
                });
            
                socket.on('WAITING FOR OTHER WORD CHOICE', () => {
                    console.log('Waiting for the other player to submit their word...');
                    setWaitingForOtherPlayer(true);
                });

                
            socket.on("GAME START", (data) => {
                console.log(data);
                const { playerOne, playerTwo } = data;
                const isMyTurn = playerOne === username;

                navigate('/game', { 
                    state: { 
                    isYourTurn: isMyTurn,
                    username,
                    otherPlayer : isMyTurn ? playerTwo : playerOne,
                    word
                    } 
                });
            });
        } else
            navigate("/");

    }, [socket, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const username = Cookies.get('username');
        if (username && word && socket) {
            if (validWords.has(word.toLowerCase())) { 
                console.log("username: word:", username, word);
                socket.emit('WORD CHOICE', { username, word });
                setWord(''); 
                setWaitingForOtherPlayer(false);
                setInvalidWord(false); 
            } else {
                setInvalidWord(true); 
                console.error('Invalid word.');
            }
        } else {
            console.error('Username not found, word is empty, or socket is not connected.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-green-200 relative">
      {waitingForOtherPlayer && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-20">
          <Loader />
        </div>
      )}
      <div className={`max-w-md w-full rounded-lg border border-gray-200 shadow-md flex flex-col p-6 bg-gray-200 ${waitingForOtherPlayer ? 'blur-lg' : ''} absolute`}>
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
                {invalidWord && <p className="text-red-500 font-bold text-xl text-center w-full">Invalid word!</p>}
            </div>
        </div>
    );
    };
export default EnterWordPage;
