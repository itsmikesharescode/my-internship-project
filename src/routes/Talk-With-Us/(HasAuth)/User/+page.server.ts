import type { Session } from "@supabase/supabase-js";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";


export const load: PageServerLoad = async ({request, locals:{ supabase, getSession } }) => {
    if(await getSession()){
        const session = await getSession() as Session;

        if(session.user.user_metadata.whoareyou === "admin"){
            throw redirect(302, "/Talk-With-Us/Admin");
        }

        const {data, error} = await supabase.from("chats_tb").select("*").eq("origin_uid", session.user.id);
        if(data){
            return {status: 200, msg: "connected", data: data};
        }else if(error){
            return {status: 402, msg: error.message, data: null};
        }
        
    }else{
        throw redirect(302, "/Talk-With-Us/Login?From-User");
    }
};