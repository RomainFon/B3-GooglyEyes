import React, {Component} from 'react';
import './../App.css'
import { Engine, Render, Runner, Composite, Composites, Common, Constraint, MouseConstraint, Mouse, World, Bodies } from 'matter-js'
import Physic from '../classes/physic'
import Eye from '../classes/eye'
import Camera from '../classes/camera'

class GooglyEyes extends Component {
    constructor(){
        super()
        this.camera = new Camera()
        this.eyes = []
    }

    componentDidMount(){
        this.physic = new Physic(this.refs.canvas)
        this.physic.addMouse()

        this.center = {x: window.innerWidth/2, y:window.innerHeight/2}

        this.ctx = this.refs.canvas.getContext('2d')
        this.refs.canvas.width = window.innerWidth
        this.refs.canvas.height = window.innerHeight

        this.draw()

        window.addEventListener('resize', this.onResize.bind(this))
        window.addEventListener('devicemotion', this.updateMotion.bind(this))

        this.refs.canvas.addEventListener('click', this.onClick.bind(this))
        this.refs.canvas.addEventListener('touchstart', this.onClick.bind(this))

    }

    updateMotion(event){
        var x = event.accelerationIncludingGravity.x
        var y = event.accelerationIncludingGravity.y

        this.physic.updateGravity(x,y)
    }


    onResize(){
        this.physic.resize()
        this.refs.canvas.width = window.innerWidth
        this.refs.canvas.height = window.innerHeight
    }

    draw(){
        this.physic.update()
        this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

        let videoW = this.camera.video.videoWidth
        let videoH = this.camera.video.videoHeight
        let windowWidth = window.innerWidth
        let windowHeight = window.innerHeight

        let ratio = Math.max(windowWidth / videoW, windowHeight / videoH)

        let newVideoW = videoW * ratio
        let newVideoH = videoH * ratio
        let newX = (windowWidth - newVideoW)/2
        let newY = (windowHeight - newVideoH)/2

        this.ctx.drawImage(this.camera.video, 0, 0, videoW, videoH, newX, newY, newVideoW, newVideoH)

        requestAnimationFrame(() => this.draw())

        for(let i = 0; i < this.eyes.length; i++){
            this.eyes[i].render(this.ctx)
        }
    }

    onClick(e){
        if(e.targetTouches){
            e = e.targetTouches[0]
        }
        let eye = new Eye(this.physic.world)
        eye.updatePosition(e.clientX, e.clientY)
        this.eyes.push(eye)
    }

    picture(){
        this.camera.takeSnapshot()
    }

    render() {
        return (
            <div>
                <canvas onClick={(e) => this.onClick} onclassName="googlyEyes" ref={"canvas"}>GooglyEyes</canvas>
                <button className={"button_picture"} onClick={() => this.picture()}>PICTURE</button>
            </div>
        ) ;
    }
}

export default GooglyEyes;
