const express = require('express')
const app = express.Router()
const Employee = require('../models/Employees')
const Joi = require('joi')
const _ = require('lodash')


app.post('/api/employee', async (req, res) => {

    try {
        const { error } = validateEmployee(req.body)
        if (error) { res.json({ err: 'Invalid Data' }) }

        const employee = new Employee({
            name: req.body.name.toUpperCase(),
            birthdate: req.body.bday,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,

            status: req.body.status,
            statusExpiresOn: req.body.statusExpiresOn,
            statusDocName: req.body.statusDocName,
            statusDocNumber: req.body.statusDocNumber,
            passportNumber: req.body.passportNumber,
            passportIssueCountry: req.body.passportIssueCountry,
            passportIssuedOn: req.body.passportIssuedOn,
            passportExpiresOn: req.body.passportExpiresOn,

            clientName: req.body.clientName,
            clientLocation: req.body.clientLocation,
            role: req.body.role,
            supervisor: req.body.supervisor,
            employmentStartDate: req.body.employmentStartDate,

            employeeStartDate: req.body.employeeStartDate,
            rate: req.body.rate,
            salary: req.body.salary,
            pto: req.body.pto,
            Loan: req.body.Loan
        })

        await employee.save()

        res.send(employee)
    } catch (error) {
        res.send('Error Occured')
    }

})


app.get('/api/employees', async (req, res) => {
    try {
        const employee = await Employee.find().sort('name').select('name email phone')
        if (!employee) { res.json({ err: 'Employees Not Found' }) }

        res.json(employee)

    } catch (error) {
        res.json({ err: 'Error Occured' })
    }
})

app.get('/api/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (!employee) { res.status(400).json({ err: 'Employee Not Found' }) }

        res.status(200).json(employee)

    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ err: 'Employee Not Found' }) }
        res.status(500).json({ err: 'Server Error' })
    }
})


app.put('/api/employee/:id', async (req, res) => {
    try {
        const { error } = validateEmployee(req.body)
        if (error) { res.status(400).json({ err: 'Invalid Data' }) }

        const employee = await Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, { new: true })
        res.status(200).json(employee)

    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ err: 'Employee Not Found' }) }
        res.status(500).json({ err: 'Server Error' })
    }
})


app.delete('/api/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)
        if (!employee) { res.status(400).json({ err: 'Employee Not Found' }) }

        res.status(200).json({ msg: 'Employee Deleted' })
    } catch (error) {
        res.status(500).json({ err: 'Server Error' })
    }
})





function validateEmployee(employee) {
    const schema = ({
        name: Joi.string(),
        birthdate: Joi.date(),
        email: Joi.string(),
        phone: Joi.string(),
        address: Joi.string(),
        address2: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),

        status: Joi.string(),
        statusExpiresOn: Joi.date(),
        statusDocName: Joi.string(),
        statusDocNumber: Joi.number(),
        passportNumber: Joi.string(),
        passportIssueCountry: Joi.string(),
        passportIssuedOn: Joi.date(),
        passportExpiresOn: Joi.date(),

        clientName: Joi.string(),
        clientLocation: Joi.string(),
        role: Joi.string(),
        supervisor: Joi.string(),
        employmentStartDate: Joi.date(),

        employeeStartDate: Joi.date(),
        rate: Joi.number(),
        salary: Joi.number(),
        pto: Joi.number(),
        Loan: Joi.number()
    })
    return Joi.validate(employee, schema)
}

module.exports = app