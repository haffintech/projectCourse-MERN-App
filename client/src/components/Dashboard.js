import React from 'react'
import Calendar from "./calendar"
import "../css/dashboard.css"
import logo from "../css/images/appointment.png"
import userProfile from "../userProfile"
import OthersCalendar from './OthersCalendar'


class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.switchCalendars = this.switchCalendars.bind(this)
        
        this.state = {
            showCalendar: "default",
            displayedUser: ""
            }
    }

    render() {

        if(this.state.showCalendar === "default") {
            return (
                <div>
                    <div className="navbar">
                        <img src={logo} alt="LOGO" />
                        <div className="searchcontainer">
                            <input
                                type="text"
                                id="searchbar"
                                placeholder="search people"
                                name="search"
                            />
                            <button className="searchbtn" onClick={this.switchCalendars}>Search</button>
                        </div>
                        
                        <button className="btn" onClick={this.logout}>Logout</button>
                    </div>
                    
                    <Calendar/>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="navbar">
                        <img src={logo} alt="LOGO" onClick={this.goToPersonalCalendar}/>
                        <div className="searchcontainer">
                            <input
                                type="text"
                                id="searchbar"
                                placeholder="search people"
                                name="search"
                            />
                            <button className="searchbtn" onClick={this.switchCalendars}>Search</button>
                        </div>
                        
                        <button className="btn" onClick={this.logout}>Logout</button>
                    </div>
                    
                    <OthersCalendar user={this.state.displayedUser}/>
                </div>
            )
        }

       
    }

    switchCalendars(e) {
        e.preventDefault()
        let input = document.getElementById("searchbar")
        let user = input.value
        
        if(this.state.showCalendar === "default")
            this.setState( { 
                showCalendar: "others", 
                displayedUser: user
                } )
       
    }

    logout(e) {
        e.preventDefault()
        userProfile.logout() 
        this.props.history.push("/")
    }
}

export default Dashboard