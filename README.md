<p align="center">
    <img src="imgs/demo.gif" height="500">
</p>

## Overview

This is a responsive Chat Application. The application supports real-time messaging in individual
and group settings, allows users to remove and/or add participants into conversations,
delete and/or leave conversations and supports profile images.

## Technology

- <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
- <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
- <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
- <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
- <img src="https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white">

## Features

- Responsive Design
<p align="center">
    <img src="imgs/responsive.gif" height="400">
</p>

- Login and Signup Capability
<p align="center">
    <img src="imgs/signup.gif" height="400">
    <img src="imgs/login.gif" height="400">
</p>

- Group Conversations
<p align="center">
    <img src="imgs/demo.gif" height="400">
</p>

- Edit Group Conversation Participants
<p align="center">
    <img src="imgs/edit-conversation.gif" height="400">
</p>

- Leave Group Conversation and Delete Conversation
<p align="center">
    <img src="imgs/delete-conversation.gif" height="400">
</p>

- Profile Images
<p align="center">
    <img src="imgs/profile.gif" height="400">
</p>

## Getting Started

### Prerequisites

- yarn/npm
- Sign up for MongoDB Atlas
  - Create a shared database

### Backend Installation

```sh
# Clone the repo
git clone git clone https://github.com/klam2k20/Chat.git

# Create config.env
cd Chat/server
PORT=8080
MONG0DB_URI=<MONGODBURI>
JWT_SECRET=<SECRET-KEY>

# Install dependencies
yarn install

# Start the server
yarn start
```

### Frontend Installation

```sh
cd ../client

# Install dependencies
yarn install

# Start the application on port 3000
yarn start
```
