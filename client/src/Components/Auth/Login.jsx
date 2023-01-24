/* eslint-disable no-unused-vars */
import {
  FormControl, FormLabel, Input, VStack,
  InputGroup, InputRightAddon, Button, Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <VStack spacing="0.5rem" mt="0.5rem">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightAddon>
            <Button h="1.75rem" size="sm" onClick={toggleShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <Button w="100%" colorScheme="linkedin" style={{ marginTop: '1rem' }}>
        Login
      </Button>
      <Button w="100%" colorScheme="red">
        Guest Login Credentials
      </Button>
    </VStack>
  );
}

export default Login;
