'use client'
import { Button } from '@chakra-ui/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import DateTimePicker from 'react-datetime-picker'
import { useState } from 'react'

export default function Home ({session}: any) {
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [ start, setStart ] = useState<Value | any>(new Date())
    const [ end, setEnd ] = useState<Value | any>(new Date())
    const [ activityName, setActivityName ] = useState("")
    const [ activityDescription, setActivityDescription ] = useState("") 
    const supabase = createClientComponentClient()

            
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
                            'Authorization': 'Bearer' + session.provider_token
                        },
                        body: JSON.stringify(activity)
                    }).then((data) => {
                        return console.log(data.json())
                    })
                }

                createActivityFunction()
            }

            const signOut = () => {
                const signOutFunction = async () => {
                    await supabase.auth.signOut()
                }

                signOutFunction()
            } 

    let userData

    if(session){
        userData = session.user.user_metadata.full_name
        console.log(userData)
    }

    return (<div>
        {session ? 
            <>
                <h1>Hello {userData}</h1>
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
                <br />
                <Button onClick={signOut}>Sign Out</Button>
            </>
        :<>
            <h1>{userData}</h1>      
        </>
        }
    </div>)
}