import express from "express";

import { createUser} from "../Controllers/userController.js"; // Assuming you have a userController
import { loginUser } from "../Controllers/userController.js"; // Assuming you have a userController for login

const userRouter = express.Router();


userRouter.post("/", createUser); // Route to create a new user
userRouter.post("/login", loginUser); // Route for user login



export default userRouter;