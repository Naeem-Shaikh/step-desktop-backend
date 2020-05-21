const mongoose = require('mongoose')


const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    birthdate: { type: Date },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: Number },

    status: { type: String },
    statusExpiresOn: { type: String },
    statusDocName: { type: String },
    statusDocNumber: { type: String },
    passportNumber: { type: String },
    passportIssueCountry: { type: String },
    passportIssuedOn: { type: Date },
    passportExpiresOn: { type: Date },

    clientName: { type: String },
    clientLocation: { type: String },
    role: { type: String },
    supervisor: { type: String },
    employmentStartDate: { type: Date },

    employeeStartDate: { type: Date },
    rate: { type: Number },
    salary: { type: Number },
    pto: { type: Number },
    Loan: { type: Number }

})

const Employee = mongoose.model('employees', EmployeeSchema)


module.exports = Employee