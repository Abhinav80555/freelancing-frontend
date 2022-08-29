import axios from "../../Axios"
import React, { useState,useEffect } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useToast,
    Textarea,
    useColorModeValue,
  } from '@chakra-ui/react';
  import ClientNavbar from "../../components/client/ClientNavbar";




function Addpost(){  
  
    const [projectName, setProjectName] = useState();
    const [projectDesc, setProjectDesc] = useState();
    const [userId,setUserId]=useState();
    const[userName,setUserName]=useState();
    const[userEmail,setUserEmail]=useState();
    const [loading, setLoading] = useState(false);

useEffect(()=>{
    const userId=JSON.parse(localStorage.getItem('cuser'));
    if(userId){
        setUserId(userId._id)
        setUserEmail(userId.email)
        setUserName(userId.name)
    }
},[])

  
    const toast = useToast();
    const submitHandler = async () => {
      setLoading(true);
      if (!projectName || !projectDesc) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });
        setLoading(false);
        return;
      }
      try {
        axios.post("/addproject",{projectName,projectDesc,userId,userEmail,userName})
        .then(({data})=>{
     
      
          toast({
            title: "Added sucessfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom"
          });
          setLoading(false);
        })
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });
        setLoading(false);
      }
    };








    return(
        <>
        
        <Box
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        width={'100%'}
        bg={'linear-gradient(to top,#fff1eb 0%,#ace0f9 100%)'}>
        <ClientNavbar width={'full'} justify={'center'} flex={'start'}/>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Add project form
          </Heading>
          <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Project Title</FormLabel>
                    <Input type="text" 
                    onChange={(e) => setProjectName(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Project Description</FormLabel>
                    <Textarea placeholder='write here'
                    onChange={(e) => setProjectDesc(e.target.value)} />
                  </FormControl>
                </Box>
          <Stack spacing={6}>
            <Button
             onClick={submitHandler}
             isLoading={loading}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Add Project
            </Button>
          </Stack>
        </Stack>
      </Box>
      </>
    )
}
export default Addpost;