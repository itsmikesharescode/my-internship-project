import type { Branches } from "$lib/types";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({locals:{supabase}}) => {
    
    const {data, error:err} = await supabase.from("branch_tb").select("*");
    if(data){
        return {status: 200, msg: "has connected", data: data as Branches[]}
    }else if(err){
        return {status: 402, msg: err.message, data: null}
    }
};