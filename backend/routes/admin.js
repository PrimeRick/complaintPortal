const express = require("express");
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { Admin, Complaint, User } = require('../db');
const { authAdmin } = require('../middleware/auth')

const router = express.Router();

const signinSchema = zod.object({
    cpf: zod.number(),
    password: zod.string()
})

router.post('/signin', async(req,res)=>{
    const { success } = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg: 'invalid input'
        })
    }
    const user1 = await User.findOne({
        cpf: req.body.cpf,
        password: req.body.password,
    })
    if(!user1){
        return res.status(411).json({
            msg: "incorrect cpf or password"
        })
    }
    const user = await Admin.findOne({
        cpf: req.body.cpf,
    })
    const cpf = req.body.cpf
    const dept = user.dept
    if(!user){
        return res.status(411).json({
            msg: 'No such admin found'
        })
    }
    else{
        const token = jwt.sign({
            cpf: cpf,
            dept: dept
        }, JWT_SECRET, {
            expiresIn: 14400        // 4hrs session
        })

        return res.json({
            msg: 'valid user',
            token: `Bearer ${token}`
        })
    } 
})

router.get('/dashboard', authAdmin, async(req, res)=>{
    const cpf = req.cpf;
    console.log(cpf)
    try{
        const complaints = await Complaint.find({
            dept: req.dept
        })
        res.json({
            complaints
        })
    }
    catch(err){
        res.status(500).json({
            msg: `${err}`
        })
    }
})

router.put('/Pending', authAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
            dept: req.dept
        }, {
            state: "Pending"
        })
        if(!complaint){
            return res.status(411).json({
                msg: 'unauthorized access'
            })
        }
    }
    catch{
        return res.status(411).json({
            msg: 'some error occured'
        })
    }
    res.json({
        msg: 'status updated successfully',
        state: 'Pending'
    })
})
router.put('/Processing', authAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
            dept: req.dept
        }, {
            state: "Processing"
        })
        if(!complaint){
            return res.status(411).json({
                msg: 'unauthorized access'
            })
        }
    }
    catch{
        return res.status(411).json({
            msg: 'some error occured'
        })
    }
    res.json({
        msg: 'status updated successfully',
        state: 'Processing'
    })
})

router.put('/Resolved', authAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
            dept: req.dept
        }, {
            state: "Resolved"
        })
        if(!complaint){
            return res.status(411).json({
                msg: 'unauthorised access'
            })
        }
    }
    catch{
        return res.status(411).json({
            msg: 'some error occured'
        })
    }
    res.json({
        msg: 'status updated successfully',
        state: 'Resolved'
    })
})
router.put('/Unresolved', authAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
            dept: req.dept
        }, {
            state: "Unresolved"
        })
        if(!complaint){
            return res.status(411).json({
                msg: 'unauthorised access'
            })
        }
    }
    catch{
        return res.status(411).json({
            msg: 'some error occured'
        })
    }
    res.json({
        msg: 'status updated successfully',
        state: 'Unresolved'
    })
})


module.exports = router