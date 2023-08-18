'use client'

import { Box, Flex, useColorModeValue, } from '@chakra-ui/react'
import LeftNavbar from '../../../src/components/App/LeftNav'
import TopNavbar from '../../../src/components/App/TopNav'
import { Button } from '@chakra-ui/react'
import DateTimePicker from 'react-datetime-picker'
import { useState } from 'react'


export default function Dashboard({session2}: any) {
    const session3 = session2

    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [ start, setStart ] = useState<Value | any>(new Date())
    const [ end, setEnd ] = useState<Value | any>(new Date())
    const [ activityName, setActivityName ] = useState("")
    const [ activityDescription, setActivityDescription ] = useState("") 
            
            const createActivity = () => {
                const createActivityFunction = async () => {
                    const activity = {
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

                    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer' + session3.provider_token
                        },
                        body: JSON.stringify(activity)
                    }).then((data) => {
                        return console.log(data.json())
                    })
                }

                createActivityFunction()
            }

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
          <LeftNavbar />
          <TopNavbar session4 = {session3}/>
          <Box ml={{ base: 0, md: 60 }} p="4">
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
                <Button onClick={createActivity}>Done</Button>
            </>             
          </Box>
        </Box>
    )
}