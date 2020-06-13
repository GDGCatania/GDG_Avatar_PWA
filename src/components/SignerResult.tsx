import React from "react";
import { TextField } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import {Phone, Twitter, Facebook, Telegram, YouTube, Language} from '@material-ui/icons';
import {RootState} from "../redux/configureStore";
import { connect } from "react-redux";
import '../style/App.css'
import {setSignForm} from "../redux/modules/data";

import {SignForm as SignFormType} from "../AppTypes";

function mapStateToProps(state: RootState) {
    return {
        signForm: state.data.signForm
    }
}

type Props = ReturnType<typeof mapStateToProps>;

type State = {
    form: SignFormType
}


class SignForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            form: props.signForm
        };
    }

    render() {
        return (
            <div className={"SignerResult horizontalFlow"}>

            </div>
        );
    }
}
export default connect(mapStateToProps)(SignForm);