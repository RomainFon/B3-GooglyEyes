import React, { Component } from 'react';
import './App.css';
import GooglyEyes from './components/googlyEyes'

class App extends Component {

    takePicture(){
        this.refs.googlyEye.picture()
    }
    render() {
        return (
            <div className="App">
                <GooglyEyes ref={"googlyEye"}></GooglyEyes>
                <button onClick={() => this.takePicture()}>PICTURE</button>
            </div>
        );
    }
}

export default App;
