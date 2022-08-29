import React,{ useContext } from 'react';
import {Link as ReachLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import axios from "../../Axios"
import { MyContext } from "../context";
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';



export default function ClientNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const{ setCuser} = useContext(MyContext);
const navigate=useNavigate();

  const handleLogout =(e)=>{
    e.preventDefault()
      localStorage.removeItem('token')
      localStorage.removeItem('cuser')
      setCuser(null);
      setTimeout(()=>{navigate("/c-auth")},0)
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Text fontSize="2xl" fontFamily="Work sans" color={'teal'}>Client</Text></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Link  
              as={ReachLink}
              to="/freelancers"
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                 >Projects</Link>
                  <Link  
              as={ReachLink}
              to="/addpost"
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                 >Add Projects</Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
             onClick={handleLogout}
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}>
              Logout
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
               <Link  
              as={ReachLink}
              to="/freelancers"
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: ('gray.200', 'gray.700'),
                }}
                 >Projects</Link>
                  <Link  
              as={ReachLink}
              to="/addpost"
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg:('gray.200', 'gray.700'),
                }}
                 >Add Projects</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}