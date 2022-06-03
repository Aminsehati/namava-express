import { body } from 'express-validator'
class subscriptionValidations {
    createSubscription() {
        return [
            body("name").notEmpty().withMessage("name را وارد کنید"),
            body("productCode").notEmpty().withMessage("productCode را وارد کنید"),
            body("recurringDuration").notEmpty().withMessage("recurringDuration را وارد کنید"),
            body("amount").notEmpty().withMessage("amount را وارد کنید"),
            body("discountAmount").notEmpty().withMessage("amount را وارد کنید"),
        ]
    }
    updateSubscription(){
        return [
            body("name").notEmpty().withMessage("name را وارد کنید"),
            body("productCode").notEmpty().withMessage("productCode را وارد کنید"),
            body("recurringDuration").notEmpty().withMessage("recurringDuration را وارد کنید"),
            body("amount").notEmpty().withMessage("amount را وارد کنید"),
            body("discountAmount").notEmpty().withMessage("amount را وارد کنید"),
        ]
    }
}
export default new subscriptionValidations();