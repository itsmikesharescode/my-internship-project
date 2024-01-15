import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals:{supabase}, url }) => {

    const {data:{session}, error:err} = await supabase.auth.verifyOtp({token_hash: url.search.slice(1), type: "email"});
    if(session){
        
    }else{
        throw redirect(302, "/Talk-With-Us/Login?No-Session");
    }

};


export const actions: Actions = {
    default: async ({request, locals:{supabase}, cookies }) =>
    {
        const formData = await request.formData();

        const newPws = formData.get("newPws") as string;
        const confirmNewPws = formData.get("confirmNewPws") as string;

        if(newPws.trim().length > 1){
            if(newPws === confirmNewPws){

                const {data:{user}, error:err} = await supabase.auth.updateUser({password: newPws});
                if(user){
                    
                    const {error:inErr} = await supabase.auth.signOut();

                    if(inErr){
                        return fail(402, {msg: inErr.message});
                    }else{
                        return fail(200, {msg: "Password updated."});
                    }
                }else if(err){

                    return fail(402, {msg: err.message});
                }

            }else{

                return fail(402, {msg: "Password are not same."});
            }
        }else{

            return fail(402, {msg: "New password must not be empty."});
        }
    }
};