import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Text, Image, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    setCart(storedCart ? JSON.parse(storedCart) : {});
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await Promise.all(
        Object.keys(cart).map(async (productId) => {
          const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
          return { ...response.data, quantity: cart[productId] };
        })
      );

      setCartItems(items);
    };

    fetchCartItems();
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      setCart(prevCart => ({ ...prevCart, [productId]: quantity }));
    } else {
      removeItem(productId);
    }
  };

  const removeItem = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  const handleOrder = () => {
    navigate('/order');
  };

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <Flex direction="column" alignItems="center" bg="teal.500" minHeight="100vh">
      <Box w="100%" p={5} shadow="md" borderWidth="1px" bg="white" my={4}>
        <Text fontSize="xl" textAlign="center">Total: ${total.toFixed(2)}</Text>
        <Button colorScheme="pink" mt={4} onClick={handleOrder}>Order</Button>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {cartItems.map(item => (
          <Box key={item.id} p="5" shadow="md" borderWidth="1px" bg="white" mb={4}>
            <Image boxSize="100px" src={item.image} alt={item.title} />
            <Text mt={4}>{item.title}</Text>
            <Text>Price: ${item.price}</Text>
            <NumberInput min={0} value={item.quantity} onChange={(valueString, valueNumber) => updateQuantity(item.id, valueNumber)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text mt={4}>Subtotal: ${item.quantity * item.price}</Text>
            <Button mt={4} onClick={() => removeItem(item.id)}>Remove</Button>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}

export default Cart;
