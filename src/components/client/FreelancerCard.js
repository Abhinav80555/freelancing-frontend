import React, {useState, useEffect } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { API } from "../../API";

export default function FreelancerCard({ project, id }) {
  const [freelanceId, setFreelanceId] = useState();
 

  useEffect(() => {
    const freelanceId = JSON.parse(localStorage.getItem("fuser"));
    if (freelanceId) {
      setFreelanceId(freelanceId._id);
    }
  }, []);




  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <Box>
          <Text
            color={"red.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            <b>Posted by : </b>
           {project.userName}
          </Text>
          <Text
            color={"red.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
           <b>contact:</b> {project.userEmail}
          </Text></Box>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {project.projectName}
          </Heading>
          <Text color={"gray.500"}>
            {project.projectDesc}: Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          {project && (
            <>
              <ModalPop project={project}/>
            </>
          )}
    
        </Stack>
      </Box>
    </Center>
  );
}


function ModalPop({project}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [freelancers , setFreelancers] = useState([]);

  useEffect(()=>{
    if(project.freelancers.length){
        const requests = project.freelancers.map((freelance)=>
        fetch(`${API}/freelanceuser/${freelance}`)
        .then((res)=>res.json())
        );
        Promise.all(requests).then((res)=>setFreelancers(res));
    }

   },[project]);
   if(!project.freelancers.length){
    return(
      <>
      <Button 
      colorScheme="blue"
      width="100%"
      style={{ marginTop: 15 }} 
      onClick={onOpen}>Show freelancers</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Freelancers who applied for this project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
         you don't have any application from freelancers
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
);
}

  return (
    <>
      <Button 
      colorScheme="blue"
      width="100%"
      style={{ marginTop: 15 }} 
      onClick={onOpen}>Show freelancers</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Freelancers who applied for this project</ModalHeader>
          <ModalCloseButton />


          {freelancers.map ((dr) => (
          <ModalBody
          key={dr._id}

          >
            <Box bg='blue.500' p={4} m={2}>
         <Text color="white">freelancer Name : {dr.name}</Text>
         <Text color="white">freelancer Email : {dr.email}</Text>
         </Box>
          </ModalBody>
          ))}

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}