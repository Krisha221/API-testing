const express = require("express")
const dotEnv = require("dotenv")

const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const cors = require("cors")

const employeeRoutes = require('./routes/employeeRoutes')



const app = express();

dotEnv.config()

app.use(cors())
app.use(bodyParser.json())

const PORT = 5000 || process.env.PORT

//server connection
app.listen(PORT, () => {
	console.log(`server started and running on PORT: ${PORT}`);
})

//employee route
app.use('/employees', employeeRoutes)


//database connection
mongoose.connect(process.env.MONGODB_URI).
	then(() => {
		console.log("MongoDB connected successfully!");
	})
	.catch
	((error) => {
		console.log(error);
	})