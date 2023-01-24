import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chatpage() {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get('http://localhost:8080/api/chat');
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => <p key={chat._id}>{chat.chatName}</p>)}
    </div>

  );
}

export default Chatpage;
