import React from 'react';

import {
    Container,
    Heading,
    Stack
 
  } from '@chakra-ui/react';
  
   function NotFound () {
    return (
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
           404 Page Not Found
           
          </Heading>
        
        </Stack>
      </Container>
    );
  }

export default NotFound;