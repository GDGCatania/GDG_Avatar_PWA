import * as React from "react";
import {RootState} from './redux/configureStore';
import {connect} from 'react-redux';
import CanvasPanel from './components/CanvasPanel'
import LensIcon from '@material-ui/icons/Lens';
import {Button, Snackbar, BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {Provider} from 'react-redux';
import {setImage, notifyOffline, notifyRefresh} from './redux/modules/data';
import {isBrowser, isMobile} from "react-device-detect";
import './style/App.css';


type ComponentProps = {
    store: any
}

function mapStateToProps(state: RootState) {
    return {
        image: state.data.image,
        refresh: state.data.refresh,
        offline: state.data.offline
    }
}

const mapDispatchToProps = {setImage, notifyOffline, notifyRefresh};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
type State = {
    stepIndex: number;
    slider: number;
}


class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {stepIndex: 0, slider: 0};
    }

    componentDidUpdate() {
        if (this.state.stepIndex == 0 && this.props.image == true) this.handleNext();
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex == 3) {
            this.setState({stepIndex: 0});
            this.props.setImage(false);
            return false;
        }
        if (stepIndex == 0 && this.props.image == false) return alert("Please upload an image");
        this.setState({
            stepIndex: stepIndex + 1,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex == 1) this.props.setImage(false);
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };


    render() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px 64px 16px'};

        const bottomBarDesktop =
            <BottomNavigation style={{
                position: "fixed",
                width: "100vw",
                justifyContent: "space-between",
                left: 0,
                bottom: 0,
                zIndex: 10
            }} value={(isBrowser) ? stepIndex + 1 : undefined}>
                <Button
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{flex: "1 0 0", margin: "auto"}}>
                    Back
                </Button>
                <BottomNavigationAction
                    icon={<LensIcon/>}
                    style={{flex: "0 0 0", margin: "auto"}}
                />
                <BottomNavigationAction
                    icon={<LensIcon/>}
                    style={{flex: "0 0 0", margin: "auto"}}
                />
                <BottomNavigationAction
                    icon={<LensIcon/>}
                    style={{flex: "0 0 0", margin: "auto"}}
                />
                <BottomNavigationAction
                    icon={<LensIcon/>}
                    style={{flex: "0 0 0", margin: "auto"}}
                />
                <Button
                    color="primary"
                    style={{flex: "1 0 0", margin: "auto"}}
                    onClick={this.handleNext}>
                    {stepIndex === 2 ? 'Finish' : (stepIndex === 3) ? 'Restart' : 'Next'}
                </Button>
            </BottomNavigation>

        const bottomBarMobile =

            <BottomNavigation style={{
                position: "fixed",
                width: "100vw",
                justifyContent: "space-between",
                left: 0,
                bottom: 0,
                zIndex: 10
            }} value={(isBrowser) ? stepIndex + 1 : undefined}>
                <Button
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{flex: "1 0 0", margin: "auto"}}>
                    Back
                </Button>
                <Button
                    color="primary"
                    style={{flex: "1 0 0", margin: "auto"}}
                    onClick={this.handleNext}
                >
                    {stepIndex === 2 ? 'Finish' : (stepIndex === 3) ? 'Restart' : 'Next'}
                </Button>
            </BottomNavigation>

        return (
            <Provider store={this.props.store}>
                <div className="App" style={{textAlign: "center",}}>
                    <div className="fork">
                        <a href="https://github.com/GDGCatania/GDG_Avatar_PWA">
                            <img src="./img/GitHub.png"
                                alt="fork on GitHub"
                                height={(isMobile) ? 25 : 50}
                                width={(isMobile) ? 25 : 50}/>
                        </a>
                    </div>

                    {(isBrowser) ? bottomBarDesktop : bottomBarMobile}


                    <img style={{height: "auto", width: "30%", margin: 32}} alt="GDG logo" src="./img/logo.svg"/>

                    <div style={contentStyle}>

                        <div style={{textAlign: "center"}}>
                            <CanvasPanel scale={this.state.slider} stepIndex={stepIndex}/>
                        </div>

                    </div>
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
                        action={null/*todo <FlatButton backgroundColor="white" label="Refresh" onClick={()=>window.location.reload(true)} />*/}
                        message="New content is available; please refresh."
                        autoHideDuration={4000}
                        onClose={(event: object, reason: string) => this.props.notifyRefresh(false)}
                    />
                </div>
            </Provider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

