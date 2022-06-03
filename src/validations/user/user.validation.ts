import { body } from 'express-validator'
import userModel from '../../Model/user.model'
class UserValidation {
    updateUserInfo() {
        return [
            body("firstName").notEmpty().withMessage("نام را وارد کنید"),
            body("lastName").notEmpty().withMessage("نام خانوادگی را وارد کنید"),
        ]
    }
    sendOtpAttachEmail() {
        return [
            body('email').isEmail().withMessage("ایمیل وارد شده صحیح نمیباشد").custom(async (data) => {
                const user = await userModel.findOne({ email: data });
                if (user) {
                    throw 'ایمیل وارد شده صحیح نمیباشد'
                }
                return true
            })
        ]
    }
    verifyOtpAttachEmail() {
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
}
export default new UserValidation()