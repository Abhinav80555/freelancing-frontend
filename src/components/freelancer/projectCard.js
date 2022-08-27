import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button
} from '@chakra-ui/react';




export default function ProjectCard({project,id}){


  


    return(
        <Center py={6}>
        <Box
          maxW={'445px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}>
          
          <Stack>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              {project.userId}
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}>
              {project.projectName}
            </Heading>
            <Text color={'gray.500'}>
              {project.projectDesc}:
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
              et ea rebum.
            </Text>
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            
            <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
        //   onClick={submitHandler}
        //   isLoading={loading}
        >
          Apply
        </Button>
            
          </Stack>
        </Box>
      </Center>
    )
}






