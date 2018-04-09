const INITIAL_STATE = {
  image:false,
  imageUrl: "http://placehold.it/1400x1200",
  wtm: true,
  bw: false,
  blackText: true,
  cropping:{},
  canvasUrl:null
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
    default:
      return state;
  }
}
