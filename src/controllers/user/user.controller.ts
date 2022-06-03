import userModel from '../../Model/user.model'
import { Request, Response, NextFunction } from 'express'
import { RequestCustome } from '../../types/requestCustome.interface'
class UserController {
    getUserInfo(req: RequestCustome, res: Response, next: NextFunction) {
        try {

            return res.json({
                isSuccess: true,
                data: {
                    item: {
                        firstName: req.user?.firstName,
                        lastName: req.user?.lastName,
                        phone: req.user?.phone
                    }
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
    async updateUserInfo(req: RequestCustome, res: Response) {
        try {
            const { firstName, lastName } = req.body;
            const user = req.user
            userModel.findOneAndUpdate({ _id: user?._id }, {
                firstName,
                lastName
            }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "موردی یافت نشد"
                    })
                }
                return res.json({
                    isSuccess: true,
                    message: "با موفقیت ثبت شد"
                })
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی رخ داده است"
            })
        }
    }
}
export default new UserController()