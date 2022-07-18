import {applyMiddleware, combineReducers, compose,createStore} from "redux";
import {Login} from "../Editor/redux/reducer";
import {EditorReducer} from '../Editor/redux/reducer'
import {followerReducer} from "../Follower/redux/reducer";
//boilerplate for async redux; middleware magic

// has access to the http response request cycle, as a request is made it first runs through middleware
const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function')
        return action(storeAPI.dispatch, storeAPI.getState)

    next(action)
}
//dev tools line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    Login, EditorReducer, followerReducer
})
 export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(asyncMiddleware)))

