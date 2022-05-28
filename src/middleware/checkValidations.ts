import { Request, Response, NextFunction } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator'
import _ from 'lodash'
function checkValidations(req: Request, res: Response, next: NextFunction) {
    const result: Result<ValidationError> = validationResult(req);
    let errors = result.array();
    if (errors && errors.length) {
        let messages = _.chain(errors)
            .keyBy('param')
            .mapValues('msg')
            .value();
        return res.status(400).json({
            isSuccess: false,
            messages: messages
        })
    }
    next();
}
export default checkValidations