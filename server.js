const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const employees = require('./routes/Employees')

app.use(express.json())
app.use(cors())
connectDB()

app.get('/', (req, res) => {
    res.send('STEP Server')
})


app.use(employees)






app.listen(port, () => {
    console.log(`STEP API Server started on port ${port}`)
})