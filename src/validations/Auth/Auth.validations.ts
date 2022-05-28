import { body } from 'express-validator'
import userModel from '../../Model/user.model'
class AuthValidations {
    sendOtpByPhoneRigster() {
        return [
            body("phone").isMobilePhone('fa-IR').withMessage("شماره وارد شده صحیح نمیباشد").custom(async data => {
                const user = await userModel.findOne({ phone: data });
                if (user) {
                    throw "شماره وارد شده قبلا ثبت شده است"
                }
                return true
            })
        ]
    }
    verifyOtpByPhoneRegister() {
        return [
            body("otp").notEmpty().withMessage("otp را وارد کنید").isString().withMessage("otp را صحیح وارد کنید"),
            body("sign").notEmpty().withMessage("sign را وارد کنید").isString().withMessage("sign را صحیح وارد کنید").custom(async data => {
                const [phone] = data.split("_");
                const user = await userModel.findOne({ phone });
                if (user) {
                    throw "شماره قبلا ثبت شده است"
                }
                return data
            })
        ]
    }
    sendOtpByPhoneLogin() {
        return [
            body("phone").isMobilePhone('fa-IR').withMessage("شماره وارد شده صحیح نمیباشد").custom(async data => {
                const user = await userModel.findOne({ phone: data });
                if (!user) {
                    throw 'شماره وارد شده صحیح نمی باشد'
                }
                return true
            })
        ]
    }
    verifyOtpByPhoneLogin() {
        return [
            body("otp").notEmpty().withMessage("otp را وارد کنید").isString().withMessage("otp را صحیح وارد کنید"),
            body("sign").notEmpty().withMessage("sign را وارد کنید").isString().withMessage("sign را صحیح وارد کنید").custom(async (data) => {
                const [phone] = data.split("_");
                const user = await userModel.findOne({ phone })
                if (!user) {
                    throw 'شماره وارد شده صحیح نمباشد'
                }
                return true
            })
        ]
    }
    sendOtpEmailRigster() {
        return [
            body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمیباشد").custom(async data => {
                const user = await userModel.findOne({ email: data });
                if (user) {
                    throw "ایمیل قبلا ثبت شده است"
                }
                return true
            })
        ]
    }
    verifyOtpByEmailRegister() {
        return [
            body("otp").notEmpty().withMessage("otp را وارد کنید").isString().withMessage("otp را صحیح وارد کنید"),
            body("sign").notEmpty().withMessage("sign را وارد کنید").isString().withMessage("sign را صحیح وارد کنید").custom(async (data) => {
                const [email] = data.split("_");
                const user = await userModel.findOne({ email });
                if (user) {
                    throw 'ایمیل وارد شده صحیح نمیباشد'
                }
                return true
            })
        ]
    }
    sendOtpByEmailLogin() {
        return [
            body("email").isEmail().custom(async (data) => {
                const user = await userModel.findOne({ email: data });
                if (!user) {
                    throw 'ایمیل وارد شده صحیح نمیباشد'
                }
                return true
            })
        ]
    }
    veriftOtpByEmailLogin(){
        return [
            body("otp").notEmpty().withMessage("otp را وارد کنید").isString().withMessage("otp را صحیح وارد کنید"),
            body("sign").notEmpty().withMessage("sign را وارد کنید").isString().withMessage("sign را صحیح وارد کنید").custom(async (data) => {
                const [email] = data.split("_");
                const user = await userModel.findOne({ email });
                if (!user) {
                    throw 'ایمیل وارد شده صحیح نمیباشد'
                }
                return true
            })
        ]
    }
}
export default new AuthValidations()