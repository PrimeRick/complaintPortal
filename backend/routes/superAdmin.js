const express = require('express')
const zod = require('zod')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { Admin, Complaint, User, SuperAdmin } = require('../db');
const { authSuperAdmin } = require('../middleware/auth');

const router = express.Router()

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
    const user = await SuperAdmin.findOne({
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


const adminSchema = zod.object({
    cpf: zod.number(),
    dept: zod.string()
})

router.post('/createAdmin', authSuperAdmin, async(req,res)=>{
    const { success } = adminSchema.safeParse(req.body);

    if(!success){
        console.log(req.body);
        return res.status(411).json({
            msg: 'invalid inputs',
            cpf: typeof(req.body.cpf),
            dept: typeof(req.body.dept)
        })
    }
    const existingAdmin = await Admin.findOne({
        cpf: req.body.cpf
    })
    
    if(existingAdmin || req.body.dept=='Dept'){
        return res.status(411).json({
            msg: 'cpf already exists as admin'
        })
    }
    try{
        await Admin.create({
            cpf: req.body.cpf,
            dept: req.body.dept
        })
        // const cpf = req.body.cpf
        
        // const token = jwt.sign({
        //     cpf: cpf
        // }, JWT_SECRET);

        const admins = await Admin.find({})
        
        res.json({
            msg: 'admin created successfully',
            // token: `Bearer ${token}`,
            admins: admins
        })
    }
    catch(error){
        res.status(500).json({
            msg: `${error}`
        })
    }
})

router.delete('/removeAdmin', authSuperAdmin, async(req, res)=>{
    const { success } = adminSchema.safeParse(req.body);
    if(!success){
        console.log(req.body);
        return res.status(411).json({
            msg: 'invalid inputs'
        })
    }
    try {
        const admin = await Admin.findOne({
            cpf: req.body.cpf,
            dept: req.body.dept
        })
        console.log(admin._id)
        await Admin.deleteOne({
            _id: admin._id
        })
        const admins = await Admin.find({})
        res.json({
            msg: 'admin removed successfully',
            admins: admins
        })
    }
    catch(error){
        return res.status(411).json({
            msg: `${error}`
        })
    }
    
})

router.get('/dashboard', authSuperAdmin, async(req, res)=>{
    const cpf = req.cpf;
    console.log(cpf)
    const complaints = await Complaint.find({})
    res.json({
        complaints
    })
})

router.get('/admins', authSuperAdmin, async(req, res)=>{
    const admins = await Admin.find({})
    res.json({
        admins
    })
})

router.put('/Pending', authSuperAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
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
router.put('/Processing', authSuperAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
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

router.put('/Resolved', authSuperAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
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
router.put('/Unresolved', authSuperAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
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