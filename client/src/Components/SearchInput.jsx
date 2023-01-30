import { CloseIcon } from '@chakra-ui/icons';
import { Badge, Box, Text, useToast } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useChat } from '../Context/ChatProvider';
import { getUsers } from '../Utilities/apiRequests';
import UsersList from './UsersList';

function SearchInput({ search, setSearch, selectedUsers, setSelectedUsers }) {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useChat();
  const toast = useToast();
  const searchCaret = useRef();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query) {
      try {
        let { data } = await getUsers(user.token, query);
        data = data.filter((u) => !selectedUsers.some((rm) => rm._id === u._id));
        setSearchResults(data.slice(0, 8));
      } catch (err) {
        toast({
          title: 'Invalid Search',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    } else {
      setSearchResults([]);
    }
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
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box
        display="flex"
        alignItems="center"
        gap="0.25rem"
        flexWrap="wrap"
        w="100%"
        border="1px"
        borderColor="inherit"
        px="1rem"
        py="0.5rem"
        borderRadius="md"
      >
        <Text color="#718096">To</Text>
        {selectedUsers.length > 0 &&
          selectedUsers.map((u) => (
            <Badge key={u._id} display="flex" alignItems="center" gap="0.25rem">
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

      <Box display="flex" flexDirection="column" width="full">
        {searchResults.length > 0 &&
          <UsersList users={searchResults} handleClick={addUser} />}
      </Box>
    </Box>
  );
}

SearchInput.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  selectedUsers: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  })).isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
};
export default SearchInput;
