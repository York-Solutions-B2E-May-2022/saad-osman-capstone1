import {applyMiddleware, combineReducers, compose,createStore} from "redux";
import {Login} from "../Editor/redux/reducer";
import {EditorReducer} from '../Editor/redux/reducer'
//boilerplate for async redux; middleware magic
const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function')
        return action(storeAPI.dispatch, storeAPI.getState)

    next(action)
}
//dev tools line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    Login, EditorReducer
})
 export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(asyncMiddleware)))

