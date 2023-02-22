import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  Input,
  VStack,
  InputGroup,
  InputRightAddon,
  Button,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

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

  function customToast(title, status) {
    return toast({
      title,
      status,
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
  }

  const toggleShow = () => {
    setShow(!show);
  };

  const submitForm = async () => {
    setLoading(true);
    if (!email || !password) {
      customToast('Please Enter All Fields', 'warning');
    } else {
      try {
        const response = await loginUser(email, password);
        localStorage.setItem('user-info', JSON.stringify(response.data));
        setLoading(false);
        setLoggedIn(true);
        navigate('/chats');
      } catch (err) {
        customToast('Please Check the Entered Email and Password', 'error');
      }
    }
    setLoading(false);
  };

  return (
    <VStack spacing="1rem">
      <FormControl isRequired>
        <Input
          color="black"
          borderColor="#204FA1"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <InputGroup>
          <Input
            borderRight="none"
            borderColor="#204FA1"
            type={show ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightAddon bg="#fff" borderColor="#204FA1" borderLeft="none">
            <Button
              size="sm"
              bg="#fff"
              _hover={{ background: '#e0e0e0' }}
              onClick={toggleShow}
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <Button
        w="100%"
        bg="#204FA1"
        color="#fff"
        onClick={submitForm}
        isLoading={loading}
        _hover={{ background: '#183B77' }}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
