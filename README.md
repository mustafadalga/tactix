# Tactix Intelligence Game

**Tactix intelligence game developed with MERN stack and Socket.io**

<h6 align="center">
  <img alt="Tactix Intelligence Game" src="https://user-images.githubusercontent.com/25087769/71783851-c2d21280-2ffd-11ea-9f3b-84b631b3ad01.png"/>
  <br>
  <br>
  <br>
  <br>

  <p align="center">
  <a href="#about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#demo">Demo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#used-technologies">Used Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#project-setup">Project Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
  </p>

</h6>

## About Tactix Intelligence Game

* It is a strategy game
* It is played with 2 people
* The game rules are simple
* The goal of the game is to get your opponent to take the last stone.
* The game board consist of 4x4=16 squares
* The game is played with 16 stones
* Age group : 6 years and over

### Skill Acquisitions
* Attention Development
* Abstract Thinking
* Strategy Development

### Game Rules
* A player is randomly selected by the computer to begin the game.
* The goal of the game is to get the last stone to the opponent.
* There are 16 stones placed on the square board.
* All stones can  be used by both players
* A player cannot take stones from different rows and columns in one move.
* It is possible for players to select as many stones as they wish, linked vertically or horizontally.
* The player who selects the last stone(s) on the square board loses.


### Game Restrictions
* Stones that are not linked cannot be selected in one move.
* Stones that cross-linked cannot be selected.
* To select more than one stone vertically or horizontally, the stones must be linked.
* The player whose turn it is to move has to make a move.


## Demo 
* [Demo](https://tactixgame.herokuapp.com/)

## Used Technologies
* React.js / Typescript
* Express.js (Node.js)
* MongoDB
* Node JS
* Socket.io
* Redux Toolkit
* TailwindCSS
* Vite.js

## Project Setup

### Server
* The following variables should be defined in an .env file in the server folder.

**Environment Variables(.env)**
* MONGODB_URL
* CLIENT_URL
* NODE_ENV


### Client
* The following variables should be defined in an .env file in the client folder.

**Environment Variables(.env)**
* VITE__REACT_APP_SERVER_URL

### Project Setup and Runs

**Server**

```
npm install 
npm run dev
```

**Client**

```
npm install 
npm run dev
```





## Screenshots

![Screenshot 1](https://user-images.githubusercontent.com/25087769/186766556-39f1e9cf-3557-4673-9c76-c2ae45a2126a.png)

![Screenshot 2](https://user-images.githubusercontent.com/25087769/186766734-f657aef2-e013-4120-a1c8-974fffdba874.png)


## License
[![License](https://img.shields.io/badge/LICENSE-GPL--3.0-orange)](https://github.com/mustafadalga/tactix/blob/main/LICENSE)

