import { fail, type Actions } from "@sveltejs/kit";
import transporter from "$lib/Helpers/nodeMailer";

const user = import.meta.env.VITE_GOOGLE_EMAIL;
const receiver = import.meta.env.VITE_RECEIVER_EMAIL;

export const actions: Actions = {
    default: async ({request}) =>
    {

        const formData = await request.formData();

        const jobStatus = formData.get("jobStatus") as string;
        const firstName = formData.get("firstName") as string;
        const middleName = formData.get("middleName") as string;
        const lastName = formData.get("lastName") as string;
        const address = formData.get("address") as string;
        const mobileNumber = formData.get("mobileNumber") as string;
        const email = formData.get("email") as string;
        const motive = formData.get("motive") as string;
        const files = formData.get("files") as File;
        const tnc = formData.get("tnc") as string;
        const pp = formData.get("pp") as string;

        const html = `
            <h3> From Annapolis Finance Inc. </h3>

            <small>Classification: Inquire Now </small><br>
            <small><b>Job Status:</b> ${jobStatus}</small><br>
            <small><b>Email:</b> ${email} </small><br>
            <small><b>Full Name:</b> ${lastName}, ${firstName} ${middleName}. </small><br>
            <small><b>Mobile Number:</b> ${mobileNumber} </small><br>
            <small><b>Address:</b> ${address} </small><br>
            <small><b>Motive:</b> ${motive} </small><br>


            <small> Visit <a href="https://annapolis-finance-inc.vercel.app">Annapolis Finance Inc.</a><br>
            <small>Developed by <a href="https://www.youtube.com/@mikeSharesCode">Mike John</a></small>
        `

        if(jobStatus.trim().length > 2){
            if(firstName.trim().length > 1){
                if(middleName.trim().length > 2){
                    if(lastName.trim().length > 1){
                        if(address.trim().length > 3){
                            if(mobileNumber.trim().length > 10){
                                if(email.includes("@") && email.includes(".")){
                                    if(motive.trim().length > 2){
                                        if(files.size){
                                            if(tnc === "on"){
                                                if(pp === "on"){
                                                    if(Buffer.from(await files.arrayBuffer()).toString("utf-8").includes("pdf")){
                                                        const result = await transporter.sendMail({
                                                            from: user,
                                                            to: receiver,
                                                            bcc: "",
                                                            subject: "From Inquire Now",
                                                            text: "Possible Client",
                                                            html: html,
                                                            attachments: [{
                                                                filename: files.name,
                                                                content: Buffer.from(await files.arrayBuffer())
                                                            }]
                                                        })
                                                
                                                        if(result.accepted){
                                                            return fail(200, {msg: "Your data is now on-processing kindly avoid double sending."})
                                                        }else if(result.rejected){
                                                            return fail(402, {msg: "There is a problem sending your data to server."})
                                                        }
                                                    }else{
                                                        return fail(402, {msg: "This file is weird double check it."})
                                                    }
                                                    
                                                }else{
                                                    return fail(402, {msg: "Must agree with Annapolis Finance Inc. privacy policy."})
                                                }
                                            }else{
                                                return fail(402, {msg: "Must agree with Annapolis Finance Inc. terms and condition."})
                                            }
                                        }else{
                                            return fail(402, {msg: "Must upload the application form."})
                                        }
                                       
                                    }else{
                                        return fail(402, {msg: "Must choose your motive."})
                                    }
                                }else{
                                    return fail(402, {msg: "Not valid email."})
                                }
                            }else{
                                return fail(402, {msg: "Not valid mobile number."})
                            }
                        }else{
                            return fail(402, {msg: "Not valid address."})
                        }
                    }else{
                        return fail(402, {msg: "Not valid last name."})
                    }
                }else{
                    return fail(402, {msg: "Not valid middle name."})
                }
            }else{
                return fail(402, {msg: "Not valid first name."})
            }
        }else{
            return fail(402, {msg: "You must choose job status."})
        }
       
    }
};