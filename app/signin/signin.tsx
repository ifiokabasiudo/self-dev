'use client'

import { Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


export default function Signin ( { session }: any ) {
    const supabase = createClientComponentClient()
    const router = useRouter()
    
    useEffect(() => {
        if(session){
            router.push('/app')
        }
    }, [])


            const googleSignIn = () => {
                const fetchData = async () => {
                    const { error } = await supabase.auth.signInWithOAuth({
                        provider: 'google',
                        options: {
                            scopes: 'https://www.googleapis.com/auth/calendar',
                            redirectTo: 'http://localhost:3000/app'    
                        }
                    })
 
                    if(error) {
                        alert("There was an error signing in to google")
                        console.log(error)
                    }

                }
                fetchData()
            }


    return (<Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'#3717B6'}
        bg={'#FFFFFF'}
        onClick={googleSignIn}
        _hover={{
          bg: '#EEEEEE',
        }}>
        Sign In with Google
      </Button>)
}