import React,{useContext,useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  HStack,
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
import { MyContext } from "../context";
import { HamburgerIcon, CloseIcon} from '@chakra-ui/icons';

export default function FreelanceNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const{ setFuser} = useContext(MyContext);

  const navigate=useNavigate();

  const handleLogout =(e)=>{
    e.preventDefault()
    setLoading(true);
      localStorage.removeItem('token')
      localStorage.removeItem('fuser')
      setFuser(null);
      window.location.replace("/")
      // setTimeout(()=>{navigate("/")},2000)
      setLoading(false);
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
            <Box><Text fontSize="2xl" fontFamily="Work sans" color={'teal'}>Freelancer</Text></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
            
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
            isLoading={loading}
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
           
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}