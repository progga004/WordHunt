const socketIo = require('socket.io');

function handleSocketConnection(server) {
    const io = socketIo(server);

    const rooms = new Map();

    io.on('connection', socket => {

        // find and join room
        let room = findRoom();
        socket.join(room);

        if (rooms.get(room) === 2)
            // broadcast to room that players have been found
            io.to(room).emit("PLAYER FOUND")

        else
            // broadcast to room (single player) to wait
            io.to(room).emit("FINDING PLAYER");


        /**
         * PUT THE REST OF THE SOCKET LOGIC BELOW HERER
         */

        


        // ----------------------------------------------

        socket.on("disconnect", () => {

            // send game over to client and set people in room to 0
            io.to(room).emit("GAME OVER");
            rooms.set(room, 0);
        });
    });

    const findRoom = () => {
        // logic for finding first available room
        for (let [room, numInRoom] of rooms) {
            if (numInRoom < 2) {
                rooms.set(room, numInRoom + 1);
                return room;
            }
        }
    
        // appends new room with 1 as the occupying space
        let room = `room${rooms.size}`
        rooms.set(room, 1);
        return room;
    }
}

module.exports = handleSocketConnection;