import * as React from "react";
import {RootState} from './redux/configureStore';
import {connect} from 'react-redux';
import {BottomBarDesktop, BottomBarMobile} from './components/bottomBarDesktop'
import {Provider} from 'react-redux';
import {notifyOffline, notifyRefresh, setImageUrl} from './redux/modules/data';
import {isBrowser} from "react-device-detect";
import SignerResult from "./components/SignerResult";
import SignerForm from "./components/SignerForm";
import './style/App.css';


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
        if (stepIndex === 0 && !this.validateForm()) return alert("Please compile the form");
        if (stepIndex === steps-1) return this.copyHtml();
        this.setState({
            stepIndex: stepIndex + 1,
        });
    }

    handlePrev(){
        const {stepIndex} = this.state;
        if (stepIndex === 1) this.props.setImageUrl("");
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }else window.location.href = "/";
    }

    copyHtml(){
        try {
            let select = document.execCommand("selectAll");
            let copy = document.execCommand('copy');
            if(select && copy) alert("Sign copied! Paste into your emails!");
            else alert("Impossible to automatically copy the sign, press ctrl+A and then ctrl+c (⌘+a and then ⌘+c on Mac) or manually select the sign");
        } catch (err) {
            alert("Impossible to automatically copy the sign, press ctrl+A and then ctrl+c (⌘+a and then ⌘+c on Mac) or manually select the sign");
        }
    }

    validateForm(){
        let user = this.props.signForm;

        if(!user.image || !user.firstName || !user.lastName || !user.role || !user.website) return false;
        if(user.firstName.trim().length < 0 || user.lastName.trim().length < 0 || user.role.trim().length < 0 || user.website.trim().length < 0) return false;
        return true;
    }

    render() {
        const {stepIndex} = this.state;

        let currentPage;
        let title;
        switch (stepIndex) {

            case 0:
                title = <p>Insert data</p>
                currentPage = <SignerForm/>;
                break;
            case 1:
                title = <p className={"unselectable"}>Get the signature!</p>
                currentPage = <SignerResult/>;
                break;
            default:
                currentPage = <SignerForm/>;
                break;
        }

        return (
            <Provider store={this.props.store}>
                <div className="SignerApp">
                    {title}
                    {currentPage}

                    {(isBrowser) ? <BottomBarDesktop stepCount={steps} stepIndex={stepIndex} finalButtonText={"Copy to clipboard"} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)} /> : <BottomBarMobile stepCount={steps} stepIndex={stepIndex} finalButtonText={"Copy to clipboard"} handleNext={this.handleNext.bind(this)} handlePrev={this.handlePrev.bind(this)}/>}
                </div>
            </Provider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignerApp);

