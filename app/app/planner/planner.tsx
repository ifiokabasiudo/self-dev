'use client'

import { 
    Box,
    Flex, 
    useColorModeValue,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    useDisclosure,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    HStack,
    VStack} from '@chakra-ui/react'
import LeftNavbar from '../../../src/components/App/LeftNav'
import TopNavbar from '../../../src/components/App/TopNav'
import { Button } from '@chakra-ui/react'
import DateTimePicker from 'react-datetime-picker'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { createClient } from '@supabase/supabase-js'
import { color } from 'framer-motion'

export default function Planner({session2}: any) {
  const supabaseUrl = 'https://hvodnweiaacyvwnanxgd.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2b2Rud2VpYWFjeXZ3bmFueGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5Nzk5NDUsImV4cCI6MjAwNzU1NTk0NX0.FRGL9I6gz4grshqccmGadVoub19rLi9q0IZfCvrxnBY'
  const supabase = createClient(supabaseUrl, supabaseKey)

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const session3 = session2

    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [ enteries, setEnteries ] = useState<any>([])
    const [ start, setStart ] = useState<Value | any>(new Date())
    const [ end, setEnd ] = useState<Value | any>(new Date())
    const [ activityName, setActivityName ] = useState("")
    const [ activityDescription, setActivityDescription ] = useState("") 
            
            const createActivity = () => {
                const createActivityFunction = async () => {
                    const event = {
                        'summary': activityName,
                        'description': activityDescription,
                        'start': {
                            'dateTime': start.toISOString(),
                            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                        },
                        'end': {
                            'dateTime': end.toISOString(),
                            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                        }  
                    }
                    console.log(start.toISOString())
                    console.log(JSON.stringify(session3.provider_token))

                    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + session3.provider_token
                        },
                        body: JSON.stringify(event)
                    }).then((data) => {
                        return console.log(data.json())
                    }).then(async () => {           
                        console.log("It actually got here: " + session3.user.id.toString())
                        const { data, error } = await supabase
                        .from('planner')
                        .insert([{
                        uuid: session3.user.id.toString(),
                        activity_name: activityName, 
                        activity_description: activityDescription,
                        start_time: start.toString(),
                        end_time: end.toString(),
                    }]).select()
                        console.log("It's done")
                    }).then(
                        async () => {
                        const id = session3.user.id

                        let { data: planner, error } = await supabase
                        .from('planner')
                        .select('*')
                        .eq('uuid', id)

                        setEnteries(planner)
                        console.log("Finally the last piece: " + JSON.stringify(planner))
                      }                
                    )             
                  }

                        createActivityFunction()                        
            }

    
    return (
      <>
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
          <LeftNavbar />
          <TopNavbar session4 = {session3}/>
          <Box ml={{ base: 0, md: "200px" }} p="4">
            <Button onClick={onOpen}
            bgGradient={'linear(to-r, #3E2EB3, #B763D3)'}
            color={'#FFFFFF'}
            borderRadius={"100px"}
            _hover={
                {color: '#DDDDDD'}
            }
            _active={
                {color: '#DDDDDD'}
            }
            >Add activity <AddIcon ml={"10px"} /></Button>

            {
              enteries ?
              <Box w={'95%'}
              bg={'#FFFFFF'}
              ml={'auto'}
              mr={'auto'}
              >
                <VStack>
                {
                  enteries.map((add: { id: Key | null | undefined; activity_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; activity_description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; start_time: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; end_time: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined }) => (
                    <HStack key={add.id}>
                      <Text>
                        Activity Name {"   "} {add.activity_name}
                      </Text>
                      <Text>
                        Activity Descrition {"   "} {add.activity_description}
                      </Text>
                      <Text>
                        Start Time {"   "} {add.start_time}
                      </Text>
                      <Text>
                        End Time {"   "} {add.end_time}
                      </Text>
                    </HStack>
                  ))
                }
                </VStack>
              </Box>
              :
              <></>
            }
            

            <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add an activity</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <>
                <p>When should the activity begin?</p>
                <DateTimePicker onChange={setStart} value={start} />
                <p>When should the activity end?</p>
                <DateTimePicker onChange={setEnd} value={end} />
                <p>What should I call your activity</p>
                <input type="text" onChange={(e) => setActivityName(e.target.value)} />
                <p>Can you describe your activity for me?</p>
                <input type="text" onChange={(e) => setActivityDescription(e.target.value)} />
                <hr />            
          </>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={createActivity}>Done</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
          </Box>
        </Box>
      </>
    )
  }

// Message to my boys

//   Hi guys, I just wanted to say thanks for all the support and understanding even while I wasn't really frequent during meetings. I would have said some other cringe stuff but I don't want to make anybody feel somehow, even me sef will feel somehow sef 😬. Sha thanks you guys. Really love you all. No homo
// So I've managed to sort my shit out 😁. I'll be more frequent online and also attend meetings from now on


// export default function Dashboard({session2}: any) {
//     const session3 = session2

//     type ValuePiece = Date | null;
//     type Value = ValuePiece | [ValuePiece, ValuePiece];

//     const [ start, setStart ] = useState<Value | any>(new Date())
//     const [ end, setEnd ] = useState<Value | any>(new Date())
//     const [ activityName, setActivityName ] = useState("")
//     const [ activityDescription, setActivityDescription ] = useState("") 


            
//             const createActivity = () => {
//                 const createActivityFunction = async () => {
//                     const event = {
//                         'summary': activityName,
//                         'description': activityDescription,
//                         'start': {
//                             'dateTime': start.toISOString(),
//                             'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
//                         },
//                         'end': {
//                             'dateTime': end.toISOString(),
//                             'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
//                         }  
//                     }
//                     console.log(start.toISOString())
//                     console.log(JSON.stringify(session3.provider_token))

//                     await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
//                         method: 'POST',
//                         headers: {
//                             'Authorization': 'Bearer ' + session3.provider_token
//                         },
//                         body: JSON.stringify(event)
//                     }).then((data) => {
//                         return console.log(data.json())
//                     })
//                 }

//                 createActivityFunction()
//             }

//     return (
//         <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
//           <LeftNavbar />
//           <TopNavbar session4 = {session3}/>
//           <Box ml={{ base: 0, md: 60 }} p="4">
//           <>
//                 <p>When should the activity begin?</p>
//                 <DateTimePicker onChange={setStart} value={start} />
//                 <p>When should the activity end?</p>
//                 <DateTimePicker onChange={setEnd} value={end} />
//                 <p>What should I call your activity</p>
//                 <input type="text" onChange={(e) => setActivityName(e.target.value)} />
//                 <p>Can you describe your activity for me?</p>
//                 <input type="text" onChange={(e) => setActivityDescription(e.target.value)} />
//                 <hr />
//                 <Button onClick={createActivity}>Done</Button>
//             </>             
//           </Box>
//         </Box>
//     )