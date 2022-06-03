import { Request, Response, NextFunction } from 'express'
import subscriptionsModel from '../../Model/subscriptions.model'
class SubscriptionsController {
    async createSubscription(req: Request, res: Response) {
        try {
            const { name, productCode, recurringDuration, amount, discountAmount } = req.body;
            await subscriptionsModel.create({
                name,
                productCode,
                recurringDuration,
                amount,
                discountAmount
            })
            return res.json({
                isSuccess: true,
                message: "با موفقیت ثبت شد"
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async getSubscriptions(req: Request, res: Response) {
        try {
            const items = await subscriptionsModel.find({}, { __v: 0 });
            return res.json({
                isSuccess: true,
                items
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async getSubscription(req: Request, res: Response) {
        try {
            const { productCode } = req.params;
            subscriptionsModel.findOne({ productCode }, { __v: 0 }, (err: any, response: any) => {
                if (err) {
                    return res.status(400).json({
                        isSuccess: false,
                        message: "آیتمی یافت نشد"
                    })
                }
                return res.json({
                    isSuccess: true,
                    data: {
                        item: response
                    }
                })
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async deleteSubscription(req: Request, res: Response) {
        try {
            const { id } = req.params;
            subscriptionsModel.findOneAndDelete({ _id: id }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "آیتمی یافت نشد"
                    })
                }
                return res.json({
                    isSuccess: true,
                    message: "با موفقیت حذف شد"
                })
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async updateSubscription(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, recurringDuration, amount, discountAmount } = req.body;
            subscriptionsModel.findOneAndUpdate({ _id: id }, { name, recurringDuration, amount, discountAmount }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "آیتمی یافت نشد"
                    })
                }
                return res.json({
                    isSuccess: true,
                    message: "با موفقیت ثبت شد"
                })
            });
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
}
export default new SubscriptionsController()