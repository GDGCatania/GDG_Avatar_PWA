import * as React from "react";
import {RootState} from './redux/configureStore';
import {connect} from 'react-redux';
import {BottomBarDesktop, BottomBarMobile} from './components/bottomBarDesktop'
import {Provider} from 'react-redux';
import {notifyOffline, notifyRefresh, setImageUrl} from './redux/modules/data';
import {isBrowser} from "react-device-detect";
import './style/App.css';
import SignerResult from "./components/SignerResult";
import SignerForm from "./components/SignerForm";


type ComponentProps = {
    store: any;
}

function mapStateToProps(state: RootState) {
    return {
        signForm: state.data.signForm,
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

const steps = 2;
class SignerApp extends React.Component<Props, State> {
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
            return false;
        }
        if (stepIndex === 0 && !this.validateForm()) return alert("Please compile form");
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

    validateForm(){
        let user = this.props.signForm;

        if(!user.firstName || !user.lastName || !user.role) return false;
        if(user.firstName.trim().length < 0 || user.lastName.trim().length < 0 || user.role.trim().length < 0) return false;
        return true;
    }

    render() {
        const {stepIndex} = this.state;

        let currentPage;
        switch (stepIndex) {

            case 0:
                currentPage = <SignerForm/>;
                break;
            case 1:
                currentPage = <SignerResult/>;
                break;
            default:
                currentPage = <SignerForm/>;
                break;
        }

        return (
            <Provider store={this.props.store}>
                <div className="SignerApp">

                    {currentPage}

                    {(isBrowser) ? <BottomBarDesktop stepCount={steps} stepIndex={stepIndex} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)} /> : <BottomBarMobile stepIndex={stepIndex} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)}/>}
                </div>
            </Provider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignerApp);

