import React, { useState } from 'react';
import Navbar from './Navbar';
import { Box, Button, Input, Textarea, useToast, Text, Center, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));

  const handleSubmit = async () => {
    if (!token) {
      toast({
        title: 'Unauthorized',
        description: 'Please log in to create a blog.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('https://blog-application-slj2.onrender.com/blogs/postBlog', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.status === 201) {
        toast({
          title: 'Blog Created',
          description: 'Your blog has been created successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate("/blogs");
      } else {
        toast({
          title: 'Failed to Create Blog',
          description: 'An error occurred while creating the blog.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast({
        title: 'Failed to Create Blog',
        description: 'An error occurred while creating the blog.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!token) {
    return (
      <>
        <Navbar />
        <Button colorScheme="red" ml={10} mt={"100px"} onClick={() => {
          navigate("/blogs");
        }}>Go Back</Button>
        <Box mt={"10px"} textAlign="center">
          <Text fontSize="xl" fontWeight="bold">Please LogIn to create a blog</Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Center mt={"100px"}>
        <Heading fontSize="3xl"
          fontWeight="bold"
          color="purple.600"
          textTransform="uppercase"
          letterSpacing="wider">Create Your Blog</Heading>
      </Center>
      <Box mx="auto" w="50%" shadow="base" p={5} borderRadius={10}>
        <Box mb={4}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mb={4}>
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>
        <Button colorScheme="red" mr={2} onClick={() => {
          navigate("/blogs");
        }}>Go Back</Button>
        <Button colorScheme="purple" onClick={handleSubmit}>Create Blog</Button>
      </Box>
    </>
  );
};

export default CreateBlog;
