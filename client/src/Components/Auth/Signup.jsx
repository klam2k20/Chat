/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useChat } from '../../Context/ChatProvider';
import { createUser } from '../../Utilities/apiRequests';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');
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

  const selectPhoto = (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'connect-me');
    formData.append('cloud_name', 'dwrwytvae');
    fetch('https://api.cloudinary.com/v1_1/dwrwytvae/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url) {
          setPhoto(data.secure_url.toString());
        }
      })
      .catch((err) => {
        customToast(`Error Uploading Photo ${err.message}`, 'error');
      });
    setLoading(false);
  };

  const submitForm = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      customToast('Please Enter All Fields', 'warning');
    } else if (password !== confirmPassword) {
      customToast("Passwords Don't Match", 'warning');
    } else {
      try {
        const response = await createUser(name, email, password, photo);
        customToast(`${name} Has Been Successfully Registered`, 'success');
        localStorage.setItem('user-info', JSON.stringify(response.data));
        setLoading(false);
        setLoggedIn(true);
        navigate('/chats');
      } catch (err) {
        customToast(`Sorry, ${name} Could Not Be Registered`, 'error');
      }
    }
    setLoading(false);
  };

  return (
    <VStack spacing="1rem">
      <FormControl isRequired>
        <Input
          borderColor="#204FA1"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <Input
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
            borderColor="#204FA1"
            borderRight="none"
            type={show ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightAddon borderColor="#204FA1" bg="#fff" borderLeft="none">
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
      <FormControl isRequired>
        <InputGroup>
          <Input
            borderColor="#204FA1"
            borderRight="none"
            type={show ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightAddon borderColor="#204FA1" bg="#fff" borderLeft="none">
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
      <label htmlFor="photo-upload" className="file-label">
        <input
          id="photo-upload"
          type="file"
          title=" "
          accept="image/jpeg, image/png"
          onChange={(e) => selectPhoto(e.target.files[0])}
        />
        <span>Upload Photo</span>
      </label>
      <Button
        w="100%"
        bg="#204FA1"
        color="#fff"
        onClick={submitForm}
        isLoading={loading}
        _hover={{ background: '#183B77' }}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;
