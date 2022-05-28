import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const url = `mongodb+srv://root:I8kDE42HTgea8ANp@namava.tcbru.mongodb.net/?retryWrites=true&w=majority`
function connectDataBase() {
    mongoose.connect(url);
    mongoose.connection.on("error", (err) => {
        console.log("err", err);
    });
    mongoose.connection.on("connected", (err, res) => {
        console.log("mongoose is connected");
    });
}
export default connectDataBase