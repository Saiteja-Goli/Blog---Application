// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import { Box, Button, Input, Textarea, useToast } from '@chakra-ui/react';
// import axios from 'axios';
// import { withRouter } from 'react-router-dom';

// const EditBlog = ({ match }) => {
//     const { id } = match.params; // Get the blog ID from the URL params
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const toast = useToast();

//     useEffect(() => {
//         const fetchBlog = async () => {
//             try {
//                 const response = await axios.get(`https://blog-application-slj2.onrender.com/blogs/${id}`);
//                 const { title, content } = response.data;
//                 setTitle(title);
//                 setContent(content);
//             } catch (error) {
//                 console.error('Error fetching blog:', error);
//                 toast({
//                     title: 'Failed to fetch blog',
//                     description: 'An error occurred while fetching the blog data.',
//                     status: 'error',
//                     duration: 5000,
//                     isClosable: true,
//                 });
//             }
//         };
//         fetchBlog();
//     }, [id, toast]);

//     const handleSubmit = async () => {
//         try {
//             await axios.put(`https://blog-application-slj2.onrender.com/blogs/${id}`, { title, content });
//             toast({
//                 title: 'Blog Updated',
//                 description: 'The blog has been updated successfully.',
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//             });
//         } catch (error) {
//             console.error('Error updating blog:', error);
//             toast({
//                 title: 'Failed to update blog',
//                 description: 'An error occurred while updating the blog.',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//             });
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <Box mt={20} mx="auto" w="50%">
//                 <Input
//                     mb={4}
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <Textarea
//                     mb={4}
//                     placeholder="Content"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                 />
//                 <Button colorScheme="red" mr={2} onClick={() => window.history.back()}>Cancel</Button>
//                 <Button colorScheme="purple" onClick={handleSubmit}>Update Blog</Button>
//             </Box>
//         </>
//     );
// };

// export default EditBlog;
