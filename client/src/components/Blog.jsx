// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import { Box, Button, Grid, Text, Flex, Heading } from '@chakra-ui/react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Blog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const token = JSON.parse(localStorage.getItem('token'));
//   const navigate = useNavigate();

//   //
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   //

//   useEffect(() => {
//     const fetchBlogs = async (page) => {
//       try {
//         const response = await axios.get(`https://blog-application-evwg.onrender.com/blogs/allBlogs?page=${page}&limit=3`);
//         setBlogs(response.data);
//         setTotalPages(response.data.totalPages);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };
//     fetchBlogs(currentPage);
//   }, [currentPage]);


//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };


//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <>
// <Navbar />
// <Flex mt={32} mb={4} px={4} justify="space-between" align="center">
//   <Heading fontSize="3xl"
//     fontWeight="bold"
//     color="purple.600"
//     textTransform="uppercase"
//     letterSpacing="wider">All Blogs</Heading>
//   <Box>
//     <Button colorScheme="blue" onClick={() => navigate("/blogs/new")}>
//       Create Blog
//     </Button>
//     <Button ml={2} colorScheme="green" onClick={() => navigate('/myBlogs')}>
//       My Blogs
//     </Button>
//   </Box>
// </Flex>
//       {token ? (
//         <>
//           <Grid templateColumns="repeat(3, 1fr)" gap={6} px={4} mt={10}>
//             {blogs && blogs.map((blog) => {
//               const createdAtDate = new Date(blog.createdAt);
//               const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;
//               return (
//                 <Box key={blog._id} borderWidth="1px" borderRadius="lg" p={4}>
//                   <Text fontSize="xl" fontWeight="bold">{blog.title}</Text>
//                   <Text mt={2}>{blog.content}</Text>
//                   <Text mt={2} fontWeight="bold">Author: {blog.authorId._id}</Text>
//                   <Text mt={2}>Created At: {formattedDate}</Text>
//                 </Box>
//               );
//             })}
//           </Grid>
//           <Flex justify="center" mt={4}>
//             <Button onClick={handlePreviousPage} isDisabled={currentPage === 1}>Previous</Button>
//             <Text mx={4} alignSelf="center">Page {currentPage} of {totalPages}</Text>
//             <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>Next</Button>
//           </Flex>

//         </>

//       ) : (
//         <Box mt={4} textAlign="center">
//           <Text fontSize="xl" fontWeight="bold" color={'black'}>Please log in to view blogs</Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default Blog;
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Box, Button, Grid, Text, Flex, Heading, Center, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async (page) => {
      try {
        const response = await axios.get(`https://blog-application-evwg.onrender.com/blogs/allBlogs?page=${page}&limit=6`);
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
