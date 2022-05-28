import jsonwebtoken, { Secret } from 'jsonwebtoken'
class TokenUtils {
    generateToken(payload = {}, expired = "2h") {
        const secret = process.env.JWT_SECRET || "secret";
        console.log('secret',secret);
        return jsonwebtoken.sign(payload, secret, {
            expiresIn: expired
        });
    }
}
export default new TokenUtils()