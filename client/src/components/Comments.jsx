
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Input, Button, Text, Box } from '@chakra-ui/react'; // Import Chakra UI components or your chosen library

const Comments = ({ isOpen, onClose, selectedBlog, handleCommentDelete }) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Comments</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Render comments here */}
                        {selectedBlog.map(comment => (
                            <Box key={comment._id} mb="10px" shadow={"base"} p={5} borderRadius={20}>
                                <Text fontWeight="bold">{comment.userId.username}:</Text>
                                <Text>{comment.comment}</Text>
                                <Button mt={2}color="red" cursor="pointer" onClick={() => handleCommentDelete(comment._id)}>Delete</Button>
                            </Box>
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Comments;
