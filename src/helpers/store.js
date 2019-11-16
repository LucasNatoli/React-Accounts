import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import logger from 'redux-logger'


//import { loadState, saveState } from './persistent-state'
//const initialState  = loadState()


export const store = createStore(
    reducers,    
  //  initialState,
    applyMiddleware(
        logger,
        thunkMiddleware
    )
);

/* store.subscribe ( () => {
    saveState(store.getState())
})
 */