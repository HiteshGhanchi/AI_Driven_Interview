import mongoose from "mongoose"

const connectDb = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }
    catch(err){
        console.log(err);
    }
}

export default connectDb