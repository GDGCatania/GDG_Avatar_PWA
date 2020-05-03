import { AnyAction } from "redux";
import {CroppedRect} from "../../AppTypes";

export type DataState = {
    imageUrl: string,
    cropping: ReactCrop.Crop,
    canvasUrl: string,
    offline: boolean,
    refresh: boolean
}

export const INITIAL_STATE: DataState = {
    imageUrl: "",
    cropping: {unit:'%', aspect: 1, width: 100, height: 100, x: 0, y:0},
    canvasUrl:"",
    offline:false,
    refresh:false
}

export const setImageUrl = (value: string | undefined): AnyAction => ({
    type: 'UPDATING_IMAGE_URL',
    payload: value
});
export const setCropping = (value: ReactCrop.Crop | undefined) : AnyAction=> ({
    type: 'UPDATING_CROPPING',
    payload: value || INITIAL_STATE.cropping
});
export const setCanvasUrl= (value: string | undefined): AnyAction  => ({
    type: 'UPDATING_CANVAS_URL',
    payload: value
});
export const notifyOffline = (value: boolean) : AnyAction=> ({
    type: 'NOTIFY_OFFLINE',
    payload: value
});
export const notifyRefresh = (value: boolean): AnyAction => ({
    type: 'NOTIFY_REFRESH',
    payload: value
});

type dataActions = ReturnType<
    typeof setImageUrl |
    typeof setCropping |
    typeof setCanvasUrl |
    typeof notifyOffline |
    typeof notifyRefresh
    >;

export default function dataReducer(state:DataState = INITIAL_STATE, action: dataActions): DataState {
    switch (action.type) {
        case 'UPDATING_IMAGE_URL':
            return Object.assign({},state,{imageUrl:action.payload});
        case 'UPDATING_WTM':
            return Object.assign({},state,{wtm:action.payload});
        case 'UPDATING_BW':
            return Object.assign({},state,{bw:action.payload});
        case 'UPDATING_TEXT_COLOR':
            return Object.assign({},state,{blackText:action.payload});
        case 'UPDATING_CROPPING':
            return Object.assign({},state,{cropping:action.payload});
        case 'UPDATING_CANVAS_URL':
            return Object.assign({},state,{canvasUrl:action.payload});
        case 'NOTIFY_OFFLINE':
            return Object.assign({},state,{offline:action.payload});
        case 'NOTIFY_REFRESH':
            return Object.assign({},state,{refresh:action.payload});
        default:
            return state;
    }
}


