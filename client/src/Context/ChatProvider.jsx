import React, {
  useState, createContext, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const value = React.useMemo(
    () => ({
      loggedIn,
      setLoggedIn,
      user,
      setUser,
      selectedChat,
      setSelectedChat,
      chats,
      setChats,
    }),
    [loggedIn, user, selectedChat, chats],
  );

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    if (userInfo) setUser(userInfo.data);
    else navigate('/');
  }, [loggedIn]);
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => useContext(ChatContext);

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
