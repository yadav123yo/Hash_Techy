import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Text, Image, Grid } from '@chakra-ui/react';

function Product() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : {};
    cart[product.id] = (cart[product.id] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}} gap={6}>
      {products.map(product => (
        <Box key={product.id} p="5" shadow="md" borderWidth="1px">
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Image boxSize="100px" objectFit="cover" src={product.image} alt={product.title} />
            <Text mt={4}>{product.title}</Text>
            <Text mt={2}>Price: ${product.price}</Text>
            <Button mt={4} onClick={() => addToCart(product)}>Add to Cart</Button>
          </Flex>
        </Box>
      ))}
    </Grid>
  );
}

export default Product;
