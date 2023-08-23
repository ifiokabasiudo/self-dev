import Page1 from './page1'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export default async function Test () {
    const supabase = createServerComponentClient({ cookies })

        const {
            data: { session },
          } = await supabase.auth.getSession()

        console.log("planner " + JSON.stringify(session))    

    return <Page1 session = {session} />
}