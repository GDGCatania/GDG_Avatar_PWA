import React from "react";
import {RootState} from "../redux/configureStore";
import { connect } from "react-redux";
import '../style/App.css'
import '../style/SignStyle.css'

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
        let user = this.props.signForm;
        return (
            <div className={"SignerResult horizontalFlow"}>
                <table cellPadding={0} cellSpacing={0} id={"sign"}>

                    <tbody><tr className="colLine">
                        <td style={{background:"#ea4335"}}/>
                        <td style={{background:"#4285f4"}}/>
                        <td style={{background:"#34a853"}}/>
                        <td style={{background:"#fbbc05"}}/>
                        <td style={{width:"auto"}}/>
                    </tr>

                    <tr className="blank">
                        <td colSpan={5}/>
                    </tr>

                    <tr className="infoBox">
                        <td className="picture" colSpan={4} valign="middle">
                            <img src={user.image} alt={"user"}/>
                        </td>
                        <td className="info" valign="middle">
                            <span><span className={"red"}>•&nbsp;</span><strong style={{color:"#666666"}}>{user.firstName + " " + user.lastName}</strong></span><br/>
                            <span className={"blue"}>•&nbsp;</span><span>{user.role}</span><br/>
                            <span className={"green"}>•&nbsp;</span><span><a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></span><br/>
                            <span className={"yellow"}>•&nbsp;</span><span><a href={"tel:"+user.phoneNumber}>{user.phoneNumber}</a></span>&nbsp;|
                            <a href={user.telegram}>Telegram</a>&nbsp;|
                            <a href={user.twitter}>Twitter</a>&nbsp;|
                            <a href={user.facebook}>Facebook</a>&nbsp;|
                            <a href={user.youtube}>Youtube</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default connect(mapStateToProps)(SignForm);