import nodemailer from 'nodemailer';
class EmailUtils {
    async sendEmail(info:any) {
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aminsehati70@gmail.com',
                pass: '987789amin'
            }
        });
        const mailOptions = {
            form:"aminsehati70@gmail.com",
            to:info.to ,
            subject:info.subject ,
            html:info.html
        }
        return await transporter.sendMail(mailOptions)
    }
}
export default new EmailUtils