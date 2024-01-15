import type { Session } from "@supabase/supabase-js";
import type { PageServerLoad } from "./$types";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { Repos } from "$lib/types";


export const load: PageServerLoad = async ({locals:{ getSession, supabase }}) => {
    
    if(await getSession()){
        const session = await getSession() as Session;
        if(session.user.user_metadata.whoareyou != "admin"){
            throw redirect(302, "/Loan/Repossessed-Units?From-Admin");
        }

        const {data, error:err} = await supabase.from("repo_tb").select("*");
        if(data){
            
            return {status: 200, msg: "has data", data: data as Repos[]};
        }else if(err){
            return {status: 402, msg: err.message, data: null}
        }
    }else{
        throw redirect(302, "/Loan/Repossessed-Units?From-Admin");
    }

};



export const actions: Actions = {
    default: async ({request, locals:{ supabase }}) =>
    {
        const formData = await request.formData();
        const search = formData.get("search") as string;
        
        if(search.trim().length > 0){
            const {data, error:err} = await supabase.from("repo_tb").select().ilike("unit_name", `%${search}%`);
            if(data){

                return fail(200, {msg: "has data", data: data as Repos[]})
            }else if(err){
                
                return fail(402, {msg: err.message, data: null});
            }
        }else{
            return fail(402, {msg: "Your search input must not be empty", data: null})
        }

    },

};