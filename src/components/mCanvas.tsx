import * as React from 'react';
import {connect} from 'react-redux';
import {
    setCanvasUrl,
} from '../redux/modules/data';
import {TextField, FormControlLabel, Switch} from '@material-ui/core';
import {RootState} from "../redux/configureStore";
import '../style/App.css'


function mapStateToProps(state: RootState) {
    return {
        imageUrl: state.data.imageUrl,
        cropping: state.data.cropping,
        canvasUrl: state.data.canvasUrl,
    }
}

const mapDispatchToProps = {
    setCanvasUrl
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type State = {
    timeout: number | undefined;
    finished: boolean;
    gdgName: string;
    logoWtm: HTMLImageElement;
    frame: HTMLImageElement;
    image: HTMLImageElement;
    wtm: boolean,
    bw: boolean,
    blackText: boolean
}

class Canvas extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const _logoWtm = new Image();
        _logoWtm.src = './img/logowtm.svg';
        _logoWtm.addEventListener('load', () => this.drawCanvas());
        const _frame = new Image();
        _frame.src = "./img/frame_nuovo.svg";
        _frame.addEventListener('load', () => this.drawCanvas());
        const _image = new Image();
        _image.src = this.props.imageUrl;
        _image.addEventListener('load', () => this.drawCanvas());

        this.state = {
            timeout: undefined,
            gdgName: "Catania",
            finished: false,
            logoWtm: _logoWtm,
            frame: _frame,
            image: _image,
            wtm: true,
            bw: false,
            blackText: true
        };
    }

    drawCanvas() {
        let canvas = document.getElementById("imageCanvas") as HTMLCanvasElement;
        if(!canvas) return;
        let ctx = canvas.getContext("2d");
        if (ctx == null) return;
        let cropping = this.props.cropping;

        let image = this.state.image;

        let imageStartCropX = image.width / 100 * (cropping.x ?? 0);
        let imageStartCropY = image.height / 100 * (cropping.y ?? 0);

        let imageEndAnchorX = image.width / 100 * (cropping.width ?? 0);
        let imageEndAnchorY = image.height / 100 * (cropping.height ?? 0);

        ctx.drawImage(image,
            imageStartCropX, imageStartCropY, imageEndAnchorX, imageEndAnchorY,
            0,0, canvas.height, canvas.width
        );

        this.applyEffects(ctx, canvas);
        this.applyText(ctx, canvas);
        this.applyLogoFrame(ctx, canvas);

        this.props.setCanvasUrl(canvas.toDataURL());
    }

    applyEffects(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        if (this.state.bw)
            this.applyBlackAndWhite(ctx, canvas);
    }

    applyText(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        if (this.state.blackText) ctx.fillStyle = 'black';
        else ctx.fillStyle = 'white';
        let textPadding = 16;
        let fontSize = 100;
        ctx.font = "500 " + fontSize + "px " + "product sans";
        let gdgName = this.state.gdgName;
        let textWidth = ctx.measureText(gdgName).width;
        ctx.fillText(gdgName, canvas.height - textWidth - textPadding, fontSize + textPadding);
    }

    applyLogoFrame(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        let frame = this.state.frame;
        let new_height = frame.height / frame.width * canvas.width;
        ctx.drawImage(frame, 0, canvas.height - new_height, canvas.width, new_height);

        if (this.state.wtm) {
            let WTMLogoSize = canvas.width / 4;
            let wtmPadding = 32;
            ctx.drawImage(this.state.logoWtm, wtmPadding, wtmPadding, WTMLogoSize, WTMLogoSize);
        }
    }

    applyBlackAndWhite(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
            data[i] = brightness; // red
            data[i + 1] = brightness; // green
            data[i + 2] = brightness; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    }


    render() {
        const WtmToggled = (e: any, toggle: boolean) => {
            this.setState({wtm: toggle}, ()=>this.drawCanvas());
        };
        const BWToggled = (e: any, toggle: boolean) => {
            this.setState({bw: toggle}, ()=>this.drawCanvas());
        };
        const BlackTextToggled = (e: any, toggle: boolean) => {
            this.setState({blackText: toggle}, ()=>this.drawCanvas());
        };
        const setName = (event: any) => {
            let newValue = event.target.value;
            window.clearTimeout(this.state.timeout);
            this.setState({
                gdgName: newValue,
                timeout: window.setTimeout(() => this.drawCanvas(), 500)
            });
        };
        return (
            <div className={"imageStylingPanel"}>
                <canvas width={1200} height={1200} id="imageCanvas"/>
                <img alt="avatar preview" src={this.props.canvasUrl} id="imagePreview"/>

                <div className={"stylePanel"}>
                    <TextField onChange={setName} label={"GDG chapter"} color={"primary"} variant="outlined" margin="dense" value={this.state.gdgName}/>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.wtm}
                                onChange={WtmToggled}
                                color={"primary"}
                            />
                        }
                        label="WTM logo"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.bw}
                                onChange={BWToggled}
                                color={"primary"}
                            />
                        }
                        label="Black & white"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.blackText}
                                onChange={BlackTextToggled}
                                color={"primary"}
                            />
                        }
                        label="Black chapter text"
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);