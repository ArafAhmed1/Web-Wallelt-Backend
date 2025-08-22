const express = require("express");
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const zod = require("zod");
const router = express.Router();
const {authMiddleware} = require('../middleware')

const signupBody = zod.object({
    username: zod.email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinBody = zod.object({
    username: zod.email(),
    password: zod.string()
})

const updateBody = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})


router.put("/", authMiddleware, async(req, res)=>{
    try {
        const {success} = updateBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({message: "Error while updating information"})
        }
        await User.updateOne({_id:req.userId}, req.body)
        res.status(200).json({message: "Updated successfully"})
    } catch (error){
        return res.status(411).json({message: "Error while updating information"})

    }
})


router.post("/signup", async(req, res)=>{
    try{
        const {success} = signupBody.safeParse(req.body)
        if (!(success)){
            return res.status(411).json({ message: "Email already taken / Incorrect inputs" });
        }
        const {username, password, firstName, lastName} = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(411).json({ message: "Email already taken / Incorrect inputs" });
        }
        const user = await User.create({
            username,
            password,
            firstName,
            lastName
        });
        await Account.create({
            userId: user._id,
            balance: Math.round(Math.random()*(10000-1)+1)
        })
        // const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(201).json({
            message: "User Created Successfully", 
            // token 
        });
    }
    catch(error){
        return res.status(500).json({message:"Server error"})
    }
})

router.post("/signin", async(req, res)=>{
    try{
        const {success} = signinBody.safeParse(req.body)
        if(!success){
            return res.status(400).json({message: "Error while logging in"})
        }
        const {username, password} = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(411).json({ message: "Error while logging in" });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json({ 
            message: "Logged in successfully",
            token 
        });
    }
    catch(error){
        res.status(500).json({message: "Server error"})
    }
})

router.get("/bulk", authMiddleware, async(req, res)=>{
    try{
        const filter = req.query.filter||"";
        const users = await User.find({
            _id: { $ne: req.userId },
            $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } }
            ]
        });
        res.status(200).json({users: users.map(user=>({
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
        }))

        })
    } catch(error){
        return res.status(500).json({message: "Server error"})
    }
})


module.exports = router;