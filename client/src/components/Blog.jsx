import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Box, Button, Grid, Text, Flex, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/blogs/allBlogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <Flex mt={32} mb={4} px={4} justify="space-between" align="center">
        <Heading fontSize="3xl"
          fontWeight="bold"
          color="purple.600"
          textTransform="uppercase"
          letterSpacing="wider">All Blogs</Heading>
        <Box>
          <Button colorScheme="blue" onClick={() => navigate("/blogs/new")}>
            Create Blog
          </Button>
          <Button ml={2} colorScheme="green" onClick={() => navigate('/myBlogs')}>
            My Blogs
          </Button>
        </Box>
      </Flex>
      {token ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} px={4} mt={10}>
          {blogs.map(blog => {
            const createdAtDate = new Date(blog.createdAt);
            const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;
            return (
              <Box key={blog._id} borderWidth="1px" borderRadius="lg" p={4}>
                <Text fontSize="xl" fontWeight="bold">{blog.title}</Text>
                <Text mt={2}>{blog.content}</Text>
                <Text mt={2} fontWeight="bold">Author: {blog.authorId._id}</Text>
                <Text mt={2}>Created At: {formattedDate}</Text>
              </Box>
            );
          })}
        </Grid>
      ) : (
        <Box mt={4} textAlign="center">
          <Text fontSize="xl" fontWeight="bold">Please log in to view blogs</Text>
        </Box>
      )}
    </>
  );
};

export default Blog;
