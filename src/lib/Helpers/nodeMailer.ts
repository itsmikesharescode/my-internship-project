import nodemailer from "nodemailer";

const user = import.meta.env.VITE_GOOGLE_EMAIL;
const pass = import.meta.env.VITE_SMTP_PASS;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: pass,
    }
})

transporter.verify( (error, message) => {
    if(error){
        console.log(error);
    }else{
        console.log("All is set ready to server! subscrive YT: @mikeSharesCode");
    }
})

export default transporter;