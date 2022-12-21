import mongoose from "mongoose";

const CONNECTION_URL =
  "mongodb+srv://memories:memories123@cluster0.iz6rxby.mongodb.net/?retryWrites=true&w=majority";
export const PORT = process.env.PORT || 5000;

export const connectDB = async () => {
  mongoose.set("strictQuery", false);
  // mongoose.set("useFindAndModify", false);
  const conn = await mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Mongodb connected ${conn.connection.host}`);

};

