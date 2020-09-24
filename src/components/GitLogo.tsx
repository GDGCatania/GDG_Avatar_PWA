import React, {Component} from 'react';

class GitLogo extends Component {
    render() {
        return (
            <div className="fork git">
                <a href="https://github.com/GDGCatania/GDG_Avatar_PWA" target="_blank" rel="noopener noreferrer">
                    <img src="./img/git_fork.svg"
                         alt="fork on GitHub"
                         height={35}
                         width={35}/>
                </a>
            </div>
        );
    }
}

export default GitLogo;