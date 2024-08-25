const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        throw new Error(err);
    }
}

module.exports = connectDB;