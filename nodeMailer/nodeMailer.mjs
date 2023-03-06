
import nodemailer from 'nodemailer'


var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);


export const sendOtpMessage = (email) => {
    console.log(otp,'otp');
    return new Promise((resolve, reject) => {

        let mailOptions = {
            to: email,
            subject: 'otp for makeframe Login',
            html: `<h2> Your OTP for registration is  : ${otp} </h2>`
        }


        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            } 
        })

        transporter.sendMail(mailOptions).then((res) => {
            resolve({ messaged: true })
            console.log("Message sent: %s", res.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(res));
            return ({ messaged: true })

        }).catch(err => {

            resolve({ messaged: false })
            console.log(err);
            console.log('kkkk');
            return ({ messaged: false })
        })


    })

}

export const verifyOtp=(clientOtp)=>{

    return new Promise((resolve, reject)=>{
        console.log(Number(clientOtp));
        console.log(otp);
        if(Number(clientOtp) === otp){
            resolve({otp:true})
        }else{
            resolve({otp:false})
        }
    })
}
