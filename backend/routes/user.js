const express = require("express");
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User, Admin, SuperAdmin } = require('../db');
const { authUser } = require('../middleware/auth');
const { Complaint } = require("../db");

const router = express.Router();

const signupSchema = zod.object({
    cpf: zod.number(),
    password: zod.string().min(8),
})

router.post('/signup', async(req, res)=>{
    const { success } = signupSchema.safeParse(req.body);
    
    if(!success){
        console.log(req.body);
        return res.status(411).json({
            msg: 'invalid inputs'
        })
    }
    const existingUser = await User.findOne({
        cpf: req.body.cpf
    })
    
    if(existingUser){
        return res.status(411).json({
            msg: 'cpf already exists'
        })
    }
    await User.create({
        cpf: req.body.cpf,
        password: req.body.password,
    })
    const cpf = req.body.cpf;
    
    const token = jwt.sign({
        cpf: cpf
    }, JWT_SECRET);
    
    res.json({
        msg: 'user created successfully',
        token: `Bearer ${token}`
    })
})

const signinSchema = zod.object({
    cpf: zod.number(),
    password: zod.string().min(8),
})

router.post('/who', async(req, res)=>{
    const { success } = signinSchema.safeParse(req.body);
    if(!success){
        console.log(req.body);
        return res.status(411).json({
            msg: 'invalid inputs'
        })
    }
    const user = await User.findOne({
        cpf: req.body.cpf,
        password: req.body.password
    })

    if(!user){
        return res.status(411).json({
            msg: 'No such user found'
        })
    }
    const admin = await Admin.findOne({
        cpf: req.body.cpf
    })
    if(admin){
        return res.json({
            who: 'admin'
        })
    }

    const superAdmin = await SuperAdmin.findOne({
        cpf: req.body.cpf
    })
    console.log(req.body.cpf + "heyyyyyy")
    if(superAdmin){
        return res.json({
            who: 'superAdmin'
        })
    }
    console.log(req.body.cpf + "heyyyyyy2")
    return res.json({
        who: 'user'
    })

})
router.post('/signin', async(req,res)=>{
    const { success } = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg: 'invalid inputs',
            cpf: req.body.cpf,
            type: `${typeof(req.body.cpf)}`,
            password: req.body.password
        })
    }
    const user = await User.findOne({
        cpf: req.body.cpf,
        password: req.body.password
    })
    const cpf = req.body.cpf
    if(!user){
        return res.status(411).json({
            msg: 'No such user found'
        })
    }
    else{
        const token = jwt.sign({
            cpf: cpf
        }, JWT_SECRET, {
            expiresIn: 14400        // 4hrs session
        })
        
        return res.json({
            msg: 'valid user',
            token: `Bearer ${token}` 
        })
    } 
})

router.get('/dashboard', authUser ,async(req,res)=>{
    const cpf = req.cpf
    console.log(cpf);
    const complaints = await Complaint.find({
        cpf: cpf
    })
    res.json({
        complaints
    })
})

const complaintBody = zod.object({
    dept: zod.string(),
    phase: zod.string(),
    qtrNo: zod.string(),
    description: zod.string()
})

router.post('/complaint', authUser, async(req,res)=>{
    const { success } = complaintBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg: 'invalid inputs'
        })
    }
    try{
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        await Complaint.create({
            cpf: req.cpf,
            dept: req.body.dept,
            phase: req.body.phase,
            qtrNo: req.body.qtrNo,
            description: req.body.description,
            state: "Pending",
            createdAt: formattedDate
        })
        res.json({
            msg: 'complaint lodged successfully'
        })
    }
    catch(err){
        res.status(411).json({
            msg: `${err}`
        })
    }
})

module.exports = router