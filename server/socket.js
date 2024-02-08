const socketIo = require('socket.io');

function handleSocketConnection(server) {
    const io = socketIo(server, {
        cors: {origin: "http://localhost:5173"}
    });

    const rooms = [{
        "player1": null,
        "player2": null,
        "player1Word": null,
        "player2Word": null,
        "numUsers": 0
    }];
    let lastRoom = 0 // keeps track of last room populated so no users are left waiting indefinitely

    io.on('connection', socket => {

        console.log("user connected");

        // find and join room
        let idx = rooms[lastRoom]["numUsers"] === 1 ? lastRoom : findRoom();
        let username = "";

        // join room and update last index and room
        lastRoom = idx;
        rooms[idx]["numUsers"]++;

        let currRoom = `room ${idx}`
        socket.join(currRoom);

        console.log(currRoom);

        // User sends username
        socket.on("USERNAME", user => {
            username = user;
            if (rooms[idx]["player1"] === null)
                rooms[idx]["player1"] = username;
            else
                rooms[idx]["player2"] = username;

            console.log(rooms[lastRoom])

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
            console.log("User server",username,word);
            console.log(rooms[idx]["player1"],rooms[idx]["player2"])
            console.log(currRoom);
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
                io.to(currRoom).emit("SWITCH TURN", word, lettersInCommon);
            }
        })

        socket.on("MESSAGE", message => {
            io.to(currRoom).emit("MESSAGE", message, username);
        })


        // ----------------------------------------------

        socket.on("disconnect", () => {

            console.log("disconnected");
            // send game over to client and set people in room to 0
            io.to(currRoom).emit("PLAYER LEFT");

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

    // logic for finding first available room
    const findRoom = () => {
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i]["numUsers"] < 2)
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

    // IMPORTANT: word1 is the guess, word2 is the users actual word
    const findLetters = (word1, word2) => {
        let numInCommon = 0;
        for (let i = 0; i < word2.length; i++) {
            for (let j = 0; j < word1.length; j++) {
                if (word2[i] === word1[j])
                    numInCommon++;
            }
        }
        return numInCommon;
    }
}

module.exports = handleSocketConnection;