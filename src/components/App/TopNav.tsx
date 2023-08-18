import {
    IconButton,
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    useColorModeValue,
    Text,
    useDisclosure,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
  } from '@chakra-ui/react'
  import {
    FiMenu,
    FiBell,
    FiChevronDown,
  } from 'react-icons/fi'
  import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
  
  interface MobileProps extends FlexProps {
    onOpen: () => void
  }
  
  
  const TopNavbar = ( { session4 }: any, { ...rest }: MobileProps) => {
    const supabase = createClientComponentClient()
    const { onOpen } = useDisclosure()

    const signOut = () => {
      const signOutFunction = async () => {
          await supabase.auth.signOut()
      }
      signOutFunction()
    }

    let username
    let avatar

    if(session4) {
      username = session4.user.user_metadata.full_name
      avatar = session4.user.user_metadata.avatar_url
      console.log(username)
    }

    return (
      <Flex
        ml={{ base: 0, md: '216px' }}
        mr={{ base: 0, md: '10px' }}
        px={{ base: 4, md: 4 }}
        height="70px"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color={'white'}
          >
          Logo
        </Text>
  
        <HStack spacing={{ base: '0', md: '6' }} >
          <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={ avatar }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{username}</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem onClick={signOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    )
  }
  
  // const TopNavbar = ({ session4 }: any) => {
  //   const { onOpen } = useDisclosure()

  //   const username = session4.user.user_metadata.full_name 
  //   return (
  //       <MobileNav onOpen={onOpen} username = {username} />
  //   )
  // }
  
  export default TopNavbar