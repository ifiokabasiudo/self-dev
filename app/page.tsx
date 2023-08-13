'use client'

import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import PageLayout from './pageLayout';

export default function Home() {
  return (
    <ChakraProvider>
        <PageLayout />
    </ChakraProvider>
  )
}
