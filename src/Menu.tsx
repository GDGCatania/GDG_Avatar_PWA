import * as React from "react";
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import './style/App.css';
import './style/Menu.css';

type Props = {
    store: any;
}

class Menu extends React.Component<Props> {
    render() {
        return (
            <Provider store={this.props.store}>
                <div className="Menu">
                    <Paper className={"chooseToolContent"}>
                        <a href={"/Avatar"} style={{textDecoration: "none"}}>
                            <p>Avatar</p>
                            <div className={"imageContainer"}>
                                <div className={"placeholder"} style={{backgroundImage: "url(\"./img/avatar_sketch.svg\")"}} />
                            </div>
                        </a>
                    </Paper>
                    <Paper className={"chooseToolContent"}>
                        <a href={"/Signature"} style={{textDecoration: "none"}}>
                            <p>Signature</p>
                            <div className={"imageContainer"}>
                                <div className={"placeholder"} style={{backgroundImage: "url(\"./img/sign_sketch.svg\")"}} />
                            </div>
                        </a>
                    </Paper>
                </div>
            </Provider>
        );
    }
}

export default connect()(Menu);

