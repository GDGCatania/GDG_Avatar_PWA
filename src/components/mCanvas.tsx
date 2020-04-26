import * as React from 'react';
import {connect} from 'react-redux';
import {isBrowser} from "react-device-detect";
import {
    setBW,
    setWTM,
    setTextColor,
    setCanvasUrl,
    setCanvas
} from '../redux/modules/data';
import {TextField, Checkbox} from '@material-ui/core';
import {RootState} from "../redux/configureStore";
import '../style/App.css'


type ComponentProps = {

}

function mapStateToProps(state: RootState) {
    return {
        image: state.data.image,
        imageUrl: state.data.imageUrl,
        wtm: state.data.wtm,
        bw: state.data.bw,
        blackText: state.data.blackText,
        cropping: state.data.cropping
    }
}

const mapDispatchToProps = {
    setBW,
    setWTM,
    setTextColor,
    setCanvasUrl,
    setCanvas
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
type State = {
    timeout: number | undefined;
    finished: boolean;
    name: string;
    logoWtm: HTMLImageElement;
    frame: HTMLImageElement;
}

class Canvas extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            timeout: undefined,
            name: "",
            finished: false,
            logoWtm: new HTMLImageElement(),
            frame: new HTMLImageElement()
        };
    }

    componentWillMount() {
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
        const canvas = document.getElementById("imgCanvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        if (ctx == null) return;
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
                let imageData = ctx.getImageData(0, 0, img.width, img.height);
                let data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    let brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
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
            this.props.setCanvasUrl(canvas.toDataURL());
            this.props.setCanvas(canvas);
        }, false);
        img.src = this.props.imageUrl;
    }

    render() {
        const WtmToggled = (e: any, toggle: boolean) => {
            this.props.setWTM(toggle);
            this.drawCanvas();
        };
        const BWToggled = (e: any, toggle: boolean) => {
            this.props.setBW(toggle);
            this.drawCanvas();
        };
        const BlackTextToggled = (e: any, toggle: boolean) => {
            this.props.setTextColor(toggle);
            this.drawCanvas();
        };
        const setName = (event: any) => {
            let newValue = event.target.value;
            window.clearTimeout(this.state.timeout);
            this.setState({name: newValue});
            this.setState({timeout: window.setTimeout(() => this.drawCanvas(), 500)});
        };
        const inputStyle = {
            height: "36px",
            width: "100%",
            borderColor: "lightgray",
            borderStyle: "solid",
            borderRadius: "5px",
            borderWidth: "1px",
            display: "block"
        };
        return (
            <div>
                <div className={"stylePanel " + (isBrowser)?"desktop":"mobile"}>
                    <Checkbox
                        value="WTM"
                        checked={this.props.wtm}
                        onChange={WtmToggled}
                        style={{marginTop: 16, width: "15%"}}
                    />
                    <Checkbox
                        value="Black & White"
                        checked={this.props.bw}
                        onChange={BWToggled}
                        style={{marginTop: 16, width: "15%"}}
                    />
                    <Checkbox
                        value="Black Text"
                        checked={this.props.blackText}
                        onChange={BlackTextToggled}
                        style={{marginTop: 16, width: "15%"}}
                    />
                    <TextField onChange={setName}
                               style={inputStyle} placeholder={"GDG name"}/>
                </div>
                <canvas id="imgCanvas"/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);