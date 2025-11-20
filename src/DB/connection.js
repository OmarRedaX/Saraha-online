import mongoose from "mongoose";

const connectDB = async () => {

    await mongoose.connect(process.env.DB_URL)
        .then(res => console.log("MongoDB connected"))
        .catch(err => console.log("Fail to connect to DB",err));
}

export default connectDB;
