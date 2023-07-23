import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Text, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, Button } from "@chakra-ui/react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    navigate('/');
    window.location.reload(); 

  };

  return (
    <Flex px={4} py={2} justifyContent="space-between" alignItems="center" bg="teal.500" color="white">
      <Button onClick={logout} colorScheme="pink">Logout</Button>

      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Link to="/">
          <Text>Logo</Text>
        </Link>
      </Flex>

      <Flex>
        <Link to="/cart">
          <IconButton icon={<FiShoppingCart />} variant="outline" colorScheme="pink" mr={4} />
        </Link>
        <IconButton icon={<FiMenu />} variant="outline" colorScheme="pink" onClick={onOpen} />
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} mt={6} align="start">
                <Link to="/" onClick={onClose}>
                  <Text>Login</Text>
                </Link>
                <Link to="/signup" onClick={onClose}>
                  <Text>Signup</Text>
                </Link>
                <Link to="/cart" onClick={onClose}>
                  <Text>Cart</Text>
                </Link>
                <Link to="/products" onClick={onClose}>
                  <Text>Products</Text>
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
}

export default NavBar;
