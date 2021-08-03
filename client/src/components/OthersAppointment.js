import React from 'react'
import userProfile from '../userProfile'

class OthersAppointment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            index: this.props.index,
            time: this.props.time,
            entry: this.props.meeting
        }
        this.handleChange = this.handleChange.bind(this)
    }

    render(){
        let time = new Date(this.state.time)
        let hours = time.getHours()
        let minutes = time.getMinutes()
        if(minutes < 10) {
            minutes = "0" + minutes
        }
        let tBegin = "" + hours + ":" + minutes
    
        let meetingType = "filledMeeting"

        if(this.state.entry === "") {
            meetingType = "emptyMeeting"
        }

        return (
            <div className={meetingType + " meetingRow"}>
                <p>{tBegin}</p>
                <div className={meetingType + " meetingEntry"} id={this.state.id} onClick={this.handleChange}/>
            </div>
        )
        
        
    }

    handleChange(event) {
        event.preventDefault()
        let name = userProfile.getName()
        
        this.setState( {
            id: this.state.id,
            time: this.state.time,
            index: this.state.index,
            entry: name
        })
        
        this.props.onChange(this.state)
        
    }
    

}
export default OthersAppointment