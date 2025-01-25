const Employee = require('../models/employee');

// POST function 
const createEmployee = async (req, res) => {
	try {
		const { name, email, phone, role } = req.body

		const employee = new Employee({
			name,
			email,
			phone,
			role
		})
		await employee.save()
		res.status(201).json(employee)
	}

	catch (error) {
		console.error("there is an error:", error.message)
		res.status(400).json({ message: `Bad request, ${error.message}` })
	}
}

// Retrieving employees 
const getEmployees = async (req, res) => {
	try {
		const employees = await Employee.find()
		res.status(200).json(employees)
	}
	catch (error) {
		console.error("There is an error: ", error)
		res.status(500).json({ message: "server error" })
	}
}

const singleEmployee = async (req, res) => {
	try {
		const employee = await Employee.findById(req.params.id)
		if (!employee) {
			return res.status(404).json({ message: "employee not found, [it's an invalid ID]" })
		}
		res.status(200).json(employee)
	} catch (error) {
		console.error("There is an error: ", error)
		res.status(500).json({ message: "server error" })
	}
}

const updateEmployee = async (req, res) => {
	try {
		const { name, email, phone, role } = req.body

		const myEmployee = await Employee.findByIdAndUpdate(
			req.params.id,
			{ name, email, phone, role },
			{ new: true }
		)
		if (!myEmployee) {
			return res.status(404).json({ message: "Employee not found!" });
		}
		return res.status(200).json(myEmployee)
	}
	catch (error) {
		console.error("There is an error: ", error)
		res.status(500).json({ message: "server error" })
	}
}

const deleteEmployee = async (req, res) => {
	try {
		const deleteEmployee = await Employee.findByIdAndDelete(req.params.id)
		if (!deleteEmployee) {
			return res.status(404).json({ message: `Well! we don't have the employee with that  ID: ${req.params.id} to delete` })
		}
		res.status(204).json({ message: "employee record deleted successfully" })
	}
	catch (error) {
		console.error("There is an error: ", error)
		//res.status(500).json({ message: "server error" })

		if (!res.headersSent) {
			return res.status(500).json({ message: "Server error" });
		}
	}
}

module.exports = { createEmployee, getEmployees, singleEmployee, updateEmployee, deleteEmployee }