# Multiplayer Wordle-like Game Using MERN Stack and WebSockets

## Overview

This project is a multiplayer, interactive game inspired by Wordle, where two players compete to guess a five-letter word. Built using the MERN stack (MongoDB, Express, React, Node.js) and WebSockets, the game allows real-time communication between players, making the gameplay engaging and interactive.

## Features

- **Multiplayer Mode**: Two players can connect and compete against each other in real-time.
- **Interactive Gameplay**: Players take turns guessing a five-letter word, with feedback provided for each guess.
- **Real-time Communication**: Uses WebSockets to enable seamless, real-time communication between players.
- **User Interface**: A clean and intuitive interface built with React for a smooth gaming experience.
- **Word Validation**: Ensures all guesses are valid five-letter words using a backend validation service.
- **Feedback System**: Provides feedback similar to Wordle, highlighting correct letters and positions.
- **Player Statistics**: Displays a list of player statistics, including win/loss records, number of guesses.

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Version Control**: Git, GitHub

# How To Run This Application

- Open A new Terminal from directory .../WordHunt
- Split terminal
- In the first terminal:
  - <code>cd server</code>
  - <code>npm i</code>
  - <code>nodemon server.js</code>
- In the second terminal:
  - <code>cd client</code>
  - <code>npm i</code>
  - <code>npm run dev</code>
- Run localhost on port 5173 on different browsers
- Enjoy the Game!
