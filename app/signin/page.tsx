import Signin from './signin'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export default async function Test () {
    const supabase = createServerComponentClient({ cookies })

        const {
            data: { session },
          } = await supabase.auth.getSession()

        console.log("signin " + session)  

    return <Signin session = {session} />
}