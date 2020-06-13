import React, {Component} from 'react';
import { isMobile } from 'react-device-detect';

class GitLogo extends Component {
    render() {
        return (
            <div className="fork">
                <a href="https://github.com/GDGCatania/GDG_Avatar_PWA" target="_blank" >
                    <img src="./img/GitHub.png"
                         alt="fork on GitHub"
                         height={(isMobile) ? 25 : 50}
                         width={(isMobile) ? 25 : 50}/>
                </a>
            </div>
        );
    }
}

export default GitLogo;