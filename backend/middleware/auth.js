const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const { SuperAdmin, Admin } = require("../db");


const authAdmin = async (req, res, next) => {
	try{
		const authHeader = req.headers.authorization;
		if(!authHeader || !authHeader.startsWith('Bearer ')){
			return res.status(403).json({
				msg: 'you are not authorized'
			})
		}
		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, JWT_SECRET);
		const admin = await Admin.findOne({
			cpf: decoded.cpf
		})
		if(!admin){
			return res.status(411).json({
				msg: 'unauthorized access'
			})
		}
		req.cpf = decoded.cpf;
		req.dept = decoded.dept
		console.log(req.cpf)
		next();
	}
	catch(err){
		res.json({
			msg: 'token expired'
		})
	}
};

const authSuperAdmin = async (req, res, next) => {
	try{
		const authHeader = req.headers.authorization;
		console.log(authHeader)
		if(!authHeader || !authHeader.startsWith('Bearer ')){
			return res.status(403).json({
				msg: 'you are not authorized'
			})
		}
		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, JWT_SECRET);
		req.cpf = decoded.cpf;
		console.log(req.cpf)
		const superAdmin = await SuperAdmin.findOne({
			cpf: decoded.cpf
		})
		if(!superAdmin){
			return res.status(411).json({
				msg: 'unauthorized access'
			})
		}
		next();
	}
	catch(err){
		res.json({
			msg: 'token expired'
		})
	}
};

const authUser = async (req, res, next) => {
	try{
		const authHeader = req.headers.authorization;
		if(!authHeader || !authHeader.startsWith('Bearer ')){
			return res.status(403).json({
				msg: 'you are not authorized'
			})
		}
		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, JWT_SECRET);
		req.cpf = decoded.cpf
		console.log(req.cpf)
		next()
	}
	catch(err){
		res.json({
			msg: 'token expired'
		})
	}
};


module.exports = {
  authAdmin,
  authUser,
  authSuperAdmin
};
