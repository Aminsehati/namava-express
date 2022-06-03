import mongoose from 'mongoose'
const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    recurringDuration: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    discountAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
export default mongoose.model("subscription", subscriptionSchema)