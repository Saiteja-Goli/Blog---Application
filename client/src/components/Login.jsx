import React, { useState } from "react";
import { Box, useToast, Heading, Input, Button, FormControl, FormLabel, FormHelperText, Text, InputGroup, InputRightElement } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../ContextAPI/AuthContext";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)


    const toast = useToast()
    const navigate = useNavigate()
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://blog-application-slj2.onrender.com/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 404) {
                toast({
                    title: 'Not Exists',
                    description: "The Account with this Email Not Found",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                });
            } else if (response.status === 200) {
                const data = await response.json();
                const token = data.token;
                toast({
                    title: 'Successfull',
                    description: "Login Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                // console.log(token);
                localStorage.setItem('token', JSON.stringify(token));
                login();
                navigate('/');
            } else if (response.status === 401) {
                toast({
                    title: 'Wrong Credentials',
                    description: "Please Enter Correct Credentials.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                });
            } else if (response.status === 500) {
                toast({
                    title: 'Try again later',
                    description: "Internal Server Error",
                    status: "failure",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Failed to Login',
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
                <Heading mb={4}>Login</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl id="password" isRequired mt={4}>
                        <FormLabel>Password</FormLabel>

                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button type="submit" colorScheme="purple" mt={4} width="100%">
                        Login
                    </Button>
                    <Text mt={4} textAlign="center" >
                        Don't have an account? <Link to="/register" ><Text color={"purple"}> Register here</Text></Link>
                    </Text>
                </form>
            </Box>
        </>
    )
}

export default Login







