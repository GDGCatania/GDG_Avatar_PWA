import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {RootState} from "../redux/configureStore";
import {setCropping, setImageUrl} from "../redux/modules/data";
import { connect } from "react-redux";
import '../style/App.css'


function mapStateToProps(state: RootState) {
    return {
        imageUrl: state.data.imageUrl,
        cropping: state.data.cropping
    }
}
const mapDispatchToProps = {
    setCropping,
    setImageUrl
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

type State = {
    crop: ReactCrop.Crop
}

class Cropper extends PureComponent<Props, State> {
    state = {
        crop: this.props.cropping
    };

    onCropComplete = (crop: ReactCrop.Crop,  percentCrop: ReactCrop.Crop) => {
        this.props.setCropping(percentCrop);
    };

    onCropChange = (crop: ReactCrop.Crop, percentCrop: ReactCrop.Crop) => {
        this.setState({ crop: percentCrop });
    };

    render() {

        return (
            <div className="Cropper" id="cropPreview">
                {this.props.imageUrl && (
                    <ReactCrop
                        src={this.props.imageUrl}
                        crop={this.state.crop as ReactCrop.Crop}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                )}
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cropper);