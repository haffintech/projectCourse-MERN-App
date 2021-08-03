import React from 'react'
import Dashboard from './components/Dashboard'
import './App.css'
import LoginForm from './components/LoginForm'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

class App extends React.Component {

  render() {  
    return(
      <div className="Container">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LoginForm}/>
            <Route path="/dashboard" exact component={Dashboard}/>
          </Switch>
        </BrowserRouter>
      </div>    
    )
  } 
} 

export default App
