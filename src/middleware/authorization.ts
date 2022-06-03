import { Request, Response, NextFunction } from 'express'
import tokenUtils from '../utils/jwt-utils'
import userModel from '../Model/user.model'
import { JwtPayload } from '../types/Jwt.intetrface'
import { RequestCustome } from '../types/requestCustome.interface'
async function Authorization(req: RequestCustome, res: Response, next: NextFunction) {
    try {
        const authHeaders = req?.headers?.authorization;
        if (!authHeaders) {
            return res.status(401).json({
                isSuccess: false,
                message: "unauthorized",
            })
        }
        const token = authHeaders.split(" ")[1];
        const { _id } = await tokenUtils.verifyToken(token) as JwtPayload;
        const user = await userModel.findOne({ _id });
        req.user = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            _id: user._id
        }
        next();
    } catch (error) {
        return res.status(401).json({
            isSuccess: false,
            message: "unauthorized",
        })
    }
}
export default Authorization