import React from 'react';
import {connect} from 'react-redux';
import { BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import {setBW, setWTM, setTextColor, setCanvasUrl} from '../redux/actions/index';
import { TextField, Checkbox } from 'material-ui';
import '../style/App.css'


class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {timeout: null, name: "", finished: false};
    }

    componentWillMount(nextProps, nextState) {
        const logoWtm = new Image();
        logoWtm.crossOrigin = 'anonymous';
        logoWtm.src = './img/logow.svg';
        this.setState({logoWtm: logoWtm});

        const frame = new Image();
        frame.crossOrigin = 'anonymous';
        frame.src = "./img/frame.svg";
        this.setState({frame: frame});
    }

    componentDidMount() {
        this.drawCanvas();
    }

    componentDidUpdate() {
        this.drawCanvas();
    }

    drawCanvas() {
        const canvas = document.getElementById("imgCanvas");
        const ctx = canvas.getContext("2d");
        const name = this.state.name;
        const blackText = this.props.blackText;
        const bw = this.props.bw;
        const wtm = this.props.wtm;
        const frame = this.state.frame;
        const cropping = this.props.cropping;
        const logoWtm = this.state.logoWtm;
        const img = new Image();
        img.addEventListener('load', () => {
            canvas.height = canvas.width;
            ctx.drawImage(
                img,
                -cropping.x * (canvas.width / cropping.width),
                -cropping.y * (canvas.height / cropping.height),
                canvas.width / cropping.width,
                canvas.height / cropping.height
            );
            if (bw) {
                var imageData = ctx.getImageData(0, 0, img.width, img.height);
                          var data = imageData.data;

                          for (var i = 0; i < data.length; i += 4) {
                            var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
                            // red
                            data[i] = brightness;
                            // green
                            data[i + 1] = brightness;
                            // blue
                            data[i + 2] = brightness;
                          }
                          // overwrite original image
                          ctx.putImageData(imageData, 0, 0);
            } else {
                canvas.setAttribute("style", "");
            }

            if (blackText) ctx.fillStyle = 'black';
            else ctx.fillStyle = 'white';
            ctx.font = "500 25px product sans";
            const textWidth = ctx.measureText(name).width;
            ctx.fillText(name, canvas.height - textWidth - 10, 30);

            if (wtm) {
                const widthWMT = 400;
                const new_height2 = logoWtm.height / logoWtm.width * widthWMT;
                ctx.drawImage(logoWtm, 10, 10, widthWMT, new_height2);
            }
            const new_height = frame.height / frame.width * canvas.width;
            ctx.drawImage(frame, 0, canvas.height - new_height, canvas.width, new_height);
            this.props.dispatch(setCanvasUrl(canvas.toDataURL()));
        }, false);
        img.src = this.props.imageUrl;
    }

    render() {
        const WtmToggled = (e, toggle) => {
            this.props.dispatch(setWTM(toggle));
            this.drawCanvas();
        };
        const BWToggled = (e, toggle) => {
            this.props.dispatch(setBW(toggle));
            this.drawCanvas();
        };
        const BlackTextToggled = (e, toggle) => {
            this.props.dispatch(setTextColor(toggle));
            this.drawCanvas();
        };
        const setName = (event, newValue) => {
            clearTimeout(this.state.timeout);
            this.setState({name: newValue});
            this.setState({timeout: setTimeout(() => this.drawCanvas(), 500)});
        };
        const inputStyle = {
            height: "36px",
            width: "100%",
            borderColor: "lightgray",
            borderStyle: "solid",
            borderRadius: "5px",
            borderWidth: "1px",
        };
        return (
            <div>
                <BrowserView device={isBrowser}>
                    <div className="stylePanel desktop">
                        <Checkbox
                            label="WTM"
                            checked={this.props.wtm}
                            onCheck={WtmToggled}
                            labelPosition="right"
                            style={{marginTop: 16, width: "15%"}}
                        />
                        <Checkbox
                            label="Black & White"
                            checked={this.props.bw}
                            onCheck={BWToggled}
                            labelPosition="right"
                            style={{marginTop: 16, width: "15%"}}
                        />
                        <Checkbox
                            label="Black Text"
                            checked={this.props.blackText}
                            onCheck={BlackTextToggled}
                            labelPosition="right"
                            style={{marginTop: 16, width: "15%"}}
                        />
                        <TextField onChange={setName} style={{display: "block"}}
                                   hintStyle={{bottom: 16, paddingLeft: 8}} underlineStyle={{display: "none"}}
                                   inputStyle={inputStyle} hintText={"GDG name"}/>
                    </div>
                </BrowserView>
                <MobileView device={isMobile}>
                    <div className="stylePanel mobile">
                        <Checkbox
                            label="WTM"
                            checked={this.props.wtm}
                            onCheck={WtmToggled}
                            labelPosition="right"
                            style={{marginTop: 16, width: "100%"}}
                        />
                        <Checkbox
                            label="Black & White"
                            checked={this.props.bw}
                            onCheck={BWToggled}
                            labelPosition="right"
                            style={{marginTop: 16, width: "100%"}}
                        />
                        <Checkbox
                            label="Black Text"
                            checked={this.props.blackText}
                            onCheck={BlackTextToggled}
                            labelPosition="right"
                            style={{marginTop: 16, width: "100%"}}
                        />
                        <TextField onChange={setName} style={{display: "block"}}
                                   hintStyle={{bottom: 16, paddingLeft: 8}} underlineStyle={{display: "none"}}
                                   inputStyle={inputStyle} hintText={"GDG name"}/>
                    </div>
                </MobileView>
                <canvas id="imgCanvas"/>
            </div>
        );
    }
}

Canvas.propTypes = {};

const mapStateToProps = (state) => {
    return {
        image: state.data.image,
        imageUrl: state.data.imageUrl,
        wtm: state.data.wtm,
        bw: state.data.bw,
        blackText: state.data.blackText,
        cropping: state.data.cropping
    }
};

export default connect(mapStateToProps)(Canvas);