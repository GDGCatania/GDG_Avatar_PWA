import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';

const enhancerClient = composeWithDevTools(
  applyMiddleware()
)

export default function configureStore() {
  let store = createStore(reducers, {}, enhancerClient);
  return store;
}
