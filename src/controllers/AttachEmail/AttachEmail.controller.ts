import { Request, Response } from 'express'
import EmailUtils from '../../utils/email-utils'
import HashUtils from '../../utils/hash-utils'
import OtpUtils from '../../utils/otp-utils'
import { RequestCustome } from '../../types/requestCustome.interface'
import userModel from '../../Model/user.model'
class AttachEmailController {
    async sendOtpAttachEmail(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const otp = await OtpUtils.generateOtp();
            const hashOtp = await HashUtils.hashPassword(otp);
            const ttl = 1000 * 60 * 2; // 2 min ;
            const expires = Date.now() + ttl;
            const data = `${email}_${hashOtp}_${expires}`;
            const infoSender = {
                to: email,
                subject: "اضافه کردن ایمیل به حساب کاربری نماوا",
                html: `
                    <div dir="rtl">
                کاربر گرامی
                <br/>
                این ایمیل به منظور درخواست اضافه شدن آدرس ایمیل به حساب کاربری شما در نماوا ارسال شده است. به منظور تکمیل اطلاعات خود لطفا کد زیر را در نماوا ثبت کنید:
                <br/>
                ${otp}
                <br/>
                در صورتی که این درخواست از جانب شما ارسال نشده است؛ لطفا این ایمیل را نادیده بگیرید
            </div>
                `
            }
            const sendEmail = await EmailUtils.sendEmail(infoSender);
            if (!sendEmail.messageId) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "ارسال نشد"
                })
            }
            return res.json({
                isSuccess: true,
                data: {
                    sign: data
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async verifyOtpAttachEmail(req: RequestCustome, res: Response) {
        try {
            const { otp, sign } = req.body;
            const [email, hashOtp, expired] = sign.split("_");
            const hasExpired = Date.now() > expired;
            const verifyOtp = await HashUtils.verifyPassword(otp, hashOtp);
            if (!verifyOtp || hasExpired) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "رمز یکبار مصرف معتبر نیست "
                })
            }
            await userModel.findOneAndUpdate({ _id: req.user?._id }, {
                email
            })
            return res.json({
                isSuccess: true,
                message: "با موفقیت تایید شد"
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
}
export default new AttachEmailController()