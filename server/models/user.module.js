import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  id: String
});

const UserModule = mongoose.model("UserModule", userSchema);
export default UserModule;
