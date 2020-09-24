import React from "react";
import { TextField } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import {Phone, Twitter, Facebook, Telegram, YouTube, Language, Info} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
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
    form: SignForm,
    tooltipPhotoUrlOpen: boolean
}


class SignerForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            form: props.signForm,
            tooltipPhotoUrlOpen: false
        };
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let {name, value} = event.target;
        let updateForm = this.state.form;
        // @ts-ignore
        updateForm[name] = value;
        this.setState({form: updateForm}, ()=>this.props.setSignForm(this.state.form));
    }

    async imgUpload(event: React.ChangeEvent<HTMLInputElement>){
        const image = (document.getElementById("inputImage") as HTMLInputElement).files?.[0];
        if(image == null) return;
        const src = await this.toBase64(image);

        let updateForm = this.state.form;
        // @ts-ignore
        updateForm["image"] = src;
        this.setState({form: updateForm}, ()=>this.props.setSignForm(this.state.form));
    }

    toBase64(file: File){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    render() {
        let tooltipPhotoUrl = "We need a photo loaded somewhere in cloud because email providers wouldn't allow large image to be used in signature."

        return (
            <div className={"SignForm horizontalFlow"}>
                <div className={"ids verticalFlow"}>
                    <TextField required label={"Url to photo"} name={"image"} value={this.state.form.image} onChange={this.handleChange.bind(this)}  InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip open={this.state.tooltipPhotoUrlOpen} title={tooltipPhotoUrl}><Info onClick={()=>this.setState({tooltipPhotoUrlOpen: !this.state.tooltipPhotoUrlOpen})} fontSize="small" style={{color: "#7d7d7d", cursor: "pointer"}} /></Tooltip></InputAdornment>)}} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField required label={"First name"} name={"firstName"} value={this.state.form.firstName} onChange={this.handleChange.bind(this)} color={"primary"} variant="outlined" margin="dense" style={{marginTop: "26px"}}/>
                    <TextField required label={"Last name"} name={"lastName"} value={this.state.form.lastName} onChange={this.handleChange.bind(this)} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField required label={"Role"} name={"role"} value={this.state.form.role} onChange={this.handleChange.bind(this)} color={"primary"} variant="outlined" margin="dense"/>
                </div>
                <div className={"contacts verticalFlow"}>
                    <TextField required label={"Website"} name={"website"} value={this.state.form.website} onChange={this.handleChange.bind(this)} InputProps={{endAdornment: (<InputAdornment position="start"><Language /></InputAdornment>)}} color={"primary"} variant="outlined" margin="dense"/>
                    <TextField label={"Phone number"} name={"phoneNumber"} value={this.state.form.phoneNumber} onChange={this.handleChange.bind(this)} InputProps={{endAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>)}} color={"primary"} variant="outlined" margin="dense"/>
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