import { Router } from "express";
import { UserController } from "controller/UserController";
const userRouter = Router();
userRouter.post("/register",UserController.register)
userRouter.post("/confirmRegister",UserController.confirmRegister)
userRouter.post("/login",UserController.login)
userRouter.get("/yourInfo",UserController.yourProfile)
export default userRouter;