import React from 'react';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextAPI/AuthContext';

const Navbar = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box
      backgroundColor="purple.400"
      p={4}
      position="fixed"
      top="0"
      zIndex="100"
      boxShadow="md"
      width="100%"
    >
      <Flex justify="space-between" align="center">
        <Heading color="white"><Link to="/">Blogs</Link></Heading>
        <Button
          colorScheme="whiteAlpha"
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
