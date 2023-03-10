import express from "express";
import { loginUser, registerUser } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

export default authRouter;
