import React from "react"
import arrLeft from '../css/images/arrowhead_left.png'
import arrRight from '../css/images/arrowhead_right.png'
import OthersAppointment from './OthersAppointment'
import "../css/othersCalendar.css"
import userProfile from "../userProfile"

class OthersCalendar extends React.Component {


    appointmentComponents = []

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user, 
            meetingData: [], 
            isChanged: [], 
            date: new Date()
        }
        this.handleChildChange = this.handleChildChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.fetchNextDayEntries = this.fetchNextDayEntries.bind(this)
        this.fetchPrevDayEntries = this.fetchPrevDayEntries.bind(this)
    }


    componentDidMount() {
        this.fetchEntries()
        
    }

    fetchEntries = () => {
        
        const fetching = async () => {
           
            let date = this.state.date
            let params = this.state.user + "/" + date.getFullYear() + "/" + date.getMonth() + "/" + (date.getDate())
            let changed = []
            for(let i = 0; i < 13; i++) {
                changed.push(false)
            }
            const res = await fetch("http://localhost:5000/APIs/appointments/" + params)
            const data = await res.json()
            this.setState({ 
                    user: this.state.user,
                    meetingData: data, 
                    isChanged: changed, 
                    date: this.state.date
                }
            )
            
        }
        fetching()
        
        
    }

    

    render() {   
        
        this.createAppointments()
        const date = this.state.date
        const dateString = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear()
        
        return (
            <div className="calendar">
                <div className="calBar">
                    <img src={arrLeft} alt="left" className="controls" onClick={this.fetchPrevDayEntries}/>
                    <h3>{dateString}</h3>
                    <img src={arrRight} alt="right" className="controls" onClick={this.fetchNextDayEntries}/>
                </div>
                {this.appointmentComponents}
                <button onClick={this.handleBtnClick}>save</button>
            </div>
        )
    }

    fetchNextDayEntries() {
        let newDate = this.state.date
        newDate.setDate(newDate.getDate() + 1)
        
        this.setState( {
                user: this.state.user,
                meetingData: [],
                isChanged: [],
                date: newDate
            }
        )
        
        this.fetchEntries()
        
    }

    fetchPrevDayEntries() {
        let newDate = this.state.date
        newDate.setDate(newDate.getDate() - 1)
        
        this.setState( {
                user: this.state.user,
                meetingData: [],
                isChanged: [],
                date: newDate
            }
        )
        
        this.fetchEntries()
    }
    
    createAppointments() {

        
        
        // map meeting data onto new appointment components
        this.appointmentComponents = this.state.meetingData.map( (appointment, index) => {
            
            return (
                <OthersAppointment 
                    id={appointment._id} 
                    key={appointment._id}
                    index={index} 
                    time={appointment.time} 
                    meeting={appointment.entry}
                    onChange={this.handleChildChange}
                />
            )
        })

    } 
   
    
    handleChildChange(childState) {
        
        var meetings = []
        meetings = this.state.meetingData
        
        let changed = this.state.isChanged
        let index = childState.index
        
        meetings[index].entry = userProfile.getName()
        
        changed[index] = true
        this.setState({
            user: this.state.user,
            meetingData: meetings,
            isChanged: changed,
            date: this.state.date
        })
    }

    handleBtnClick(event) {
        event.preventDefault()
        const updatedEntry = { entry: userProfile.getName()}
        
        for(let i = 0; i < this.state.isChanged.length; i++) {
            if(this.state.isChanged[i]){
                const id = this.state.meetingData[i]._id
                const url = "http://localhost:5000/APIs/appointments/" + id
                
                fetch(url, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedEntry)
                })
                .then(response => response.json())
                
            }
        }
    }
}

export default OthersCalendar