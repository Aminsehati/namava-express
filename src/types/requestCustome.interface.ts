import { User } from './User.interface'
import { Request } from 'express'
export interface RequestCustome extends Request {
    user?: User
}