import nodemailer from "nodemailer";


export const sendEmail = async (to , subject , html)=>{

const transporter = nodemailer.createTransport({
 service:"gmail",
  auth: {
    user: process.env.senderEmail,
    pass: process.env.senderPassword,
  },
});

 const info = await transporter.sendMail({
    from: `"SmartPhone Store" ${process.env.senderPassword}`,
    to,
    subject,
    html
  });
}