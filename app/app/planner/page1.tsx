'use client'

import Planner from './planner'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function App({session}: any) {
    const router = useRouter()
    const session1 = session

    useEffect(() => {
        if(!session1){
            router.push('/signin')
        }
    }, [])

    return (
        <ChakraProvider>
        <Planner session2 = {session1} />
        </ChakraProvider>
    )
}