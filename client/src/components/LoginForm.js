import React from 'react'
import '../css/loginform.css'
import userProfile from '../userProfile'

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            username: '',
            password: '',
            user: {}
        }
        this.login = this.login.bind(this)
    }
    render() {
        
        return (
            <div className="compContainer">

                <form className="loginForm">
                    <label>Username</label>
                    <input className="textInput" type="text" onChange={e => this.updateUsername(e)}/>
                    <label>Password</label>
                    <input className="textInput" type="password" onChange={e => this.updatePassword(e)}/>
                    <div className="btnContainer">
                        <button onClick={this.handleRegister}>Register</button>
                        <button onClick={this.login}>Login</button>
                    </div>
                </form>

            </div>
            
                
            
        )
    }

    updateUsername = e => {
        this.setState( {
            username: e.target.value,
            password: this.state.password
        })
    }

    updatePassword = e => {
        this.setState( {
            username: this.state.username,
            password: e.target.value
        })
    }

    handleRegister = e => {
        e.preventDefault()

        // implement later
    }

    

    login = () => {
       userProfile.setName(this.state.username)
       
       // navigate to /dashboard 
       this.props.history.push("/dashboard")

       // implement later
    }


}

export default LoginForm