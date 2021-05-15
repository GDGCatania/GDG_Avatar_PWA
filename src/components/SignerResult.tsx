import React from "react";
import {RootState} from "../redux/configureStore";
import { connect } from "react-redux";
import '../style/App.css'

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

let linkStyle = {color: "#3c78d8", textDecoration: "none"};
let signTableStyle = {textAlign: "start", width: "400px", border: "0 solid black"} as React.CSSProperties;
let tableDataStyle = {lineHeight: 0, height: "3px", width: "20px"};
let blankTableRowStyle = {border: "0 solid black", height: "10px", background: "transparent"};
let infoBoxStyle = {background: "#f3f3f3"};
let tableDataImageStyle = {padding: 0, textAlign: "center", background: "transparent", borderRadius: "6px 0px 0px 6px", WebkitBorderRadius: "6px 0px 0px 6px", MozBorderRadius: "6px 0px 0px 6px" /* Purtroppo su FF opera solo sul bordo e non sul background della cella */} as React.CSSProperties;
let tableDataInfoStyle = {lineHeight: "16px", fontFamily: "arial, sans-serif", fontSize: "10px", color: "#808080", padding: "8px 8px 8px 0", borderRadius: "0px 6px 6px 0px", WebkitBorderRadius: "0px 6px 6px 0px", MozBorderRadius: "0px 6px 6px 0px"};


let linkSeparation = ' | ';

class SignForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            form: props.signForm
        };
    }

    componentDidMount(){
        let hList = document.getElementsByClassName("horizontalList")[0];
        if(!hList || hList.childElementCount === 0) return true;
        let lastSpan = hList.lastChild as HTMLElement;
        if (lastSpan && lastSpan.innerHTML.endsWith(linkSeparation))
            lastSpan.innerHTML = lastSpan.innerHTML.substr(0, lastSpan.innerHTML.lastIndexOf(linkSeparation));
    }

    /*Style needs to be inline for sign to be copied in email text*/
    render() {
        let user = this.props.signForm;
        return (
            <div id={"result"} style={{textAlign:"center", margin:"auto", width:"min-content", backgroundColor:"white"}} className={"SignerResult"}>
                <table cellPadding={0} cellSpacing={0} style={signTableStyle} id={"sign"}>
                    <tbody>
                        <tr className="colLine">
                            <td style={{...tableDataStyle, background:"#ea4335"}}/>
                            <td style={{...tableDataStyle, background:"#4285f4"}}/>
                            <td style={{...tableDataStyle, background:"#34a853"}}/>
                            <td style={{...tableDataStyle, background:"#fbbc05"}}/>
                            <td style={{...tableDataStyle, width:"auto"}}/>
                        </tr>

                        <tr style={blankTableRowStyle}>
                            <td colSpan={5} style={{lineHeight: 0, height: "10px"}}/>
                        </tr>

                        <tr className="infoBox" style={infoBoxStyle}>
                            <td className="picture" colSpan={4} valign="middle" style={tableDataImageStyle}>
                                <img src={user.image} alt={"user"} style={{width: "82%"}}/>
                            </td>
                            <td className="info" valign="middle" style={tableDataInfoStyle}>
                                <span style={{color: "#ea4335"}}>•&nbsp;</span><strong style={{color:"#666666"}}>{user.firstName + " " + user.lastName}</strong><br/>
                                <span style={{color: "#4285f4"}}>•&nbsp;</span><span>{user.role}</span><br/>
                                <span style={{color: "#34a853"}}>•&nbsp;</span><a style={linkStyle} href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a><br/>
                                <span style={{color: "#fbbc05"}}>•&nbsp;</span>

                                <span className="horizontalList">
                                    {user.phoneNumber && <span><a style={linkStyle} href={"tel:"+user.phoneNumber} target="_blank" rel="noopener noreferrer">{user.phoneNumber}</a>{linkSeparation}</span>}
                                    {user.telegram && <span><a style={linkStyle} href={user.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>{linkSeparation}</span>}
                                    {user.twitter && <span><a style={linkStyle} href={user.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>{linkSeparation}</span>}
                                    {user.facebook && <span><a style={linkStyle} href={user.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>{linkSeparation}</span>}
                                    {user.youtube && <span><a style={linkStyle} href={user.youtube} target="_blank" rel="noopener noreferrer">Youtube</a>{linkSeparation}</span>}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default connect(mapStateToProps)(SignForm);