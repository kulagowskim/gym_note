import React from "react";
import { Link } from 'react-router-dom';
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import { useTranslation } from 'react-i18next';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Navbar = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const { t, i18n } = useTranslation();

  function handleClick(lang) {
    i18n.changeLanguage(lang)
  }

  return (
    <Box bg="primary">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        color="white"
        maxWidth="1250px"
        m="auto"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
            <Link to="/">Gym Note</Link>
          </Heading>
        </Flex>

        <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
        >
          
          <MenuItems><Link to="/createExercise">Create Exercise</Link></MenuItems>
          <MenuItems><Link to="/exercises">Exercises</Link></MenuItems>
          <MenuItems><Link to="/user">Create User</Link></MenuItems>
          <MenuItems><Link to="/profile">Profile</Link></MenuItems>
          <MenuItems><Link to="/signup">{t('Register.1')}</Link></MenuItems>
          <MenuItems><Link to="/signin">{t('Login.1')}</Link></MenuItems>
          <Flex flexDirection="column">
          <Button
            bgolor="white" 
            color="primary"
            size="xs"
            mb="2px"
            onClick={() => handleClick('pl')}
          >Pl</Button>
          <Button
            bgolor="white" 
            color="primary"
            size="xs"
            onClick={() => handleClick('en')}
          >En</Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
