import * as React from 'react';
import UploadIcon from '@material-ui/icons/Publish';
import DownloadIcon from '@material-ui/icons/GetApp';
import Canvas from './mCanvas'
import {connect} from 'react-redux';
import {
    setCropping,
    setImage,
    setImageUrl
} from '../redux/modules/data';
import AvatarEditor from 'react-avatar-editor';
import {
    Slider,
    Button
} from '@material-ui/core';
import {RootState} from "../redux/configureStore";
import '../style/App.css'


type ComponentProps = {
    stepIndex : number,
    scale: number,
}

function mapStateToProps(state: RootState) {
    return {
        image: state.data.image,
        imageUrl: state.data.imageUrl,
        wtm: state.data.wtm,
        bw: state.data.bw,
        blackText: state.data.blackText,
        canvas: state.data.canvas,
        canvasUrl: state.data.canvasUrl,
    }
}

const mapDispatchToProps = {
    setCropping,
    setImage,
    setImageUrl
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
type State = {
    slider: number;
    editor: AvatarEditor,

    timeout: number | undefined;
    finished: boolean;
    name: string;
    logoWtm: HTMLImageElement;
    frame: HTMLImageElement;
}


class CanvasPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            slider: 1,
            editor: new AvatarEditor({image: this.props.imageUrl, scale: this.props.scale}),
            timeout: undefined,
            name: "",
            finished: false,
            logoWtm: new Image(),
            frame: new Image()
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

    handleSlider = (event: object, value: number | number[]) => {
        this.setState({slider: value as number});
    };


    render() {
        const setEditorRef = (editor: AvatarEditor) => {
            this.setState({editor});
        }
        /**
         * only for edge pre-chromium other browser use href params
         * */
        const downloadImg = () => {
            if (window.navigator.userAgent.indexOf("Edge") > -1){
                let drawingFileName = "avatar" + Math.round((new Date()).getTime() / 1000) + ".png"; // Produces a unique file name every second.
                // @ts-ignore
                window.navigator.msSaveBlob(this.props.canvas.msToBlob(), drawingFileName); // Save the user's drawing to a file.
            } // saveCanvas
        }

        const setCrop = () => {
            this.props.setCropping(this.state.editor.getCroppingRect());
        };

        const Cropper = () => (
            <AvatarEditor
                ref={setEditorRef}
                image={this.props.imageUrl}
                onMouseUp={setCrop}
                width={600}
                onImageReady={setCrop}
                height={600}
                border={0}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={this.state.slider}
                rotate={0}
            />
        );

        const imgUpload = () => {
            const image = (document.getElementById("inputImage") as HTMLInputElement).files?.[0];
            const url = window.URL || window.webkitURL;
            const src = url.createObjectURL(image);
            this.props.setImageUrl(src);
            this.props.setImage(true);

        };

        switch (this.props.stepIndex) {
            case 0:
                return (
                    <div>
                        <div style={{
                            margin: "0",
                            height: "50vh",
                            width: "100%",
                            backgroundColor: 'lightGrey',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            position: 'relative'
                        }}>
                            <UploadIcon color="primary"/>
                            <p color="primary">UPLOAD IMAGE</p>
                            <input id="inputImage" onChange={imgUpload} type="file" accept="image/*,capture=camera"/>
                        </div>
                        <p>Recommended resolution for your photo is 600x600.</p>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <div>
                            <p>Scale Image</p>
                            <Slider
                                style={{width: "30%", margin: "auto"}}
                                min={1}
                                max={10}
                                step={0.1}
                                value={this.state.slider}
                                onChange={this.handleSlider}
                            />
                        </div>
                        <Cropper/>
                    </div>
                );
            case 2:
                return <Canvas/>;
            case 3:
                return (
                    <a href={this.props.canvasUrl} onClick={downloadImg}
                       download={"avatar" + Math.round((new Date()).getTime() / 1000) + ".png"} id="download">
                        <Button color="primary" startIcon={<DownloadIcon/>}>
                            Download Avatar!
                        </Button>
                    </a>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasPanel);