import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request, locals: { getSession } }) => {
    
    const session = await getSession();

    if(session){

        if(session.user.user_metadata.whoareyou === "user"){
            throw redirect(302, "/Talk-With-Us/User");
        }else if(session.user.user_metadata.whoareyou === "admin"){
            throw redirect(302, "/Talk-With-Us/Admin");
        }

    }
};

export const actions: Actions = {
    default: async ({ request, locals:{supabase} }) =>
    {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const {data:{session}, error:err} = await supabase.auth.signInWithPassword({email: email, password: password});
        if(session){
            return fail(200, {msg: "Login success.", session: session});
        }else if(err){
            return fail(402, {msg: err.message, session: null});
        }
    }
};