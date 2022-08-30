import React,{useState,useEffect} from "react";
import ProjectCard from "../../components/freelancer/projectCard";
import axios from "../../Axios";
import {useToast,SimpleGrid,Box,Heading,Text} from "@chakra-ui/react";
import FreelanceNavbar from "../../components/freelancer/FreelanceNavbar";


function Projects(){

    const toast = useToast();
    const [projectList, setProjectList] = useState([]);



    const getProjects = async () => {

        try {
            
            const { data } = await axios.get(`/getprojects`);
            setProjectList(data);
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: "Failed to Load the chats",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            });
          }
        };
      
        useEffect(() =>{getProjects()},[projectList]);





    return(
        <>
        {/* <FreelanceNavbar/> */}
        <Box
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        width={'100%'}
        bg={'linear-gradient(to top,#fff1eb 0%,#ace0f9 100%)'}>
        <FreelanceNavbar width={'full'} justify={'center'} flex={'start'}/>
        <Heading fontSize={{ base: '1xl', md: '4xl', lg: '5xl' }}>
  <Text color={'blue.400'} as={'span'}>Projects posted by clients</Text></Heading>
<SimpleGrid columns={2} spacing={10}>
 
        {projectList.map((pr) => (
          <ProjectCard
            key={pr._id}
            project={pr}
            id={pr._id}
            {...pr}
          />
        ))}
    </SimpleGrid>
    </Box>
    </>
    )
}



export default Projects;


