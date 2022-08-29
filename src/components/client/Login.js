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
  import { MyContext } from "../context";
  import React, { useState,useContext } from "react";
  import { useNavigate } from "react-router-dom";
  
  export function Login() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const{ setCuser} = useContext(MyContext);



    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
  
    const toast = useToast();
    const history = useNavigate();
  
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
        setLoading(false);
        return;
      }
  
      // console.log(email, password);
      try {
        axios.post("/clientlogin",{email,password})
        .then(({data})=>{
          localStorage.setItem("token",(data.token));
          localStorage.setItem("cuser", JSON.stringify(data));
          setCuser(data);
          toast({
            title: "Login Sucessfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom"
          });
          history("/freelancers")
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
  
    return (
      <VStack spacing="10px">

        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            value={email}
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>


        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Enter password"
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
          Login
        </Button>



        <Button
          variant="solid"
          colorScheme="yellow"
          width="100%"
          onClick={() => {
            setEmail("client2@gmail.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    );
  }