import {
    ADD_PROCESS,
    ALL_PROCESS, CLEAR_PROCESS,
    GO_HOME,
    GO_T0_CREATE_PROCESS,
    GO_TO_EDITOR,
    GO_TO_FOLLOWER
} from "../../Store/actions";

const initLogin = {
    editor: null,
    follower: null,
    createProcess: null,
}
export function Login(state = initLogin, action){
    switch(action.type){
        case GO_HOME:
            return{
                ...state,
                editor: null,
                follower: null,
                createProcess: null,
            }
        case GO_TO_EDITOR:
            return {
                ...state,
                editor: action.editor,
                follower: false,
                createProcess: false
            }
        case GO_TO_FOLLOWER:
            return {
                ...state,
                follower: action.follower,
                editor: false,
                createProcess: false
            }
        case GO_T0_CREATE_PROCESS:
            return {
                ...state,
                createProcess: action.createProcess,
                follower: false,
                editor: false
            }
        default:
            return{
                ...state
            }
    }
}

const initEditor = {
    process: [],
    allProcess: []
}
export function EditorReducer(state = initEditor, action){
    switch(action.type){
        case ADD_PROCESS:
            return{
                ...state,
                process: [...state.process, action.process]
            }
        case ALL_PROCESS:
            return{
                ...state,
                allProcess: [...state. allProcess, [action.finalProcess]]
            }
        case CLEAR_PROCESS: return {
            ...state,
            allProcess: [],
            process: []
        }
        default:
            return{
                ...state
            }

    }
}