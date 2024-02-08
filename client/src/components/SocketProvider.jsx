
import React, { useEffect, useState } from 'react';
import SocketContext from './SocketContext';
import io from 'socket.io-client';

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000', { autoConnect: false });
        setSocket(newSocket);

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
