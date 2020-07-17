import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Flex, Input, Button, Heading, useToast } from "@chakra-ui/core";
import { useTranslation } from 'react-i18next';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const history = useHistory();
  const toast = useToast();

  const PostData = () => {
    //eslint-disable-next-line
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter the correct email",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
      return;
    }
    fetch('/signup', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    }).then(res => res.json())
      .then(data => {
        if (data.err) {
          toast({
            title: "We can`t create account",
            description: data.err,
            status: "error",
            duration: 4000,
            isClosable: true,
          })
        } else {
          history.push('/signin')
          toast({
            title: data.message,
            description: "We've created your account for you.",
            status: "success",
            duration: 4000,
            isClosable: true,
          })
        }
      })
  }

  return (
    <Flex
      maxWidth="500px"
      m="60px auto"
      shadow="0px 0px 12px 1px rgba(0,0,0,0.15)"
      borderRadius="15px"
      p="20"
      flexDirection="column"
    >
      <Input
        variant="flushed"
        mb="5px"
        _focus={{
          borderColor: "primary"
        }}
        placeholder={t('Username.1')}
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Input
        variant="flushed"
        mb="5px"
        _focus={{
          borderColor: "primary"
        }}
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        variant="flushed"
        mb="5px"
        _focus={{
          borderColor: "primary"
        }}
        placeholder={t('Password.1')}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        mb="5px"
        bg="primary"
        color="white"
        _hover={{ bg: "#E5903C" }}
        onClick={() => PostData()}
      >
        {t('Register.1')}
      </Button>
      <Heading as="h6" size="xs">
        <Link to="/signIn">{t('Register.2')}</Link>
      </Heading>
    </Flex>
  );
}

export default SignUp;
