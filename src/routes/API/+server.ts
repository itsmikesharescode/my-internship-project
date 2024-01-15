import { json, type RequestHandler } from "@sveltejs/kit";



export const POST: RequestHandler = async ({request, locals: { supabase }}) => 
{
    const {logoutReq } = await request.json();

    if(logoutReq === 123456){
        const {error:err} = await supabase.auth.signOut();
        if(!err){
            return json({status: 200, msg: "Logout success."});
        }
    }

    return json({status: 402, msg: "Not valid logout key."});
}