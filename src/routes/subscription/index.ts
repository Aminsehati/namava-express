import express from 'express';
const router = express.Router();
import SubscriptionsController from '../../controllers/Subscriptions/Subscriptions.controller'
import SubscriptionValidation from '../../validations/subscription/subscription.validations'
import checkValidations from '../../middleware/checkValidations'
import authorization from '../../middleware/authorization'


router.post("/", SubscriptionValidation.createSubscription(), checkValidations, SubscriptionsController.createSubscription);
router.get("/", authorization, SubscriptionsController.getSubscriptions);
router.get("/:productCode", authorization, SubscriptionsController.getSubscription);
router.delete("/:id", authorization, SubscriptionsController.deleteSubscription);
router.put("/:id", authorization, SubscriptionValidation.updateSubscription(), checkValidations, SubscriptionsController.updateSubscription)
export default router