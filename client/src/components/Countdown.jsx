import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Countdown = ({ username }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (count === 0) {
            navigate('/enter-word', {state: {username}});
            return;
        }
        const timerId = setTimeout(() => {
            setCount(count - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [count, navigate]); 
    return (
        <div className="flex items-center justify-center h-screen bg-green-200">
            <div className="max-w-md w-full rounded-lg border border-gray-200 shadow-md flex flex-col">
                <div className="bg-green-500 p-4 rounded-t-lg flex justify-center items-center">
                    <div className="text-3xl font-bold text-white mb-4">Player Found</div>
                </div>
                <div className="bg-gray-300 p-10 rounded-b-lg flex justify-center items-center">
                    <div className="w-full flex justify-center items-center">
                        <div className="text-6xl font-bold text-green-600">
                            {count > 0 ? count : <span className="text-red-500">Go!</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
