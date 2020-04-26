import { AnyAction } from "redux";
import { CroppedRect } from "react-avatar-editor";

export type DataState = {
    image: boolean,
    imageUrl: string,
    wtm: boolean,
    bw: boolean,
    blackText: boolean,
    cropping: CroppedRect,
    canvasUrl: string,
    canvas: HTMLCanvasElement,
    offline: boolean,
    refresh: boolean
}

export const INITIAL_STATE: DataState = {
    image:false,
    imageUrl: "http://placehold.it/1400x1200",
    wtm: true,
    bw: false,
    blackText: true,
    cropping: {x: 0, y: 0, height: 0, width: 0},
    canvasUrl:"",
    canvas: document.getElementById("imgCanvas") as HTMLCanvasElement,//todo check
    offline:false,
    refresh:false
}

export const setImage = (value: boolean) : AnyAction=>({
    type: 'UPDATING_IMAGE',
    payload: value
});
export const setImageUrl = (value: string | undefined): AnyAction => ({
    type: 'UPDATING_IMAGE_URL',
    payload: value
});
export const setWTM = (value: boolean) : AnyAction=> ({
    type: 'UPDATING_WTM',
    payload: value
});
export const setBW = (value: boolean) : AnyAction => ({
    type: 'UPDATING_BW',
    payload: value
});
export const setTextColor = (value: boolean): AnyAction => ({
    type: 'UPDATING_TEXT_COLOR',
    payload: value
});
export const setCropping = (value: CroppedRect) : AnyAction=> ({
    type: 'UPDATING_CROPPING',
    payload: value
});
export const setCanvas = (value: HTMLCanvasElement) : AnyAction=> ({
    type: 'UPDATING_CANVAS',
    payload: value
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


/*
export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
    type: T,
    payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
    return { type, payload };
}
*/


type dataActions = ReturnType<
    typeof setImage |
    typeof setImageUrl |
    typeof setWTM |
    typeof setBW |
    typeof setTextColor |
    typeof setCropping |
    typeof setCanvas |
    typeof setCanvasUrl |
    typeof notifyOffline |
    typeof notifyRefresh
    >;

export default function dataReducer(state:DataState = INITIAL_STATE, action: dataActions): DataState {
    switch (action.type) {
        case 'UPDATING_IMAGE':
            return Object.assign({},state,{image:action.payload});
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
        case 'UPDATING_CANVAS':
            return Object.assign({},state,{canvas:action.payload});
        case 'NOTIFY_OFFLINE':
            return Object.assign({},state,{offline:action.payload});
        case 'NOTIFY_REFRESH':
            return Object.assign({},state,{refresh:action.payload});
        default:
            return state;
    }
}


