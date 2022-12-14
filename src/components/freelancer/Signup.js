import React, { useState,useContext } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack
} from "@chakra-ui/react";
import axios from "../../Axios"
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context";

export function Signup() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const{ setFuser} = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();



  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }
    try {
      await axios.post(`/freelanceuser`,{name,email,password})
      .then(({data})=>{console.log({data})
        toast({
        title: "Registration Successful",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "bottom"
      });
        setFuser(data);
        setLoading(false);
        window.location.replace("/f-auth") 
      })
    } catch (error) {
      toast({
        title: "User Credential Already Exists!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">

            
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}