import * as React from 'react';
import UploadIcon from '@material-ui/icons/Publish';
import DownloadIcon from '@material-ui/icons/GetApp';
import Canvas from './mCanvas'
import Cropper from './Cropper'
import {connect} from 'react-redux';
import {
    setCropping,
    setImageUrl
} from '../redux/modules/data';
import {RootState} from "../redux/configureStore";
import '../style/App.css'


type ComponentProps = {
    stepIndex : number
}

function mapStateToProps(state: RootState) {
    return {
        imageUrl: state.data.imageUrl,
        canvasUrl: state.data.canvasUrl,
        cropping: state.data.cropping,
    }
}

const mapDispatchToProps = {
    setCropping,
    setImageUrl
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
type State = {
    finished: boolean;
}


class CanvasPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            finished: false
        };
    }


    render() {
        //only for edge pre-chromium other browser use href params
        const downloadImg = () => {
            let filename = "avatar" + Math.round((new Date()).getTime() / 1000) + ".png";// Produces a unique file gdgName every second.
            if (window.navigator.userAgent.indexOf("Edge") > -1){
                // @ts-ignore
                window.navigator.msSaveBlob(this.props.canvas.msToBlob(), filename); // Save the user's drawing to a file.
            } // saveCanvas
        }

        const imgUpload = () => {
            const image = (document.getElementById("inputImage") as HTMLInputElement).files?.[0];
            const url = window.URL || window.webkitURL;
            const src = url.createObjectURL(image);
            this.props.setImageUrl(src);

        };

        switch (this.props.stepIndex) {
            case 0:
                return (
                    <div>
                        <p>Upload an image</p>
                        <div id="masterButton">
                            <label className="custom-file-upload">
                                <input id="inputImage" name={"image"} onChange={imgUpload} type="file" accept="image/*,capture=camera"/>
                                <div style={{backgroundImage: `url(${this.props.imageUrl ?? ""})`, border: (this.props.imageUrl)?"initial":"1px solid rgba(0, 0, 0, 0.23)"}} >
                                    {!this.props.imageUrl && <UploadIcon fontSize="large" style={{margin: "auto"}} color={"primary"}/>}
                                </div>
                            </label>
                        </div>
                        <p>Recommended resolution for your photo is 1200x1200.</p>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <p>Crop the image</p>
                        <Cropper/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <p>Customize</p>
                        <Canvas/>
                    </div>
                    );
            case 3:
                return (
                    <div>
                        <p>Download the Avatar!</p>
                        <div id="masterButton" style={{width: "max-content"}}>
                            <a id="download" href={this.props.canvasUrl} onClick={downloadImg} download={"avatar" + Math.round((new Date()).getTime() / 1000) + ".png"}/>
                            <label className="custom-file-upload">
                                <img alt={"Avatar download preview"} src={this.props.canvasUrl} style={{filter: "blur(1px)",objectFit:"contain", maxHeight: "100%", maxWidth: "100%", border: (this.props.canvasUrl)?"initial":"1px solid rgba(0, 0, 0, 0.23)"}} />
                                <div style={{position: "absolute", backgroundColor: "#00000033"}}><DownloadIcon style={{margin: "auto"}} fontSize="large" color={"primary"}/></div>
                            </label>
                        </div>
                    </div>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasPanel);