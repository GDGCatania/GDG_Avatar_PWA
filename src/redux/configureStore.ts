import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import dataReducer, {DataState, INITIAL_STATE as DATA_INIT} from './modules/data';

export interface ReducerState{
  data: DataState
}

const INITIAL_APP_STATE: ReducerState = {
  data: DATA_INIT
}

export const rootReducers = combineReducers<ReducerState>({
  data: dataReducer,
})

export type RootState = ReturnType<typeof rootReducers>;

const enhancerClient = composeWithDevTools(
  applyMiddleware()
)

export default function ConfigureStore() {
  return createStore(rootReducers, INITIAL_APP_STATE, enhancerClient);
}
