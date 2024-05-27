import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Heading, Input, useToast, Button, FormControl, FormLabel, Text, InputGroup, InputRightElement } from '@chakra-ui/react';
import Navbar from './Navbar';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://blog-application-slj2.onrender.com/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.status === 400) {
                toast({
                    title: 'Account Exists',
                    description: "The Account is Already Registered",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                });
            } else if (response.status === 201) {
                toast({
                    title: 'Account Registered',
                    description: "The Account Registered Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/login");
            } else if (response.status === 500) {
                toast({
                    title: 'Something went wrong',
                    description: "The Account Not Registered.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Failed Account created.',
                description: "Something Went Wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Navbar />
            <Box maxWidth="400px" mx="auto" mt={100} boxShadow='base' p={8}>
                <Heading mb={4}>Register</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl id="email" isRequired mt={4}>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl id="password" isRequired mt={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button type="submit" colorScheme="purple" mt={4} width="100%">
                        Register
                    </Button>
                </form>
                <Text mt={4} textAlign="center">
                    Already have an account? <Link to="/login"><Text color={"purple"}> Login here</Text></Link>
                </Text>
            </Box>
        </>
    );
};

export default Register;
