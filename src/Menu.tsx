import * as React from "react";
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import './style/App.css';

type Props = {
    store: any;
}

class Menu extends React.Component<Props> {
    render() {
        return (
            <Provider store={this.props.store}>
                <div className="Menu">
                    <div><a href={"/Avatar"}>Avatar</a></div>
                    <br/>
                    <div><a href={"/Signer"}>Signer</a></div>
                </div>
            </Provider>
        );
    }
}

export default connect()(Menu);

