import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Box, Text, useToast } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { useChat } from '../../Context/ChatProvider';
import UsersList from '../List/UsersList';
import { getUsers } from '../../Utilities/apiRequests';

function SearchInput({ search, setSearch, selectedUsers, setSelectedUsers }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setLoggedIn } = useChat();
  const searchCaret = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    setLoading(true);
    const query = e.target.value;
    setSearch(query);
    if (query) {
      try {
        let { data } = await getUsers(user.token, query);
        data = data.filter((u) => !selectedUsers.some((rm) => rm._id === u._id));
        setSearchResults(data.slice(0, 8));
      } catch (err) {
        if (err.response.status === 401) {
          localStorage.removeItem('user-info');
          setLoggedIn(false);
          navigate('/');
        } else {
          toast({
            title: 'Invalid Search',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          });
        }
      }
    } else {
      setSearchResults([]);
    }
    setLoading(false);
  };

  const addUser = (selectedUser) => {
    if (!selectedUsers.some((u) => u._id === selectedUser._id)) {
      setSelectedUsers([...selectedUsers, selectedUser]);
      setSearch('');
      setSearchResults([]);
      searchCaret.current.focus();
    }
  };

  return (
    <SearchInputDisplay
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
      search={search}
      handleSearch={handleSearch}
      searchResults={searchResults}
      addUser={addUser}
      loading={loading}
      searchCaret={searchCaret}
    />
  );
}

function SearchInputDisplay({
  selectedUsers,
  setSelectedUsers,
  search,
  handleSearch,
  searchResults,
  addUser,
  loading,
  searchCaret,
}) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" w="100%" gap="0.5rem">
      <Box
        display="flex"
        alignItems="center"
        gap="0.25rem"
        flexWrap="wrap"
        w="100%"
        border="1px"
        borderColor=" #204fa1"
        px="1rem"
        py="0.5rem"
        borderRadius="md"
      >
        <Text>To</Text>
        {selectedUsers.length > 0 &&
          selectedUsers.map((u) => (
            <Badge
              key={u._id}
              display="flex"
              alignItems="center"
              gap="0.25rem"
              bg="#e0e0e0"
            >
              {u.name}
              <CloseIcon
                cursor="pointer"
                onClick={() => setSelectedUsers(selectedUsers.filter((s) => s._id !== u._id))}
              />
            </Badge>
          ))}
        <input
          ref={searchCaret}
          className="searchInput"
          type="text"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
      </Box>

      <Box display="flex" flexDirection="column" w="full">
        <UsersList
          users={searchResults}
          handleClick={addUser}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
SearchInput.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  selectedUsers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    }),
  ).isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
};

SearchInputDisplay.propTypes = {
  selectedUsers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    }),
  ).isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    }),
  ).isRequired,
  addUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  searchCaret: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default SearchInput;
