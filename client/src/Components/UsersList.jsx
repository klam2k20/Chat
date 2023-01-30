import React from 'react';
import PropTypes from 'prop-types';
import { getAvatarSrc } from '../Utilities/utilities';
import ListWrapper, { ListItem } from './ListWrapper';

function UsersList({ users, handleClick }) {
  return (
    <ListWrapper>
      {users.map((user) => (
        <User key={user._id} user={user} handleClick={handleClick} />
      ))}
    </ListWrapper>
  );
}

function User({ user, handleClick }) {
  return (
    <ListItem
      handleClick={() => handleClick(user)}
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
  handleClick: PropTypes.func.isRequired,
};

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default UsersList;
