import React, {
  useState, createContext, useEffect, useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [fetch, setFetch] = useState(false);
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
      fetch,
      setFetch,
    }),
    [loggedIn, user, selectedChat, chats, fetch],
  );

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    if (userInfo) {
      setUser(userInfo);
      setLoggedIn(true);
      setFetch((f) => !f);
    } else {
      navigate('/');
    }
  }, [navigate, loggedIn]);
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => useContext(ChatContext);

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
