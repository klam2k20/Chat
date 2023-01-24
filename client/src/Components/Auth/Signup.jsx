/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl, FormLabel, Input, InputGroup, InputRightAddon, VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const selectPhoto = () => {

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
          accept="image/jpeg, image/png, image/gif"
          onChange={(e) => selectPhoto(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="linkedin"
        w="100%"
        style={{ marginTop: '1rem' }}
        onClick={submitForm}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;
