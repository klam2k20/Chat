import axios from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [setPhoto] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const toggleShow = () => {
    setShow(!show);
  };

  const selectPhoto = (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'connect-me');
    formData.append('cloud_name', 'dwrwytvae');
    fetch('https://api.cloudinary.com/v1_1/dwrwytvae/image/upload', {
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          setPhoto(data.secure_url.toString());
          setLoading(false);
        }
      }).catch((err) => {
        toast({
          title: `Error Uploading Photo: ${err.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
      });
  };

  const submitForm = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please Enter All Required Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    } else if (password !== confirmPassword) {
      toast({
        title: 'Passwords Don\'t Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    } else {
      const headers = { 'content-type': 'application/json' };
      try {
        const response = await axios.post(
          'http://localhost:8080/api/user/',
          { name, email, password },
          headers,
        );
        toast({
          title: 'Registration Successful!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        localStorage.setItem('user-info', JSON.stringify(response));
        setLoading(false);
        navigate('/chats');
      } catch (err) {
        toast({
          title: 'Regristration Error',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
      }
    }
  };

  return (
    <VStack spacing="0.5rem" mt="0.5rem">
      <FormControl id="signup-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="signup-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="signup-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
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
      <FormControl id="signup-confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightAddon>
            <Button h="1.75rem" size="sm" onClick={toggleShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="signup-photo">
        <FormLabel>Upload Photo</FormLabel>
        <Input
          variant="unstyled"
          type="file"
          accept="image/jpeg, image/png"
          onChange={(e) => selectPhoto(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="linkedin"
        w="100%"
        style={{ marginTop: '1rem' }}
        onClick={submitForm}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;
