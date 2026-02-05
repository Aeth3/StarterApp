import { supabase } from "../lib/supabase";


export default async function fetchUser() {
    const { data: { user } } = await supabase.auth.getUser()
    console.log("got user", user);

    return user
}