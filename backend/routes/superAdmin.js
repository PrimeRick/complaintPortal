const express = require('express')
const zod = require('zod')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { Admin, Complaint, User, SuperAdmin, Serial, CivilSerial, ElectricalSerial, CanteenSerial, HousekeepingSerial } = require('../db');
const { authSuperAdmin } = require('../middleware/auth');
const CsvParser = require('json2csv').Parser
const ExcelJs = require('exceljs')

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


// const superAdminSchema = zod.object({
//     cpf: zod.number()
// })

// router.post('/createSuperAdmin', async(req,res)=>{
// // router.post('/createAdmin', async(req,res)=>{
//     const { success } = superAdminSchema.safeParse(req.body);

//     if(!success){
//         console.log(req.body);
//         return res.status(411).json({
//             msg: 'invalid inputs',
//             cpf: typeof(req.body.cpf),
//         })
//     }
//     const existingAdmin = await SuperAdmin.findOne({
//         cpf: req.body.cpf
//     })

//     if(existingAdmin || req.body.dept=='Dept'){
//         return res.status(411).json({
//             msg: 'cpf already exists as admin'
//         })
//     }
//     try{
//         await SuperAdmin.create({
//             cpf: req.body.cpf,
//             dept: req.body.dept
//         })
//         // const cpf = req.body.cpf
//         // const token = jwt.sign({
//         //     cpf: cpf
//         // }, JWT_SECRET);

//         const admins = await SuperAdmin.find({})
        
//         res.json({
//             msg: 'admin created successfully',
//             // token: `Bearer ${token}`,
//             admins: admins
//         })
//     }
//     catch(error){
//         res.status(500).json({
//             msg: `${error}`
//         })
//     }
// })
router.post('/createAdmin', authSuperAdmin, async(req,res)=>{
// router.post('/createAdmin', async(req,res)=>{
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
router.get('/userDashboard', authSuperAdmin, async(req, res)=>{
    const cpf = req.cpf;
    console.log(cpf)
    const complaints = await Complaint.find({
        cpf: cpf
    })
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

// router.put('/Pending', authSuperAdmin, async(req, res)=>{
//     const complaintId = req.body.complaintId
//     try{
//         const complaint = await Complaint.findOneAndUpdate({
//             _id: complaintId,
//         }, {
//             state: "Pending"
//         })
//         if(!complaint){
//             return res.status(411).json({
//                 msg: 'unauthorized access'
//             })
//         }
//     }
//     catch{
//         return res.status(411).json({
//             msg: 'some error occured'
//         })
//     }
//     res.json({
//         msg: 'status updated successfully',
//         state: 'Pending'
//     })
// })
// router.put('/Processing', authSuperAdmin, async(req, res)=>{
//     const complaintId = req.body.complaintId
//     try{
//         const complaint = await Complaint.findOneAndUpdate({
//             _id: complaintId,
//         }, {
//             state: "Processing"
//         })
//         if(!complaint){
//             return res.status(411).json({
//                 msg: 'unauthorized access'
//             })
//         }
//     }
//     catch{
//         return res.status(411).json({
//             msg: 'some error occured'
//         })
//     }
//     res.json({
//         msg: 'status updated successfully',
//         state: 'Processing'
//     })
// })

// router.put('/Resolved', authSuperAdmin, async(req, res)=>{
//     const complaintId = req.body.complaintId
//     try{
//         const complaint = await Complaint.findOneAndUpdate({
//             _id: complaintId,
//         }, {
//             state: "Resolved"
//         })
//         if(!complaint){
//             return res.status(411).json({
//                 msg: 'unauthorised access'
//             })
//         }
//     }
//     catch{
//         return res.status(411).json({
//             msg: 'some error occured'
//         })
//     }
//     res.json({
//         msg: 'status updated successfully',
//         state: 'Resolved'
//     })
// })
// router.put('/Unresolved', authSuperAdmin, async(req, res)=>{
//     const complaintId = req.body.complaintId
//     try{
//         const complaint = await Complaint.findOneAndUpdate({
//             _id: complaintId,
//         }, {
//             state: "Unresolved"
//         })
//         if(!complaint){
//             return res.status(411).json({
//                 msg: 'unauthorised access'
//             })
//         }
//     }
//     catch{
//         return res.status(411).json({
//             msg: 'some error occured'
//         })
//     }
//     res.json({
//         msg: 'status updated successfully',
//         state: 'Unresolved'
//     })
// })

const complaintBody = zod.object({
    dept: zod.string(),
    qtrNo: zod.string(),
    serial: zod.number(),
    description: zod.string(),
    location: zod.string()
})

router.post('/complaint', authSuperAdmin, async(req,res)=>{
    const { success } = complaintBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg: 'invalid inputs',
            dept: req.body.dept,
            phase: req.body.phase,
            qtrNo: req.body.qtrNo,
            serial: req.body.serial,
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
        console.log(req.body.serial);
        await Complaint.create({
            cpf: req.cpf,
            dept: req.body.dept,
            serial: req.body.serial,
            phase: req.body.phase,
            qtrNo: req.body.qtrNo,
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

router.get('/civilSerial', authSuperAdmin, async(req, res)=>{
    const response = await CivilSerial.findOne({})
    console.log(`heyyyyyy ${response.serial}`)
    return res.json({
        serial: response.serial
    })
})

router.get('/electricalSerial', authSuperAdmin, async(req, res)=>{
    const response = await ElectricalSerial.findOne({})
    console.log(`heyyyyyy ${response.serial}`)
    return res.json({
        serial: response.serial
    })
})

router.get('/canteenSerial', authSuperAdmin, async(req, res)=>{
    const response = await CanteenSerial.findOne({})
    console.log(`heyyyyyy ${response.serial}`)
    return res.json({
        serial: response.serial
    })
})

router.get('/housekeepingSerial', authSuperAdmin, async(req, res)=>{
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

router.put('/updateSerial', authSuperAdmin, async(req, res)=>{
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

router.delete('/reset', authSuperAdmin, async(req, res)=>{
    try{
        await CivilSerial.deleteMany({})
        await ElectricalSerial.deleteMany({})
        await CanteenSerial.deleteMany({})
        await HousekeepingSerial.deleteMany({})
        await Complaint.deleteMany({})

        await CivilSerial.create({
            serial: 1
        })
        await ElectricalSerial.create({
            serial: 1
        })
        await CanteenSerial.create({
            serial: 1
        })
        await HousekeepingSerial.create({
            serial: 1
        })

        console.log('done??')
        return res.json({
            msg: 'New Contract Begins'
        })
    }
    catch(err){
        return res.status(500).json({
            msg: err
        })
    }
})

router.get('/downloadExcel', authSuperAdmin, async(req, res)=>{
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

        const complaintsData = await Complaint.find({})
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