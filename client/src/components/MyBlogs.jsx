import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input, Textarea, useToast, Text, Center, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
    const [userBlogs, setUserBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const toast = useToast();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));
    const [editBlogData, setEditBlogData] = useState({
        id: '',
        title: '',
        content: '',
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (token) {
            const fetchUserBlogs = async () => {
                try {
                    const response = await fetch('https://blog-application-slj2.onrender.com/blogs/myBlogs', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user blogs');
                    }

                    const data = await response.json();
                    setUserBlogs(data);
                    setLoading(false)
                } catch (error) {
                    console.error('Error fetching user blogs:', error);
                    toast({
                        title: 'Failed to fetch user blogs',
                        description: 'An error occurred while fetching user blogs.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            };
            fetchUserBlogs();
        }
    }, [token]);

    const handleEdit = (blogId) => {
        const selectedBlog = userBlogs.find((blog) => blog._id === blogId);
        if (selectedBlog) {
            setEditBlogData({
                id: blogId,
                title: selectedBlog.title,
                content: selectedBlog.content,
            });
            setIsEditModalOpen(true);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://blog-application-slj2.onrender.com/blogs/editBlog/${editBlogData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: editBlogData.title,
                    content: editBlogData.content,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update blog');
            }

            setIsEditModalOpen(false);

            setUserBlogs(prevBlogs => prevBlogs.map(blog => {
                if (blog._id === editBlogData.id) {
                    return { ...blog, title: editBlogData.title, content: editBlogData.content };
                }
                return blog;
            }));

            toast({
                title: 'Blog Updated',
                description: 'The selected blog has been updated successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error updating blog:', error);
            toast({
                title: 'Failed to update blog',
                description: 'An error occurred while updating the blog.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (blogId) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const response = await fetch(`https://blog-application-slj2.onrender.com/blogs/deleteBlog/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete blog');
            }

            // Remove the deleted blog from the state
            setUserBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));

            toast({
                title: 'Blog Deleted',
                description: 'The selected blog has been deleted successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast({
                title: 'Failed to delete blog',
                description: 'An error occurred while deleting the blog.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };


    return (
        <>
            <Navbar />
            <Button colorScheme="red" ml={10} mt={"100px"} position="fixed"
                top="0px"
                zIndex="100"
                onClick={() => { navigate('/blogs') }}>Back</Button>
            {token ? (
                <Box mx="auto" w="50%" mt={"100px"}>
                    <Text fontSize="3xl"
                        fontWeight="bold"
                        color="purple.300"
                        textTransform="uppercase"
                        letterSpacing="wider" mb={4}>My Blogs</Text>
                    {loading ? <Center ml={"7px"}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Center> : userBlogs.length > 0 ? userBlogs.map(blog => {
                        const createdAtDate = new Date(blog.createdAt);
                        const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;
                        return (
                            <Box key={blog._id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                                <Text fontSize="xl" fontWeight="bold">{blog.title}</Text>
                                <Text mt={2}>{blog.content}</Text>
                                <Text mt={2} fontWeight="bold">Author: {blog.authorId.username}</Text>
                                <Text mt={2}>Created At: {formattedDate}</Text>
                                <Box mt={5}>
                                    <Button mr={2} colorScheme='teal' onClick={() => handleEdit(blog._id)}>Edit</Button>
                                    <Button colorScheme='red' onClick={() => handleDelete(blog._id)}>Delete</Button>
                                </Box>
                            </Box>
                        );
                    }) : <Center> <Text fontSize="2xl" fontWeight="bold" mb={4}>No Blogs</Text> </Center>}
                </Box>
            ) : (
                <Center>
                    <Text fontSize="2xl" mt={"100px"} fontWeight="bold">Please LogIn to view your blogs</Text>
                </Center>
            )}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Blog</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input value={editBlogData.title} onChange={(e) => setEditBlogData({ ...editBlogData, title: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Content</FormLabel>
                            <Textarea value={editBlogData.content} onChange={(e) => setEditBlogData({ ...editBlogData, content: e.target.value })} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        <Button colorScheme="whatsapp" onClick={handleUpdate} ml={2}>Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MyBlogs;
