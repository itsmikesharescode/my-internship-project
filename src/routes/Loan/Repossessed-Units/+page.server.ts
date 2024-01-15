import type { Actions, PageServerLoad } from "./$types";
import type { Repos } from "$lib/types";
import { fail } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ locals:{ supabase } }) => {
    
    const {data, error:err} = await supabase.from("repo_tb").select("*");
    if(data){
        
        return {status: 200, msg: "has data", data: data as Repos[]};
    }else if(err){
        return {status: 402, msg: err.message, data: null}
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


    }
};