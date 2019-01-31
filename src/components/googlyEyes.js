import React, {Component} from 'react';
import './../App.css'
import { Engine, Render, Runner, Composite, Composites, Common, Constraint, MouseConstraint, Mouse, World, Bodies } from 'matter-js'

class GooglyEyes extends Component {
    constructor(){
        super()
        this.engine = Engine.create()
        this.world = this.engine.world
    }

    componentDidMount(){
        this.center = {x: window.innerWidth/2, y:window.innerHeight/2}
        this.ctx = this.refs.canvas.getContext('2d')
        this.refs.canvas.width = window.innerWidth
        this.refs.canvas.height = window.innerHeight

        this.render = Render.create({
            canvas: this.refs.canvas,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                showAngleIndicator: true
            }
        });

        this.startEngine()
        this.createEyes()
        this.addMouse()
        this.startRender()

        window.addEventListener('resize', this.onResize.bind(this))
        window.addEventListener('deviceorientation', this.updateGravity.bind(this))
        window.addEventListener('devicemotion', this.updateMotion.bind(this))

    }

    updateMotion(event){
        var x = event.accelerationIncludingGravity.x
        var y = event.accelerationIncludingGravity.y
        var z = event.accelerationIncludingGravity.z

        var gravity = this.engine.world.gravity
        gravity.x = -x
        gravity.y = y
    }

    updateGravity(event){
        var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
            gravity = this.engine.world.gravity;

        if (orientation === 0) {
            gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
            gravity.y = Common.clamp(event.beta, -90, 90) / 90;
        } else if (orientation === 180) {
            gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
            gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
        } else if (orientation === 90) {
            gravity.x = Common.clamp(event.beta, -90, 90) / 90;
            gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
        } else if (orientation === -90) {
            gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
            gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
        }
    }

    onResize(){
        this.refs.canvas.width = window.innerWidth
        this.refs.canvas.height = window.innerHeight
    }

    startEngine(){
        /*Render.run(this.render)

        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);*/
        this.draw()
    }

    draw(){
        var bodies = Composite.allBodies(this.engine.world)
        Engine.update(this.engine, 16)

        if(bodies.length){
            this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

            this.ctx.beginPath()
            this.ctx.fillStyle =  '#ffffff'
            this.ctx.arc(this.center.x, this.center.y, 80, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.closePath()

            this.ctx.beginPath()
            this.ctx.fillStyle =  '#000000'
            this.ctx.arc(bodies[0].position.x, bodies[0].position.y, 40, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.closePath()
        }


        requestAnimationFrame(() => this.draw())
    }

    createEyes(){
        var body = Bodies.circle(this.center.x, this.center.y, 30);

        var constraint = Constraint.create({
            render: { visible: false},
            pointA: { x: this.center.x, y: this.center.y },
            bodyB: body,
            pointB: { x: -10, y: -10 },
            stiffness: 0.1,
            damping: 0.03
        });

        World.add(this.world, [body, constraint]);
    }

    startRender(){
        Render.lookAt(this.render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });
    }

    addMouse(){
        var mouse = Mouse.create(this.render.canvas),
            mouseConstraint = MouseConstraint.create(this.engine, {
                mouse: mouse,
                constraint: {
                    // allow bodies on mouse to rotate
                    angularStiffness: 0,
                    render: {
                        visible: false
                    }
                }
            });

        World.add(this.world, mouseConstraint);
        this.render.mouse = mouse;
    }

    render() {
        return (
            <canvas className="googlyEyes" ref={"canvas"}>GooglyEyes</canvas>
        ) ;
    }
}

export default GooglyEyes;
