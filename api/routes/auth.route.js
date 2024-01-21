import express from "express";
import { signup, signin } from "../conrollers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

//crete sign in router api
router.post("/signin", signin);

export default router;
