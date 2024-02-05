const socketIo = require('socket.io');

function handleSocketConnection(server) {
    const io = socketIo(server);

    const rooms = [0]; // array of rooms where each element is how many people are in the room
    let lastRoom = 0 // keeps track of last room populated so no users are left waiting indefinitely

    io.on('connection', socket => {

        // find and join room
        let idx;
        if (rooms[lastRoom] == 1)
            idx = lastRoom
        else
            idx = findRoom();

        // join room and update last index and room
        lastRoom = idx;
        rooms[idx]++;
        let currRoom = `room ${idx}`
        socket.join(currRoom);

        // send to client that they should wait for another player
        socket.currRoomemit("FINDING PLAYER");


        /**
         * PUT THE REST OF THE SOCKET LOGIC BELOW HERE
         */

        // check if two players found
         if (rooms[idx] === 2)
            // broadcast to room that players have been found
            io.to(currRoom).emit("PLAYER FOUND");
        


        // ----------------------------------------------

        socket.on("disconnect", () => {

            // send game over to client and set people in room to 0
            io.to(currRoom).emit("GAME OVER");
            rooms[idx] = 0;
        });
    });

    const findRoom = () => {
        // logic for finding first available room
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i] < 2)
                return i;
        }
    
        // appends new room
        rooms.push(0);
        return rooms.length - 1;
    }
}

module.exports = handleSocketConnection;