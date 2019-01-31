import React, {Component} from 'react';
import mainLogo from'./../logoMDS.jpg';


class Menu extends Component {
    render(){
        return(
            <div className={this.props.display ? "menu open" : "menu"}>
                <img className={"logoMDS"} src={mainLogo} />
            </div>
            )
    }
}

export default Menu;