import express from 'express'
const router = express.Router();
import AuthController from '../../controllers/Auth/Auth.controller'
import AuthValidations from '../../validations/Auth/Auth.validations'
import checkValidations from '../../middleware/checkValidations'

router.post("/Register/by-phone/send-otp", AuthValidations.sendOtpByPhoneRigster(), checkValidations, AuthController.sendOtpByPhoneRegister);
router.post("/Register/by-phone/verify-otp", AuthValidations.verifyOtpByPhoneRegister(), checkValidations, AuthController.verifyOtpByPhoneRegister);
router.post("/Register/by-email/send-otp", AuthValidations.sendOtpEmailRigster(), checkValidations, AuthController.sendOtpByEmailRegister);
router.post("/Register/by-email/verify-otp",AuthValidations.verifyOtpByEmailRegister(),checkValidations ,AuthController.verifyOtpByEmailRegister );
router.post("/login/by-phone/send-otp", AuthValidations.sendOtpByPhoneLogin(), checkValidations, AuthController.sendOtpByPhoneLogin);
router.post("/login/by-phone/verify-otp", AuthValidations.verifyOtpByPhoneLogin(), checkValidations, AuthController.verifyOtpByPhoneLogin);
router.post("/login/by-email/send-otp",AuthValidations.sendOtpByEmailLogin(),checkValidations ,AuthController.sendOtpByEmailLogin );
router.post("/login/by-email/verify-otp",AuthValidations.veriftOtpByEmailLogin(),checkValidations ,AuthController.veriftOtpByEmailLogin );
export default router