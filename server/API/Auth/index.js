import express from "ecpress";
import { UserModel } from "../../database/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Router = express.Router();

/*
Route   /signup
Descrip Signp with email and password 
Params  None
Access  Public
Method  Post*/

Router.post("/signup", async (req, res) => {
    try {
        const { email, password, fullname, phoneNumber } = req.body.credentials;

        //Check whether email or password number exists
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ error: "User already Exists" });
        }

        //hashing and salting
        const bcryptSalt = await bcrypt.genSalt(8);
        const hasedPassword = await bcrypt.hash(password, bcryptSalt);



        //JWT Auth Token
        const token = await jwt.sign({ user: { fullname, email } }, "ZomatoApp");
        return res.status(200).json((token));

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default Router;