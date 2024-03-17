import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Grid, Image, VStack, HStack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { FaSearch, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";

const restaurants = [
  {
    id: 1,
    name: "Burger Joint",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50fGVufDB8fHx8MTcxMDcwOTA4Nnww&ixlib=rb-4.0.3&q=80&w=1080",
    items: [
      { id: 1, name: "Cheeseburger", price: 9.99 },
      { id: 2, name: "Veggie Burger", price: 8.99 },
      { id: 3, name: "Fries", price: 3.99 },
    ],
  },
  {
    id: 2,
    name: "Sushi Place",
    image: "https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnR8ZW58MHx8fHwxNzEwNzA5MDg2fDA&ixlib=rb-4.0.3&q=80&w=1080",
    items: [
      { id: 1, name: "California Roll", price: 7.99 },
      { id: 2, name: "Spicy Tuna Roll", price: 8.99 },
      { id: 3, name: "Edamame", price: 4.99 },
    ],
  },
  // Add more restaurants...
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleRemoveFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onOpen();
  };

  return (
    <Box>
      <Box bg="red.500" p={4} color="white">
        <Heading size="xl">Foodora</Heading>
      </Box>
      <Box p={4}>
        <HStack>
          <Input placeholder="Search restaurants..." value={searchQuery} onChange={handleSearch} />
          <IconButton icon={<FaSearch />} aria-label="Search" />
          <IconButton icon={<FaShoppingCart />} aria-label="Cart" onClick={onOpen} />
          <Text>Cart: {cart.length} items</Text>
        </HStack>
      </Box>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4} p={4}>
        {filteredRestaurants.map((restaurant) => (
          <Box key={restaurant.id} borderWidth={1} borderRadius="md" overflow="hidden" cursor="pointer" onClick={() => handleRestaurantClick(restaurant)}>
            <Image src={restaurant.image} alt={restaurant.name} />
            <Box p={2}>
              <Heading size="md">{restaurant.name}</Heading>
            </Box>
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedRestaurant?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRestaurant?.items.map((item) => (
              <Box key={item.id} mb={2}>
                <Text>
                  {item.name} - ${item.price}
                </Text>
                <HStack>
                  <IconButton icon={<FaPlus />} aria-label="Add to cart" onClick={() => handleAddToCart(item)} />
                  <IconButton icon={<FaMinus />} aria-label="Remove from cart" onClick={() => handleRemoveFromCart(item)} />
                </HStack>
              </Box>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
