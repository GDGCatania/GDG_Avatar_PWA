const INITIAL_STATE = {
  image:false,
  imageUrl: "http://placehold.it/1400x1200",
  wtm: true,
  bw: false,
  blackText: true,
  cropping:{},
  canvasUrl:null,
  canvas:null,
  offline:false,
  refresh:false
}

export default (state = INITIAL_STATE, action) => {
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
