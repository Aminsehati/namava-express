import crypto from 'crypto'
class OtpUtils {
    generateOtp(): string {
        const otp = crypto.randomInt(1000, 9999);
        return String(otp)
    }
}
export default new OtpUtils() 