'use client'

import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import PageLayout from './pageLayout';

export default function Home({session}: any) {
  const session1 = session

  return (
    <ChakraProvider>
        <PageLayout session2 = {session1}/>
    </ChakraProvider>
  )
}
