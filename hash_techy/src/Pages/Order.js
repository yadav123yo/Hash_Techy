import React from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Order() {
  const navigate = useNavigate();
  
  const handleVisitAgain = () => {
    localStorage.removeItem('cart');
    navigate('/products');
  }

  return (
    <Box width="full" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bg="teal.500">
      <Text fontSize="3xl" color="white" mb={4}>Congratulations on your order!</Text>
      
      <Image src="https://tse3.mm.bing.net/th?id=OIP.A5zQE0TYyCTaRL47OjfKrAHaD1&pid=Api&P=0&h=180" alt="Congratulations" mb={8} /> {/* Replace with your actual image path */}
      <Button colorScheme="pink" onClick={handleVisitAgain}>Visit Again</Button>
    </Box>
  );
}

export default Order;
