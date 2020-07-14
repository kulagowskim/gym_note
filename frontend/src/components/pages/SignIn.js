import React from 'react';
import {Link} from 'react-router-dom';
import { Flex, Input, Button, Heading } from "@chakra-ui/core";
import { useTranslation } from 'react-i18next';

function SignIn() {
  const { t } = useTranslation();

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
        placeholder="E-mail" />
      <Input
        variant="flushed"
        mb="5px"
        _focus={{
          borderColor: "primary"
        }}
        placeholder={t('Password.1')}
      />
      <Button
        mb="5px"
        bg="primary"
        color="white"
        _hover={{ bg: "#E5903C" }}
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
