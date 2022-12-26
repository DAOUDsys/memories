import mongoose from "mongoose";


export const PORT = process.env.PORT || 5000;

export const connectDB = async () => {
  mongoose.set("strictQuery", false);
  // mongoose.set("useFindAndModify", false);
  const conn = await mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Mongodb connected ${conn.connection.host}`);

};

