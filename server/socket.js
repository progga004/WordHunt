const socketIo = require('socket.io');

function handleSocketConnection(server) {
    const io = socketIo(server);

    const rooms = [];
    let lastRoom = 0 // keeps track of last room populated so no users are left waiting indefinitely

    io.on('connection', socket => {

        // find and join room
        let idx = rooms[lastRoom]["numUsers"] === 1 ? lastRoom : findRoom();
        let username = "";

        // join room and update last index and room
        lastRoom = idx;
        rooms[idx]["numUsers"]++;

        let currRoom = `room ${idx}`
        socket.join(currRoom);

        // User sends username
        socket.on("USERNAME", user => {
            username = user;
            if (rooms[idx]["player1"] === null)
                rooms[idx]["player1"] = username;
            else
                rooms[idx]["player2"] = username;

            // send to client that they should wait for another player
            socket.emit("FINDING PLAYER");

            // check if two players found
            if (rooms[idx]["numUsers"] === 2)
                // broadcast to room that players have been found
                io.to(currRoom).emit("PLAYER FOUND");
        });


        /**
         * PUT THE REST OF THE SOCKET LOGIC BELOW HERE
         */
        
        socket.on("WORD CHOICE", word => {

            // store word
            if (rooms[idx]["player1"] === username)
                rooms[idx]["player1Word"] = word;
            else
                rooms[idx]["player2Word"] = word;

            if (rooms[idx]["player1Word"] && rooms[idx]["player2Word"])
                io.to(currRoom).emit("SWITCH TURN", rooms[idx]["player1"]);
            else
                socket.emit("WAITING FOR OTHER WORD CHOICE");
        });

        socket.on("WORD GUESS", word => {
            let wordToCompare;

            // find which user to compare against
            if (rooms[idx]["player1"] === username)
                wordToCompare = rooms[idx]["player2Word"]
            else
                wordToCompare = rooms[idx]["player1Word"];
            
            // compare letters and send info to clients
            if (wordToCompare === word)
                    io.to(currRoom).emit("GAME OVER", username)
            else {
                let lettersInCommon = findLetters(word, wordToCompare);
                io.to(currRoom).emit("SWITCH TURN", wordToCompare, lettersInCommon);
            }
        })

        socket.on("MESSAGE", message => {
            io.to(currRoom).emit("MESSAGE", message, username);
        })


        // ----------------------------------------------

        socket.on("disconnect", () => {

            // send game over to client and set people in room to 0
            io.to(currRoom).emit("GAME OVER");

            // clean up room
            rooms[idx] = {
                "player1": null,
                "player2": null,
                "player1Word": null,
                "player2Word": null,
                "numUsers": 0
            };
        });
    });

    const findRoom = () => {
        // logic for finding first available room
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i] < 2)
                return i;
        }
    
        // appends new room
        rooms.push({
            "player1": null,
            "player2": null,
            "player1Word": null,
            "player2Word": null,
            "numUsers": 0
        });
        return rooms.length - 1;
    }

    // have questions about this
    const findLetters = (word1, word2) => {
        let numInCommon = 0
    }
}

module.exports = handleSocketConnection;