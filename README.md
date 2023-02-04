<p align="center">
    <img src="imgs/demo.gif">
</p>

## Overview

This is a responsive Chat App created with ReactJS, MongoDB, Express and NodeJS.
The app supports real-time messaging for individual and group chats, due to
Socket.io.

The application was designed to be responsive for various device sizes as seen below: <br> <br>
<img src="imgs/chat-sm.png" height=500> &nbsp; &nbsp;
<img src="imgs/chat-md.png" height=500>
<img src="imgs/chat-lg.png" height=500>

## Getting Started

### Prerequisites

- yarn
  ```sh
  npm install -g yarn
  ```
- Sign up for MongoDB Atlas
  - Create a shared database

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/klam2k20/Chat.git
   ```
2. `cd Chat/server`
3. Create `config.env` with your MongoDB URI
   ```sh
   PORT=8080
   MONG0DB_URI=<MONGODBURI>
   JWT_SECRET=<SECRET-KEY>
   ```
4. Install yarn packages
   ```sh
   yarn install
   ```
5. Start backend
   ```sh
   yarn start
   ```
6. `cd ../client`
7. Install yarn packages
8. Start frontend on port 3000
   ```sh
   yarn start
   ```
