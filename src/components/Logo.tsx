import React, {Component} from 'react';

class Logo extends Component {
    render() {
        return (
            <a className={"logo"} href={"/"}>
                <img style={{height: "auto", width: "80%"}} alt="GDG logo" src="./img/logo.svg"/>
            </a>
        );
    }
}

export default Logo;