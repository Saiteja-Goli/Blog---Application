import React from 'react';
import { Box, useToast, Flex, Heading, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextAPI/AuthContext';

const Navbar = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast()

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    localStorage.clear();
    toast({
      title: 'Successfull',
      description: 'You have been logged out',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigate('/');
  };

  return (
    <Box
      backgroundColor="purple.400"
      pr={6}
      pl={10}
      pt={5}
      pb={5}
      position="fixed"
      top="0"
      zIndex="100"
      boxShadow="md"
      width="100%"
    >
      <Flex justify="space-between" align="center">
        <Heading fontSize="3xl"
          fontWeight="bold"
          color="whitesmoke"
          textTransform="uppercase"
          letterSpacing="wider"><Link to="/">Blogs</Link></Heading>
        <Button
          colorScheme={isLoggedIn ? "red" : "green"}
          zIndex="10"
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
