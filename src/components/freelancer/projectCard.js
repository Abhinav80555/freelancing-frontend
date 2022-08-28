import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  useToast,
  Button,
} from "@chakra-ui/react";
import { MyContext } from "../context";
import axios from "../../Axios";

export default function ProjectCard({ project, id }) {
  const { projectList, setProjectList} = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [freelanceId, setFreelanceId] = useState();
  const [disabled,setDisabled] = useState(false);
  var projectId={id}
  const toast = useToast();

  useEffect(() => {
    const freelanceId = JSON.parse(localStorage.getItem("fuser"));
    if (freelanceId) {
      setFreelanceId(freelanceId._id);
    }
  }, []);

  function submitHandler() {
    setLoading(true);
    axios
      .post("/freelanceapply/", {freelanceId: freelanceId,projectId:projectId.id})
      .then(({ data }) => {
        setProjectList(data);
        toast({
          title: "applied successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });
        setLoading(false);
        setDisabled(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  const declineHandler = () => {
    setLoading(true);
    axios
      .post("/freelancedecline/", { freelanceId: freelanceId,projectId:projectId.id})
      .then(({ data }) => {
        setProjectList(data);
        setLoading(false);
        setDisabled(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };




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
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {project.userId}
          </Text>
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
              {project.freelancers.includes(freelanceId) ? (
                <Button
                  colorScheme="red"
                  width="100%"
                  style={{ marginTop: 15 }}
                  onClick={declineHandler}
                  isLoading={loading}
                  disabled={disabled}
                >
                  Decline
                </Button>
              ) : (
                <Button
                  colorScheme="blue"
                  width="100%"
                  style={{ marginTop: 15 }}
                  onClick={submitHandler}
                  isLoading={loading}
                  disabled={disabled}
                >
                  Apply
                </Button>
              )}
            </>
          )}
    
        </Stack>
      </Box>
    </Center>
  );
}
