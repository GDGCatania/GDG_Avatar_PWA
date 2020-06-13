import React, {Component} from 'react';

class Logo extends Component {
    render() {
        return (
            <a href={"/"}>
                <img style={{height: "auto", width: "30%", margin: 32}} alt="GDG logo" src="./img/logo.svg"/>
            </a>
        );
    }
}

export default Logo;