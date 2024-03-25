require("dotenv").config();


//const express = require("express");
import express from "express";
import cors from "cors";
import helmet from "helmet";
const bodyparser = require('body-parser')

//import Auth
import Auth from "./API/Auth";

//Database Connection
import ConnectDB from "./database/connection";

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());

// Body-parser middleware
zomato.use(bodyparser.urlencoded({ extended: true }))
zomato.use(bodyparser.json())

//for application routes
//localhost:4000/auth/signup
zomato.use("/auth", Auth);

zomato.get("/", (req, res) => res.json({ message: "SetUp Success Yay!!" }));

zomato.listen(4000, () =>
    ConnectDB().then(() => console.log("Server is up and running"))
        .catch(() => console.log("DB connection failed")));