'use client'

import Planner from './pageLayout'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

export default function App() {
    return (
        <ChakraProvider>
        <Planner />
        </ChakraProvider>
    )
}