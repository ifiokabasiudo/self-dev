import { Box, Flex, useColorModeValue, } from '@chakra-ui/react'
import LeftNavbar from '../../src/components/App/LeftNav'
import TopNavbar from '../../src/components/App/TopNav'

export default function App() {
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
          <LeftNavbar />
          <TopNavbar />
          <Box ml={{ base: 0, md: 60 }} p="4">
             
          </Box>
        </Box>
    )
}