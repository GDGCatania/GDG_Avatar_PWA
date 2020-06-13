import React from "react";
import { TextField } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import {Phone, Twitter, Facebook, Telegram, YouTube, Language, Publish} from '@material-ui/icons';
import {RootState} from "../redux/configureStore";
import { connect } from "react-redux";
import {setSignForm} from "../redux/modules/data";
import '../style/App.css'

import {SignForm} from "../AppTypes";

function mapStateToProps(state: RootState) {
    return {
        signForm: state.data.signForm
    }
}
const mapDispatchToProps = {
    setSignForm
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

type State = {
    form: SignForm
}


class SignerForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            form: props.signForm
        };
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let {name, value} = event.target;
        let updateForm = this.state.form;
        // @ts-ignore
        updateForm[name] = value;
        this.setState({form: updateForm}, ()=>this.props.setSignForm(this.state.form));
    }

    imgUpload(event: React.ChangeEvent<HTMLInputElement>){
        const image = (document.getElementById("inputSignImage") as HTMLInputElement).files?.[0];
        const url = window.URL || window.webkitURL;
        const src = url.createObjectURL(image);

        let updateForm = this.state.form;
        // @ts-ignore
        updateForm["image"] = src;
        this.setState({form: updateForm}, ()=>this.props.setSignForm(this.state.form));
    };

    render() {
        return (
            <div className={"SignForm horizontalFlow"}>
                <div className={"ids verticalFlow"} >
                    <label className="custom-file-upload">
                        <input id="inputSignImage"  name={"image"} onChange={this.imgUpload.bind(this)} type="file" accept="image/*,capture=camera"/>
                        <div style={{backgroundImage: `url(${this.state.form.image ?? ""})`, border: (this.state.form.image)?"initial":"1px solid rgba(0, 0, 0, 0.23)"}} >
                            {!this.state.form.image && <Publish style={{margin: "auto"}} color={"primary"}/>}
                        </div>
                    </label>
                    <br/>
                    <br/>
                    <TextField label={"First name*"} name={"firstName"} value={this.state.form.firstName} onChange={this.handleChange.bind(this)} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField label={"Last name*"} name={"lastName"} value={this.state.form.lastName} onChange={this.handleChange.bind(this)} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField label={"Role*"} name={"role"} value={this.state.form.role} onChange={this.handleChange.bind(this)} color={"primary"} variant="outlined" margin="dense"/>
                </div>
                <div className={"contacts verticalFlow"}>
                    <TextField label={"Phone number"} name={"phoneNumber"} value={this.state.form.phoneNumber} onChange={this.handleChange.bind(this)} InputProps={{endAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>)}} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField label={"Website"} name={"website"} value={this.state.form.website} onChange={this.handleChange.bind(this)} InputProps={{endAdornment: (<InputAdornment position="start"><Language /></InputAdornment>)}} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField label={"Telegram"} name={"telegram"} value={this.state.form.telegram} onChange={this.handleChange.bind(this)} InputProps={{endAdornment: (<InputAdornment position="start"><Telegram /></InputAdornment>)}} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField label={"Twitter"} name={"twitter"} value={this.state.form.twitter} onChange={this.handleChange.bind(this)} InputProps={{endAdornment: (<InputAdornment position="start"><Twitter /></InputAdornment>)}} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField label={"Facebook"} name={"facebook"} value={this.state.form.facebook} onChange={this.handleChange.bind(this)} InputProps={{endAdornment: (<InputAdornment position="start"><Facebook /></InputAdornment>)}} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField label={"Youtube"} name={"youtube"} value={this.state.form.youtube} onChange={this.handleChange.bind(this)} InputProps={{endAdornment: (<InputAdornment position="start"><YouTube /></InputAdornment>)}} color={"primary"} variant="outlined" margin="dense"/>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignerForm);