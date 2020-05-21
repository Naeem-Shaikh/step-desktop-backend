const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/stepdata'


const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log('STEP Database connected Successfully...')

    } catch (error) {
        console.log('STEP Database connection Error...')
        process.exit(1)
    }
}


module.exports = connectDB