
import nodemailer from 'nodemailer'
import { SMTPClient } from 'emailjs';


var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);


export const sendOtpMessage = (email) => {
    return new Promise(async(resolve, reject) => {
        console.log(otp);

        const client = new SMTPClient({
            user: process.env.EMAIL,
            password: process.env.PASSWORD,
            host: 'smtp.gmail.com',
            ssl: true,
        });

        try {
            const message = await client.sendAsync({
                text: ` Your OTP from makeframes is  : ${otp} `,
                from: 'makeframes2023@gmail.com',
                to: `${email}`,
                // cc: 'else <else@your-email.com>',
                subject: 'OTP VERIFICATION',
            });
            console.log(message);
        } catch (err) {
            console.error(err);
        }
    })

}

export const verifyOtp = (clientOtp) => {

    return new Promise((resolve, reject) => {

        if (Number(clientOtp) === otp) {
            resolve({ otp: true })
        } else {
            resolve({ otp: false })
        }
    })
}
