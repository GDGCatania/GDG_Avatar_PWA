import * as React from 'react';
import {connect} from 'react-redux';
import {
    setCanvasUrl,
} from '../redux/modules/data';
import {TextField, FormControlLabel, Switch} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
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
    squarePlaceholderUrl: string;
    logoWtm: HTMLImageElement;
    frame: HTMLImageElement;
    image: HTMLImageElement;
    wtm: boolean,
    bw: boolean,
    blackText: boolean,
    loadingCount: number
}

class Canvas extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            timeout: undefined,
            gdgName: "",
            finished: false,
            squarePlaceholderUrl: this.getSquarePlaceholderImage(),
            logoWtm: new Image(),
            frame: new Image(),
            image: new Image(),
            wtm: true,
            bw: false,
            blackText: true,
            loadingCount : 3
        };
    }

    isIOS() {
        return [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    }

    async componentDidMount(){
        const logoWtm = new Image();
        const frame = new Image();
        const image = new Image();

        let wtmUrl = "img/logo_wtm_brush.svg";
        let frameUrl = "img/frame_gdg_avatar.svg";
        let imageUrl = this.props.imageUrl;

        logoWtm.setAttribute("data-src", wtmUrl);
        frame.setAttribute("data-src", frameUrl);
        image.setAttribute("data-src", imageUrl);

        if (window.Worker && !this.isIOS()) {
            let worker = new Worker("./WebWorkers/LoadHeavySvg.worker.js") ;//new WebWorker() as Worker;
            if(worker == null)
                return;

            worker.postMessage(wtmUrl);
            worker.postMessage(frameUrl);
            worker.postMessage(imageUrl);

            worker.addEventListener("message", event => {
                const imageData = event.data;
                const objectURL = URL.createObjectURL(imageData.blob);
                switch (event.data.imageURL) {
                    case wtmUrl:
                        this.setState({logoWtm: logoWtm}, ()=>this.handleWorkerResponse(logoWtm, objectURL));
                        break;
                    case frameUrl:
                        this.setState({frame: frame}, ()=>this.handleWorkerResponse(frame, objectURL));
                        break;
                    case imageUrl:
                        this.setState({image: image}, ()=>this.handleWorkerResponse(image, objectURL));
                        break;
                }
            });
        }
        else{
            logoWtm.src = wtmUrl;
            logoWtm.addEventListener('load', () => {
                this.setState({logoWtm}, this.decreaseLoadingCounter);
            });

            frame.src = frameUrl;
            frame.addEventListener('load', () => {
                this.setState({frame}, this.decreaseLoadingCounter);
            });

            image.src = imageUrl;
            image.addEventListener('load', () => {
                this.setState({image}, this.decreaseLoadingCounter);
            });
        }
    }

    handleWorkerResponse(img: HTMLImageElement, objectURL: string){
        img.addEventListener("load",  () => {
            img.removeAttribute("data-src");
            this.decreaseLoadingCounter();
            URL.revokeObjectURL(objectURL);
        });
        img.setAttribute('src', objectURL);
    }

    decreaseLoadingCounter(){
        this.setState({loadingCount: this.state.loadingCount - 1}, ()=>{
            if(this.state.loadingCount <= 0)this.drawCanvas()
        });
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

        canvas.toBlob((blob)=>{
            this.props.setCanvasUrl(URL.createObjectURL(blob));
        })
    }

    getSquarePlaceholderImage():string{
        let canvas = document.createElement("Canvas") as HTMLCanvasElement;
        canvas.width = canvas.height = 1200;
        if(!canvas) return "";
        let ctx = canvas.getContext("2d");
        if (ctx == null) return "";

        let image = new Image(1200, 1200);

        ctx.drawImage(image, 0, 0);

        return canvas.toDataURL();
    }

    applyEffects(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        if (this.state.bw)
            this.applyBlackAndWhite(ctx, canvas);
    }

    applyText(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        if (this.state.blackText) ctx.fillStyle = 'black';
        else ctx.fillStyle = 'white';
        let textPadding = 32;
        let fontSize = 100;
        ctx.font = "500 " + fontSize + "px Open Sans";
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
            <div className={"imageStylingPanel"} >
                <canvas width={1200} height={1200} id="imageCanvas"/>

                <div className={"avatarImageContainer"}>
                    {this.props.canvasUrl
                        ? <img alt="avatar preview" src={this.props.canvasUrl} id="imagePreview"/>
                        : <Skeleton style={{maxWidth: "100%"}} variant="rect"><img alt="skeleton placeholder" src={this.state.squarePlaceholderUrl} className="imageFit"/></Skeleton>}
                </div>

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