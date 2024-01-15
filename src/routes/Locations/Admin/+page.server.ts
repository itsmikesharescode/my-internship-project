import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Session } from "@supabase/supabase-js";
import type { Branches } from "$lib/types";


export const load: PageServerLoad = async ({ locals:{ getSession, supabase } }) => {
    
    const session: Session | null = await getSession();

    if(session){
        if(session.user.user_metadata.whoareyou === "user"){

            throw redirect(302, "/Locations?From-Admin-User");
        }else{
            const {data, error:err} = await supabase.from("branch_tb").select("*");
            if(data){
                return {status: 200, msg: "has connected", data: data as Branches[]}
            }else if(err){
                return {status: 402, msg: err.message, data: null}
            }
        }
    

    }else{
        
        throw redirect(302, "/Locations?From-Admin")
    }

};