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
import {
    Button
} from '@material-ui/core';
import {RootState} from "../redux/configureStore";
import '../style/App.css'
import 'react-image-crop/dist/ReactCrop.css';


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
        /**
         * only for edge pre-chromium other browser use href params
         * */
        const downloadImg = () => {
            if (window.navigator.userAgent.indexOf("Edge") > -1){
                let drawingFileName = "avatar" + Math.round((new Date()).getTime() / 1000) + ".png"; // Produces a unique file gdgName every second.
                // @ts-ignore
                window.navigator.msSaveBlob(this.props.canvas.msToBlob(), drawingFileName); // Save the user's drawing to a file.
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
                        <div id="masterButton">
                            <UploadIcon color="primary"/>
                            <p>UPLOAD IMAGE</p>
                            <input id="inputImage" onChange={imgUpload} type="file" accept="image/*,capture=camera"/>
                        </div>
                        <p>Recommended resolution for your photo is 1200x1200.</p>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <p>Crop image</p>
                        <Cropper/>
                    </div>
                );
            case 2:
                return <Canvas/>;
            case 3:
                return (
                    <div id="masterButton">
                    <Button href={this.props.canvasUrl} variant="contained" disableElevation startIcon={<DownloadIcon/>} onClick={downloadImg} color="primary" download={"avatar" + Math.round((new Date()).getTime() / 1000) + ".png"} id="download">
                        Download Avatar!
                    </Button>
                    </div>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasPanel);