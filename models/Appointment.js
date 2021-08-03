// this is the schema for an appointment data type, how it is stored in DB

const mongoose = require("mongoose")
const schema = mongoose.Schema
const AppointmentSchema = new schema (
    {
        userID: {
            type: String,
            required: true
        },
        dayOfAppointment: {
            type: Date,
            required: true
        },
        time: {
            type: Date,
            required: true
        },
        entry: {
            type: String,
            required: false
        }
    }
)
Appointment = mongoose.model("appointment", AppointmentSchema)
module.exports = Appointment

