import { Request, Response } from 'express'
import otpUtils from '../../utils/otp-utils'
import hashUtils from '../../utils/hash-utils'
import userModel from '../../Model/user.model'
import tokenUtils from '../../utils/token-utils'
import emailUtils from '../../utils/email-utils'
class AuthController {

    async sendOtpByPhoneRegister(req: Request, res: Response) {
        try {
            const { phone } = req.body
            const otp = await otpUtils.generateOtp();
            const hashOtp = await hashUtils.hashPassword(otp);
            const ttl = 1000 * 60 * 2; // 2 min
            const expires = Date.now() + ttl;
            const data = `${phone}_${hashOtp}_${expires}`;
            console.log(req.body);
            return res.json({
                isSuccess: true,
                data: {
                    otp,
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
    async verifyOtpByPhoneRegister(req: Request, res: Response) {
        try {
            const { otp, sign } = req.body;
            const [phone, hashOtp, expires] = sign.split('_');
            const hasExipred = Date.now() > expires;
            const verifyOtp = hashUtils.verifyPassword(otp, hashOtp);
            if (!verifyOtp || hasExipred) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "otp وارد شده صحیح نمیباشد"
                })
            }
            const user = await userModel.create({
                phone
            });
            const token = await tokenUtils.generateToken({ _id: user._id });
            return res.json({
                isSuccess: false,
                data: {
                    token
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async sendOtpByPhoneLogin(req: Request, res: Response) {
        try {
            const { phone } = req.body;
            const otp = await otpUtils.generateOtp();
            const hashOtp = await hashUtils.hashPassword(otp);
            const ttl = 1000 * 60 * 2; // 2 min
            const expires = Date.now() + ttl;
            const data = `${phone}_${hashOtp}_${expires}`
            return res.json({
                isSuccess: true,
                data: {
                    otp,
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
    async verifyOtpByPhoneLogin(req: Request, res: Response) {
        try {
            const { otp, sign } = req.body;
            const [phone, hashOtp, exired] = sign.split("_");
            const verifyOtp = await hashUtils.verifyPassword(otp, hashOtp);
            const hasExired = Date.now() > exired;
            if (!verifyOtp || hasExired) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "otp صحیح نمیباشد"
                })
            }
            const token = await tokenUtils.generateToken();
            return res.json({
                isSuccess: false,
                data: {
                    token
                }
            })

        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async sendOtpByEmailRegister(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const otp = await otpUtils.generateOtp();
            const hashOtp = await hashUtils.hashPassword(otp);
            const ttl = 1000 * 60 * 2; // 2 min ;
            const expires = Date.now() + ttl;
            const data = `${email}_${hashOtp}_${expires}`
            const infoSender = {
                to: email,
                subject: "ثبت نام",
                html: `
                    <div dir="rtl">
                کاربر گرامی
                <br/>
                کد ثبت نام شما در نماوا
                <br/>
                ${otp}
                <br/>
                در صورتی که این درخواست از جانب شما ارسال نشده است؛ لطفا این ایمیل را نادیده بگیرید
            </div>
                `
            }
            const sendEmail = await emailUtils.sendEmail(infoSender);
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
            console.log(error);
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async verifyOtpByEmailRegister(req: Request, res: Response) {
        try {
            const { otp, sign } = req.body;
            const [email, hashOtp, expired] = sign.split("_");
            const hasExipred = Date.now() > expired;
            console.log(hasExipred);
            console.log(expired);
            const verifyOtp = await hashUtils.verifyPassword(otp, hashOtp);
            if (hasExipred || !verifyOtp) {
                return res.json({
                    isSuccess: false,
                    message: "otp وارد شده صحیح نمیباشد"
                })
            }
            const user = await userModel.create({
                email
            });
            const token = await tokenUtils.generateToken({ _id: user._id });
            return res.json({
                isSuccess: true,
                data: {
                    token
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async sendOtpByEmailLogin(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const otp = await otpUtils.generateOtp();
            const hashOtp = await hashUtils.hashPassword(otp);
            const ttl = 1000 * 60 * 2; // 2 min ;
            const expires = Date.now() + ttl;
            const data = `${email}_${hashOtp}_${expires}`
            const infoSender = {
                to: email,
                subject: "ورود",
                html: `
                    <div dir="rtl">
                کاربر گرامی
                <br/>
                کد ورود  شما در نماوا
                <br/>
                ${otp}
                <br/>
                در صورتی که این درخواست از جانب شما ارسال نشده است؛ لطفا این ایمیل را نادیده بگیرید
            </div>
                `
            }
            const sendEmail = await emailUtils.sendEmail(infoSender);
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
    async veriftOtpByEmailLogin(req: Request, res: Response) {
        try {
            const { otp, sign } = req.body;
            const [email, hashOtp, expired] = sign.split("_");
            const hasExipred = Date.now() > expired;
            const verifyOtp = await hashUtils.verifyPassword(otp, hashOtp);
            if (hasExipred || !verifyOtp) {
                return res.json({
                    isSuccess: false,
                    message: "otp وارد شده صحیح نمیباشد"
                })
            }
            const user = await userModel.findOne({ email });
            const token = await tokenUtils.generateToken({ _id: user._id });
            return res.json({
                isSuccess: true,
                data: {
                    token
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
}
export default new AuthController()