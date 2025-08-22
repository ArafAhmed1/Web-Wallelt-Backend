const express = require('express');
const {Account} = require('../db');
const { authMiddleware } = require('../middleware');
const router = express.Router();
const zod = require('zod');
const { default: mongoose } = require('mongoose');

const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number()
})


router.get("/balance", authMiddleware, async (req, res)=>{
    try{

        const account = await Account.findOne({userId:req.userId})
        
        res.status(200).json({balance: account.balance})
    } catch(error){
        res.status(500).json({message: "Server error"})
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const { success } = transferBody.safeParse(req.body);
        if (!success) {
            await session.endSession();
            return res.status(400).json({ message: "Invalid input" });
        }

        session.startTransaction();
        const { to, amount } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(400).json({ message: "Invalid account" });
        }

        await Account.updateOne({ userId: account.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: toAccount.userId }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Server error" });
    } finally {
        await session.endSession();
    }
});

module.exports = router;