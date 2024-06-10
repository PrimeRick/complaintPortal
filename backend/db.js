const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kshitij:allfiction01@frieren.ekuwgvk.mongodb.net/complaintportalv4');

const userSchema = mongoose.Schema({
	cpf: { 
		type: Number, 
		required: true 
	},
  	password: { 
		type: String, 
		required: true,
		minLength: 8
	}
});

const adminSchema = mongoose.Schema({
	cpf: {
		type: Number, 
		required: true 
	},
	dept: {
		type: String,
		required: true
	}
});

const superAdminSchema = mongoose.Schema({
	cpf: {
		type: Number,
		required: true
	},
})

const complaintSchema = mongoose.Schema({
  	dept: {
	 	type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	phase: { 
		type: String,
	},
	qtrNo: { 
		type: String,
		required: true
	},
	serial: {
		type: Number,
		required: true
	},
	cpf: { 
		type: mongoose.Schema.Types.Number, 
		ref: 'User',
	},
	description: { 
		type: String, 
		required: true
	},
	state: { 
		type: String,
	},
	createdAt: { 
		type: String, 
		// default: Date.now ,
	// }
	},
	feedback: {
		type: String,
		default: ""
	},
});

const civilSerialSchema = mongoose.Schema({
	serial: {
		type: Number,
		required: true
	}
})
const canteenSerialSchema = mongoose.Schema({
	serial: {
		type: Number,
		required: true
	}
})
const electricalSerialSchema = mongoose.Schema({
	serial: {
		type: Number,
		required: true
	}
})
const housekeepingSerialSchema = mongoose.Schema({
	serial: {
		type: Number,
		required: true
	}
})

const CivilSerial = mongoose.model('CivilSerial', civilSerialSchema);
const ElectricalSerial = mongoose.model('ElectricalSerial', electricalSerialSchema);
const CanteenSerial = mongoose.model('CanteenSerial', canteenSerialSchema);
const HousekeepingSerial = mongoose.model('HousekeepingSerial', housekeepingSerialSchema);
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = {
 	User,
	Admin,
	SuperAdmin,
	Complaint,
	CivilSerial,
	ElectricalSerial,
	CanteenSerial,
	HousekeepingSerial
};
