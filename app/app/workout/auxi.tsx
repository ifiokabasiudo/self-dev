import Page from './page'
// import { createClient } from '@supabase/supabase-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export default async function Test () {
    const supabase = createServerComponentClient({ cookies })

    // const userData = async () => {
        const {
            data: { user },
          } = await supabase.auth.getUser()

        console.log(user)
        console.log("Ifiok")

        //   return user
    // }
    // const data1 = "It works"
    // console.log(data)
    

    return <Page user = {user} />
}