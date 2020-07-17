import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Flex, Input, Button, Heading, useToast } from "@chakra-ui/core";
import { useTranslation } from 'react-i18next';

function SignIn() {
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
    fetch('/signin', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        email
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.error) {
          toast({
            title: "We can`t login",
            description: data.error,
            status: "error",
            duration: 4000,
            isClosable: true,
          })
        } else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          history.push('/')
          toast({
            title: "Signedin success",
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
        {t('Login.2')}
      </Button>
      <Heading as="h6" size="xs">
        <Link to="/signUp">{t('Login.3')}</Link>
      </Heading>
    </Flex>
  );
}

export default SignIn;
