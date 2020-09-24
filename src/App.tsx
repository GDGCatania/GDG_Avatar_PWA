import * as React from "react";
import {RootState} from './redux/configureStore';
import {connect} from 'react-redux';
import {Snackbar, Button} from '@material-ui/core';
import {Provider} from 'react-redux';
import {notifyOffline, notifyRefresh, setImageUrl} from './redux/modules/data';
import {isBrowser} from "react-device-detect";
import './style/App.css';
import AvatarApp from "./AvatarApp";
import Menu from "./Menu";
import Logo from "./components/Logo";
import GitLogo from "./components/GitLogo";
import SignerApp from "./SignerApp";

type ComponentProps = {
    store: any;
}

function mapStateToProps(state: RootState) {
    return {
        image: state.data.imageUrl,
        refresh: state.data.refresh,
        offline: state.data.offline
    }
}

const mapDispatchToProps = {setImageUrl, notifyOffline, notifyRefresh};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;


class App extends React.Component<Props> {
    render() {
        let currentPage;
        switch (window.location.pathname.toLowerCase()) {
            case "/avatar":
                currentPage = <AvatarApp store={this.props.store} />;
                break;
            case "/signature":
                currentPage = <SignerApp store={this.props.store} />;
                break;
            default:
                currentPage = <Menu store={this.props.store} />;
                break ;
        }

        return (
            <Provider store={this.props.store}>
                <div className="App">
                    <div className="header unselectable">
                        <Logo/>
                        <a className={"title"} href={"/"}><p>Avatar and Signature Generator</p></a>
                        <GitLogo/>
                    </div>

                    {currentPage}

                    <Snackbar
                        open={this.props.offline}
                        message="Content is cached for offline use."
                        style={(isBrowser) ? {padding: 8} : {}}
                        autoHideDuration={2000}
                        onClose={(event: object, reason: string) => this.props.notifyOffline(false)}
                    />
                    <Snackbar
                        open={this.props.refresh}
                        style={(isBrowser) ? {padding: 8} : {}}
                        action={<Button color="primary" onClick={()=>window.location.reload(false)}>Refresh</Button>}
                        message="New content is available, please refresh."
                        autoHideDuration={4000}
                        onClose={(event: object, reason: string) => this.props.notifyRefresh(false)}
                    />
                </div>
            </Provider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

