import mongoose from 'mongoose'
const otpSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    role: {
        type: Array,
        default: ["USER"]
    }
}, {
    timestamps: true
})
export default mongoose.model("user", otpSchema);