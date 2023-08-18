import { Box, Flex, useColorModeValue, } from '@chakra-ui/react'
import LeftNavbar from '../../src/components/App/LeftNav'
import TopNavbar from '../../src/components/App/TopNav'

export default function Dashboard({session2}: any) {
    const session3 = session2

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
          <LeftNavbar />
          <TopNavbar session4 = {session3}/>
          <Box ml={{ base: 0, md: 60 }} p="4">
             
          </Box>
        </Box>
    )
}