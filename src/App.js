import React, { Component } from 'react';
import './App.css';
import GooglyEyes from './components/googlyEyes'
import Menu from './components/menu'

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

    takePicture(){
        this.refs.googlyEye.picture()
    }
    render() {
        return (
            <div className="App">
                <Menu display={ this.state.menu }/>
                <GooglyEyes ref={"googlyEye"}></GooglyEyes>
                <div className={this.state.menu ? "button_menu active" : "button_menu"} onClick={() => this.toggleMenu()}><div className="hamburger"></div></div>
                <button className={"button_picture"} onClick={() => this.takePicture()}>PICTURE</button>
            </div>
        );
    }
}

export default App;
