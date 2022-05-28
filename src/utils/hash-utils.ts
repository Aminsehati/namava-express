import bcrypt from 'bcrypt'
class hashUtils {
    hashPassword(password:string){
        return bcrypt.hash(password,10);
    }
    verifyPassword(password:string , hashPassword:string){
        return bcrypt.compare(password,hashPassword);
    }
}
export default new hashUtils()