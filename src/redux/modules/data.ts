import { AnyAction } from "redux";
import {SignForm} from "../../AppTypes";

export type DataState = {
    imageUrl: string,
    cropping: ReactCrop.Crop,
    canvasUrl: string,
    offline: boolean,
    refresh: boolean,
    signForm: SignForm
}

export const INITIAL_STATE: DataState = {
    imageUrl: "",
    cropping: {unit:'%', aspect: 1, x: 0, y:0},
    canvasUrl:"",
    offline:false,
    refresh:false,
    signForm: {}
}

/* Avatar */
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

/* Signer */
export const setSignForm = (value: SignForm): AnyAction => ({
    type: 'UPDATING_SIGN_FORM',
    payload: value
});

type dataActions = ReturnType<
    typeof setImageUrl |
    typeof setCropping |
    typeof setCanvasUrl |
    typeof notifyOffline |
    typeof notifyRefresh |
    typeof setSignForm
    >;

export default function dataReducer(state:DataState = INITIAL_STATE, action: dataActions): DataState {
    switch (action.type) {
        /* Avatar */
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

        /* Signer */
        case 'UPDATING_SIGN_FORM':
            return Object.assign({},state,{signForm:action.payload});
        default:
            return state;
    }
}


