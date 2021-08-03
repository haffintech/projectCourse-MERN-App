const express = require("express")
const router = express.Router()

const Appointment = require("../../models/Appointment")

Appointment.find({})

router.get("/:uname/:year/:month/:day", (req, res) => {
    let day = new Date(req.params.year, req.params.month, req.params.day)
    Appointment.find({"userID" : req.params.uname, "dayOfAppointment" : day})
               .sort('time').exec( ( error, data) => {
                    if(error) {
                        console.log(error)
                    }
                    else {
                        res.json(data)
                    }
                })
    })


router.patch("/:id", (req, res) => {
        const id = req.params.id
        const updatedEntry = req.body
        Appointment.findByIdAndUpdate(id, updatedEntry)
        .then( result => res.send(result))    
})

module.exports = router