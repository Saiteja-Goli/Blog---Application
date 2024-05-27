
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Box, Button, Grid, Text, useToast, Flex, Heading, Center, Spinner, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';
import Like from './LikeButton';
import LikeButton from './LikeButton';

const Blog = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const toast = useToast(); // Initialize useToast hook




  const token = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    const fetchBlogs = async (page) => {
      try {
        const response = await axios.get(`https://blog-application-slj2.onrender.com/blogs/allBlogs?page=${page}&limit=6`);
        if (response.data && Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleBlogClick = async (blog) => {
    let postId = blog._id

    setShowComments(true);
    try {
      const response = await fetch(`https://blog-application-slj2.onrender.com/comments/get/${postId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` // Include the JWT token here if needed
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const comments = await response.json();
      console.log(comments)
      setSelectedBlog(comments);
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);

      return [];
    }
  };

  const [newComment, setNewComment] = useState('');
  const [commentInputs, setCommentInputs] = useState({});


  const handleCommentChange = (e, blogId) => {
    const { value } = e.target;
    setCommentInputs(prevState => ({
      ...prevState,
      [blogId]: value
    }));
  };

  const handlePostComment = async (newComment, blog) => {
    try {
      const response = await fetch('https://blog-application-slj2.onrender.com/comments/postcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          postId: blog,
          comment: newComment
        })
      });
      setNewComment(''); // Clear the input field after posting comment
      setCommentInputs(prevState => ({
        ...prevState,
        [blog._id]: ''
      }));

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      const data = await response.json();
      return data; // Return the response data if needed
    } catch (error) {
      console.error('Error posting comment:', error);
      throw new Error('Failed to post comment');
    }
  };

  const handleCommentDelete = async (commentId) => {
    console.log("commentId", commentId);

    try {
      const response = await fetch(`https://blog-application-slj2.onrender.com/comments/delete/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Include the JWT token here if needed
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      // Display success toast notification
      toast({
        title: "Comment Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Filter out the deleted comment from the comments state
      const updatedComments = selectedBlog.filter(comment => comment._id !== commentId);
      setSelectedBlog(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
      // Display error toast notification
      toast({
        title: "Not Authorised",
        description: "Failed to delete comment",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


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
      {
        token ? (
          <>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} px={4} mt={10}>
              {loading ? <Center ml={"700px"}>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
              </Center> : blogs.length > 0 ? blogs.map(blog => {
                const createdAtDate = new Date(blog.createdAt);
                const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;
                return (
                  <Box key={blog._id} borderWidth="1px" borderRadius="lg" p={4}>
                    <Text fontSize="xl" fontWeight="bold">{blog.title}</Text>
                    <Text mt={2}>{blog.content}</Text>
                    <Text mt={2} fontWeight="bold">Author: {blog.authorId.username}</Text>
                    <Text mt={2}>Created At: {formattedDate}</Text>
                    <Comments isOpen={showComments} onClose={() => setShowComments(false)} selectedBlog={selectedBlog} postId={selectedBlog._id} handleCommentDelete={handleCommentDelete} />
                    <Input value={commentInputs[blog._id] || ''} onChange={e => handleCommentChange(e, blog._id)} placeholder="Write a comment..." size="md" mt={4} />
                    <Flex mt={2}>
                      <Button colorScheme="teal" mr={2} onClick={() => handlePostComment(commentInputs[blog._id], blog)}>Post</Button>
                      <Button colorScheme="teal" onClick={() => handleBlogClick(blog)}>Open Comments</Button>
                    </Flex>
                    <LikeButton blog={blog} />
                    <Box>
                    </Box>
                  </Box>

                );
              }) : <Center ml={"700px"} > <Text fontSize="2xl" fontWeight="bold" mb={4}>No Blogs</Text> </Center>}
            </Grid>
            <Flex justify="center" mt={4}>
              <Button onClick={handlePreviousPage} isDisabled={currentPage === 1}>Previous</Button>
              <Text mx={4} alignSelf="center">Page {currentPage} of {totalPages}</Text>
              <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>Next</Button>
            </Flex>
          </>
        ) : (
          <Box mt={4} textAlign="center">
            <Text fontSize="xl" fontWeight="bold">Please log in to view blogs</Text>
          </Box>
        )
      }
    </>
  );
};

export default Blog;
