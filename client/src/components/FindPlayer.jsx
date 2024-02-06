import React, { useState, useEffect } from 'react'
import './find.css'

const FindingPlayerPage = () => {
    const [playerFound, setPlayerFound] = useState(false);
   
    //just for testing
    useEffect(() => {
        const mockFindPlayer = setTimeout(() => {
            setPlayerFound(true);
        }, 10000);
        return () => {
            clearTimeout(mockFindPlayer);
        };
    }, []);
    return (
        <div className="flex items-center justify-center h-screen bg-green-200">
            <div className="max-w-md w-full rounded-lg border border-gray-200 shadow-md flex flex-col">
                <div className="bg-green-500 p-4 rounded-t-lg flex justify-center items-center">
                    <h2 className="text-3xl font-bold text-white">Finding Player...</h2>
                </div>
                <div className="bg-gray-300 p-10 rounded-b-lg flex justify-center items-center">
                    <div className="w-full flex justify-center items-center">
                        <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden w-3/4">
                            {!playerFound && (
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

