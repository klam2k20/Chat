/* eslint-disable no-unused-vars */
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

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
          title: 'Error Uploading Photo! Please Try Again!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      });
  };

  const submitForm = () => {

  };

  return (
    <VStack spacing="0.5rem" mt="0.5rem">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightAddon>
            <Button h="1.75rem" size="sm" onClick={toggleShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightAddon>
            <Button h="1.75rem" size="sm" onClick={toggleShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="photo">
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
