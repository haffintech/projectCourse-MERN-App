import React from 'react';

class Appointment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            index: this.props.index,
            time: this.props.time,
            entry: this.props.meeting
        }
        this.handleChange = this.handleChange.bind(this)
        this.removeAppointment = this.removeAppointment.bind(this)
    }

    render(){
        let time = new Date(this.state.time)
        let hours = time.getHours()
        let minutes = time.getMinutes()
        if(minutes < 10) {
            minutes = "0" + minutes
        }
        let tBegin = "" + hours + ":" + minutes
    
        return (
            <div className="meetingRow">
                <p title="click here to delete this appointment" onClick={this.removeAppointment}>{tBegin}</p>
                <input value={this.state.entry} id={this.state.id} onChange={this.handleChange}/>
            </div>
        );
    }

    handleChange(event) {
        event.preventDefault()
        const newState = {
            id: this.state.id,
            time: this.state.time,
            index: this.state.index,
            entry: event.target.value
        }

        this.setState(newState)
        this.props.onChange(newState)
    }

    removeAppointment(event) {
        event.preventDefault()
        
        const newState = {
            id: this.state.id,
            time: this.state.time,
            index: this.state.index,
            entry: ""
        }
        
        this.setState(newState)
        this.props.onChange(newState)
    }
    

};
export default Appointment;