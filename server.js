const express = require("express")
const mongoose = require("mongoose")

const app = express()

// body parser for HTTP requests
app.use(express.json())
app.use(express.urlencoded( { extended: false } ) )


// allow http requests (CORS)
app.use(function (req, res, next) {

    // Website to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // this allows cookies to be included in api requests
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



// set up Appointment API
const appointments = require("./routes/APIs/appointments")
app.use("/APIs/appointments", appointments)

// DB config
const db = require("./config/keys").mongoURI

// connect mongo via mongoose
mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology: true})
    .then( () => console.log("mongoDB connected"))
    .catch( err => console.log(err))


// set up listening port
const port = process.env.port || 5000
app.listen(port, () => console.log(`server listening on port ${port}`))


// prepopulate db with empty meetings for specific user
/*
let username = "Mustermann" 
let month = 7 // this is the index of the month: 0 -> jan; 11 -> dec
let firstDay = 1
let lastDay = 31
let hourBegin = 8
let hourEnd = 21

const Appointment = require("./models/Appointment")

for(let i = firstDay; i < lastDay + 1; i++) {

    let day = new Date(2021, month, i)

    for(let j = hourBegin; j < hourEnd; j++) {
        let meetingTime = new Date(2021, month, i, j)

        let apt = new Appointment ( {
            userID: username,
            dayOfAppointment: day,
            time: meetingTime,
            entry: ""
        })
        apt.save().then( apt => console.log(apt) )
        .catch((err) => console.log(err))
    }
}*/