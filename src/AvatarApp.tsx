import * as React from "react";
import {RootState} from './redux/configureStore';
import {connect} from 'react-redux';
import CanvasPanel from './components/CanvasPanel'
import {BottomBarDesktop, BottomBarMobile} from './components/bottomBarDesktop'
import {Provider} from 'react-redux';
import {notifyOffline, notifyRefresh, setImageUrl} from './redux/modules/data';
import {isBrowser} from "react-device-detect";
import './style/App.css';


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
type State = {
    stepIndex: number;
    slider: number;
}

const steps = 4;
class AvatarApp extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {stepIndex: 0, slider: 0};
    }

    componentDidUpdate() {
        if (this.state.stepIndex === 0 && this.props.image) this.handleNext();
    }

    handleNext(){
        const {stepIndex} = this.state;
        if (stepIndex === steps - 1) {
            this.setState({stepIndex: 0});
            this.props.setImageUrl("");
            return false;
        }
        if (stepIndex === 0 && !this.props.image) return alert("Please upload an image");
        this.setState({
            stepIndex: stepIndex + 1,
        });
    };

    handlePrev(){
        const {stepIndex} = this.state;
        if (stepIndex === 1) this.props.setImageUrl("");
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };


    render() {
        const {stepIndex} = this.state;

        return (
            <Provider store={this.props.store}>
                <div className="AvatarApp">

                    <div style={{textAlign: "center"}}>
                        <CanvasPanel stepIndex={stepIndex}/>
                    </div>

                    {(isBrowser) ? <BottomBarDesktop stepCount={steps} stepIndex={stepIndex} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)} /> : <BottomBarMobile stepIndex={stepIndex} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)}/>}
                </div>
            </Provider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarApp);

