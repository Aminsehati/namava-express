import express from 'express';
const router = express.Router();
import userController from '../../controllers/user/user.controller'
import AttachEmailController from '../../controllers/AttachEmail/AttachEmail.controller'
import authorization from '../../middleware/authorization'
import userValidation from '../../validations/user/user.validation'
import checkValidations from '../../middleware/checkValidations'
router.get("/", authorization, userController.getUserInfo);
router.put("/", authorization, userValidation.updateUserInfo(), checkValidations, userController.updateUserInfo);
router.post("/attach-email/request", authorization, userValidation.sendOtpAttachEmail(), checkValidations, AttachEmailController.sendOtpAttachEmail);
router.post("/attach-email/verify", authorization, userValidation.verifyOtpAttachEmail(), checkValidations, AttachEmailController.verifyOtpAttachEmail);
export default router