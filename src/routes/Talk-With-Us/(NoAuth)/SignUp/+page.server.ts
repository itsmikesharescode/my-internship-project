import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({request, locals: { supabase, getSession }}) => {
    
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
    default: async ({request, locals: { supabase }}) => {

        const formData = await request.formData();
        const email = formData.get("email") as string;
        const firstName = formData.get("firstName") as string;
        const middleName = formData.get("middleName") as string;
        const lastName = formData.get("lastName") as string;
        const address = formData.get("address") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const tnc = formData.get("tnc") as string;
        const pp = formData.get("pp") as string;

        if(firstName.trim().length > 2){
            if(middleName.trim().length > 2){
                if(lastName.trim().length > 2){
                    if(address.trim().length > 2){
                        if(password === confirmPassword){
                            if(tnc === "on"){
                                if(pp === "on"){
                                    //Session here will be null intially for email confimation flow to make it !null must confirm the email link
                                    const {data: { session, user }, error:err} = await supabase.auth.signUp({
                                        email, password, options : {
                                            data: { fullname: `${lastName}, ${firstName} ${middleName}`, address, whoareyou: "user"}
                                        }
                                    });

                                    if(user){
                                        
                                        return fail(200, { msg: `Check your email ${email} to finalize your registration.` });
                                    }else if(err){

                                        return fail(402, { msg: err.message });
                                    }

                                }else{
                                    return fail(402, {msg: "Must agree with privacy policy."});
                                }
                            }else{
                                return fail(402, {msg: "Must agree with terms and conditions."});
                            }
                        }else{
                            return fail(402, {msg: "Password not same."});
                        }
                    }else{
                        return fail(402, {msg: "Not valid address."});
                    }
                }else{
                    return fail(402, {msg: "Not valid last name."});
                }
            }else{
                return fail(402, {msg: "Not valid middle name."});
            }
        }else{
            return fail(402, {msg: "Not valid first name."});
        }
    }
};