import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Router = express.Router();


//Models
import { UserModel } from "../../database/user";

/*
Route   /signup
Descrip /Signup with email and password
Params  None
Action  Public
Method  Post */

Router.post("/signup", async (req, res) => {
    try {
        //const { email, phoneNumber } = req.body.credentials;

        /*Check whether email or password number exists
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ error: "User already Exists" });
        }*/

        await UserModel.findEmailAndPhone(req.body.credentials);

        /*hashing
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);*/

        //DB
        const newUser = await UserModel.create(req.body.credentials,
            //password : hashedPassword
        );

        //JWT Auth Token
        //const token = jwt.sign({ user: { fullname, email } }, "zomatatDatabases");
        const token = newUser.generateJwtToken();
        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



/*
Route   /signin
Descrip /Signin with email and password
Params  None
Access  Public
Method  Post */

Router.post("/signin", async (req, res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(
            req.body.credentials
        );

        //JWT Auth Token
        const token = user.generateJwtToken();
        return res.status(200).json({ token, status: "Success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



export default Router;