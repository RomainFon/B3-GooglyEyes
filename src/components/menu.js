import React, {Component} from 'react';
import mainLogo from'./../logoMDS.jpg';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Menu extends Component {
    render(){
        return(
            <div className={this.props.display ? "menu open" : "menu"}>
                <img className={"logoMDS"} src={mainLogo} />
                <ul>
                    <li><Link to={"/fun"}>Fun</Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                    <li><Link to={"/googlyeyes"}>GooglyEyeq</Link></li>
                </ul>
            </div>
        )
    }
}

export default Menu;