const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
	//employee name, email, phone, city

	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		default: false,
		unique: true,
		validate: {
			validator: function (v) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			},
			message: props => `"${props.value}" is not a valid email address!`
		}
	},
	phone: {
		type: Number,
		default: false,
		unique: true,
		validate: {
			validator: function (v) {
				return v && v.toString().length >= 10; // Ensure phone number has 10+ digits
			},
			message: props => `${props.value} is registered with a different employee`
		}
	},
	role: {
		type: String,
		required: true,
	}

})

module.exports = mongoose.model('Employee', employeeSchema);