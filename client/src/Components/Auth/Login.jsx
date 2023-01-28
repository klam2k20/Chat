/* eslint-disable no-unused-vars */
import {
  FormControl, FormLabel, Input, VStack,
  InputGroup, InputRightAddon, Button, Box, useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../Context/ChatProvider';
import { loginUser } from '../../Utilities/apiRequests';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setLoggedIn } = useChat();
  const toast = useToast();
  const navigate = useNavigate();

  const toggleShow = () => {
    setShow(!show);
  };

  const submitForm = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Enter All Required Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    } else {
      try {
        const response = await loginUser(email, password);
        localStorage.setItem('user-info', JSON.stringify(response.data));
        setLoading(false);
        setLoggedIn(true);
        navigate('/chats');
      } catch (err) {
        toast({
          title: 'Invalid Email or Password',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
      }
    }
  };

  const setGuestCredentials = () => {
    setEmail('guestLogin@gmail.com');
    setPassword('password');
  };

  return (
    <VStack spacing="0.5rem" mt="0.5rem">
      <FormControl id="login-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightAddon>
            <Button h="1.75rem" size="sm" onClick={toggleShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <Button
        w="100%"
        colorScheme="linkedin"
        style={{ marginTop: '1rem' }}
        onClick={submitForm}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        w="100%"
        colorScheme="red"
        onClick={setGuestCredentials}
        isLoading={loading}
      >
        Guest Login Credentials
      </Button>
    </VStack>
  );
}

export default Login;
