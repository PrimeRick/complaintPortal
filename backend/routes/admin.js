const express = require("express");
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { Admin, Complaint, User, CivilSerial, ElectricalSerial, CanteenSerial, HousekeepingSerial, } = require('../db');
const { authAdmin } = require('../middleware/auth')
const ExcelJs = require('exceljs')

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
router.get('/userDashboard', authAdmin, async(req, res)=>{
    const cpf = req.cpf;
    console.log(cpf)
    try{
        const complaints = await Complaint.find({
            cpf: cpf
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

router.put('/Open', authAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
            dept: req.dept
        }, {
            state: "Open"
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
        state: 'Open'
    })
})
router.put('/In%20Progress', authAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
            dept: req.dept
        }, {
            state: "In Progress"
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
        state: 'In Progress'
    })
})

router.put('/Closed', authAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
            dept: req.dept
        }, {
            state: "Closed"
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
        state: 'Closed'
    })
})
router.put('/Undetermined', authAdmin, async(req, res)=>{
    const complaintId = req.body.complaintId
    try{
        const complaint = await Complaint.findOneAndUpdate({
            _id: complaintId,
            dept: req.dept
        }, {
            state: "Undetermined"
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
        state: 'Undetermined'
    })
})

const complaintBody = zod.object({
    dept: zod.string(),
    qtrNo: zod.string(),
    serial: zod.number(),
    description: zod.string(),
    location: zod.string()
})

router.post('/complaint', authAdmin, async(req,res)=>{
    const { success } = complaintBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg: 'invalid inputs',
            dept: req.body.dept,
            phase: req.body.phase,
            qtrNo: req.body.qtrNo,
            description: req.body.description
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
            serial: req.body.serial,
            location: req.body.location,
            description: req.body.description,
            state: "Open",
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

router.get('/civilSerial', authAdmin, async(req, res)=>{
    const response = await CivilSerial.findOne({})
    console.log(`heyyyyyy ${response.serial}`)
    return res.json({
        serial: response.serial
    })
})

router.get('/electricalSerial', authAdmin, async(req, res)=>{
    const response = await ElectricalSerial.findOne({})
    console.log(`heyyyyyy ${response.serial}`)
    return res.json({
        serial: response.serial
    })
})

router.get('/canteenSerial', authAdmin, async(req, res)=>{
    const response = await CanteenSerial.findOne({})
    console.log(`heyyyyyy ${response.serial}`)
    return res.json({
        serial: response.serial
    })
})

router.get('/housekeepingSerial', authAdmin, async(req, res)=>{
    const response = await HousekeepingSerial.findOne({})
    console.log(`heyyyyyy ${response.serial}`)
    return res.json({
        serial: response.serial
    })
})

const updateSerialBody = zod.object ({
    serial: zod.number(),
    whichSerial: zod.string()
})

router.put('/updateSerial', authAdmin, async(req, res)=>{
    const { success } = updateSerialBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg: 'invalid inputs',
            serial: req.body.serial
        })
    }
    const serial = req.body.serial
    const newSerial = serial+1
    const whichSerial = req.body.whichSerial
    try{
        if(whichSerial=='civilSerial'){
            const entry = await CivilSerial.findOneAndUpdate({
                serial: serial
            }, {
                serial: newSerial
            })
            if(!entry){
                return res.status(411).json({
                    msg: 'no such serial found'
                })
            }
            return res.json({
                msg: 'serial updated'
            })
        }
        else if(whichSerial=='canteenSerial'){
            const entry = await CanteenSerial.findOneAndUpdate({
                serial: serial
            }, {
                serial: newSerial
            })
            if(!entry){
                return res.status(411).json({
                    msg: 'no such serial found'
                })
            }
            return res.json({
                msg: 'serial updated'
            })
        }
        else if(whichSerial=='electricalSerial'){
            const entry = await ElectricalSerial.findOneAndUpdate({
                serial: serial
            }, {
                serial: newSerial
            })
            if(!entry){
                return res.status(411).json({
                    msg: 'no such serial found'
                })
            }
            return res.json({
                msg: 'serial updated'
            })
        }
        else{
            const entry = await HousekeepingSerial.findOneAndUpdate({
                serial: serial
            }, {
                serial: newSerial
            })
            if(!entry){
                return res.status(411).json({
                    msg: 'no such serial found'
                })
            }
            return res.json({
                msg: 'serial updated'
            })
        }
    }
    catch{
        return res.status(411).json({
            msg: 'serial could not be updated'
        })
    }
})

router.get('/downloadExcel', authAdmin, async(req, res)=>{
    try{
        const workbook = new ExcelJs.Workbook()
        const worksheet = workbook.addWorksheet('complaints')
        worksheet.columns = [ 
            {header: "Complaint Id", key: "serial"},
            {header: "CPF", key: "cpf"},
            {header: "Department", key: "dept"},
            {header: "Status", key: "state"},
            {header: "Location", key: "qtrNo"},
            {header: "Description", key: "description"},
            {header: "Created At", key: "createdAt"},
            {header: "Feedback", key: "feedback"},
        ]
        console.log(req.dept);
        const complaintsData = await Complaint.find({
            dept: req.dept
        })
        complaintsData.forEach((elem)=>{
            worksheet.addRow(elem.toObject())
        })

        worksheet.getRow(1).eachCell((cell)=>{
            cell.font = {bold: true}
        })

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        res.setHeader("Content-Disposition", `attachment; filename:"complants.xlsx"`)

        return workbook.xlsx.write(res).then(()=>{
            res.status(200).end()
        })
    }
    catch(err){
        console.error('Error generating Excel file:', err);
        res.status(500).json({
            msg: "An error occurred while generating the Excel file",
            error: err.message
        });
    }  
})

module.exports = router