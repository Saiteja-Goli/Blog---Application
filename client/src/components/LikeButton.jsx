import React, { useState, useEffect } from 'react';
import { Button, Text, Box } from '@chakra-ui/react';

const LikeButton = ({ blog }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const storedLikeCount = localStorage.getItem(`likeCount_${blog._id}`);
    const storedLikedStatus = localStorage.getItem(`liked_${blog._id}`);

    if (storedLikeCount) {
      setLikeCount(parseInt(storedLikeCount));
    }

    if (storedLikedStatus) {
      setLiked(storedLikedStatus === 'true');
    }
  }, [blog]);

  const handleLikeClick = () => {
    setLikeCount(prevCount => {
      const newCount = prevCount + (liked ? -1 : 1);
      localStorage.setItem(`likeCount_${blog._id}`, newCount);
      return newCount;
    });

    setLiked(prevLiked => {
      const newLiked = !prevLiked;
      localStorage.setItem(`liked_${blog._id}`, newLiked);
      return newLiked;
    });
  };

  return (
    <Box>
      <Text>Likes: {likeCount}</Text>
      <Button colorScheme={liked ? 'red' : 'teal'} onClick={handleLikeClick}>
        {liked ? 'Unlike' : 'Like'}
      </Button>
    </Box>
  );
};

export default LikeButton;
