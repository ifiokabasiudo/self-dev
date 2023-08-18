import Auxi from './auxi'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export default async function Test () {
    const supabase = createServerComponentClient({ cookies })

        const {
            data: { session },
          } = await supabase.auth.getSession()

        console.log(session)

    return <Auxi session = {session} />
}