import type { Session } from "@supabase/supabase-js";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";


export const load: PageServerLoad = async ({request, locals:{ supabase, getSession } }) => {
    if(await getSession()){
        const session = await getSession() as Session;

        if(session.user.user_metadata.whoareyou === "user"){
            throw redirect(302, "/Talk-With-Us/User");
        }

    }else{
        throw redirect(302, "/Talk-With-Us/Login?From-Admin");
    }
};