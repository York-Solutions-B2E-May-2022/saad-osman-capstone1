import {
    ALL_PROCESS,
    SUBMIT_STATE,
    FILTERED_PROCESS_FOLLOWER,
    START_PROCESS_FOLLOWER,
    ALL_PROCESS_FOLLOWER,
    CANCEL_FOLLOWER_PROCESS, GO_HOME, TOKEN
} from "../../Store/actions";
import {getAll} from "../../Editor/redux/asyncRedux";


const initFollower ={
    startProcess : false,
    select: [],
    allProcessFollower :[],
    submit: false,
    token: null,
}

export function followerReducer (state = initFollower, action){
    switch (action.type){
        case START_PROCESS_FOLLOWER: return{
            ...state,
            startProcess: action.start,
            select: action.select
        }
        case FILTERED_PROCESS_FOLLOWER:
            return{
                ...state,
                select: action.select
            }
        case ALL_PROCESS_FOLLOWER:
            return {
                ...state,
                allProcessFollower: action.allProcessFollower
            }
        case SUBMIT_STATE:
            return{
                ...state,
                submit: action.submit
            }
        case CANCEL_FOLLOWER_PROCESS:
            return{
                startProcess : false,
                select: [],
                submit:false
            }
        case GO_HOME:
            return{
                startProcess : false,
                select: [],
                allProcessFollower :[],
                submit: false
            }
        case TOKEN:
            return{
            token: action.token
        }
        default:
            return{
                ...state
            }
    }
}