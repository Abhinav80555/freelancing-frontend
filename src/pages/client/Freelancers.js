import React,{useState,useEffect} from "react";
import axios from "../../Axios";
import {useToast,SimpleGrid,Box,Heading,Text} from "@chakra-ui/react";
import ClientNavbar from "../../components/client/ClientNavbar";
import FreelancerCard from "../../components/client/FreelancerCard";


function Freelancers(){

    const toast = useToast();
    const [projectList, setProjectList] = useState([]);
    const [userId,setUserId]=useState();

    useEffect(()=>{
      const userId=JSON.parse(localStorage.getItem('cuser'));
      if(userId){
          setUserId(userId._id)
      }
  },[])

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
      
        useEffect(() =>{getProjects()},[]);





    return(
        <>
        {/* <FreelanceNavbar/> */}
        <Box
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        width={'100%'}
        bg={'linear-gradient(to top,#fff1eb 0%,#ace0f9 100%)'}>
        <ClientNavbar width={'full'} justify={'center'} flex={'start'}/>
        <Heading fontSize={{ base: '1xl', md: '4xl', lg: '5xl' }}>
  <Text color={'blue.400'} as={'span'}>Projects Applied by Freelancers</Text></Heading>
<SimpleGrid columns={2} spacing={10}>
 {projectList.filter((client)=>client.userId.includes(userId)).map((pr) => (
          <FreelancerCard
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



export default Freelancers;


