/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
import { getAvatarSrc } from '../Utilities/utilities';
import { useChat } from '../Context/ChatProvider';
import { createOrFetchChat } from '../Utilities/apiRequests';
import ListWrapper, { ListItem } from './ListWrapper';

function UsersList({ users, clearSearch }) {
  return (
    <ListWrapper>
      {users.map((user) => (
        <User key={user._id} user={user} clearSearch={clearSearch} />
      ))}
    </ListWrapper>
  );
}

// eslint-disable-next-line no-unused-vars
function User({ user, clearSearch }) {
  const {
    user: loggedInUser, setSelectedChat, chats, setChats,
  } = useChat();

  const createChat = async () => {
    const { data } = await createOrFetchChat(loggedInUser.token, user._id);
    setSelectedChat(data);
    if (!chats.some((c) => c._id === data._id)) {
      setChats([data, ...chats]);
    }
    clearSearch();
  };

  return (
    <ListItem
      handleClick={createChat}
      text={user.name}
      subText={user.email}
      photo={getAvatarSrc(user.photo)}
      isSelected={false}
    />
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }),
  ).isRequired,
  clearSearch: PropTypes.func.isRequired,
};

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  clearSearch: PropTypes.func.isRequired,
};

export default UsersList;
