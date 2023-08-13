import * as React from 'react'
import Header from '../src/components/Web/Header'
import Home from './components/home'
import Features from './components/features'
import Testimonials from './components/testimonials'
import AboutUs from './components/about-us'
import ContactUs from './components/contact-us'
import {  
  Box,
  ChakraProvider,
  Flex,
  Image,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertTitle,
  AlertDescription,
  IconButton,
  Icon,
  AlertDialogFooter,
  Divider,} from '@chakra-ui/react'

export default function HomeLayout() {
  return (
    <Box
    w="100%"
    bgGradient='linear(to-br, #3717B6, #8750D0)'
    overflowX="hidden"
    >
        <Header />
        <Home /> 
        <Features />  
        <Testimonials />   
        <AboutUs />
        <ContactUs />
    </Box>
  )
}
