import React, { Component } from 'react';
import './App.css';
import GooglyEyes from './components/googlyEyes'
import Menu from './components/menu'
import Fun from './pages/fun'
import About from './pages/about'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
    constructor(){
        super()
        this.state = {
            menu: false
        }
    }
    toggleMenu(){
        this.setState({
            menu: !this.state.menu
        })
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <Menu display={ this.state.menu }/>

                    <Route path="/fun" component={Fun}/>
                    <Route path="/about" component={About}/>
                    <Route path="/googlyeyes" component={GooglyEyes} ref={'googlyEye'}/>

                    <div className={this.state.menu ? "button_menu active" : "button_menu"} onClick={() => this.toggleMenu()}><div className="hamburger"></div></div>

                </div>
            </Router>
        );
    }
}

export default App;
