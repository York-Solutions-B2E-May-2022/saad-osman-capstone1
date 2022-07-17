import {
    ADD_PROCESS,
    ALL_PROCESS, CLEAR_PROCESS,
    GO_HOME,
    GO_T0_CREATE_PROCESS,
    GO_TO_EDITOR,
    GO_TO_FOLLOWER,
    FILTERED_PROCESS, EDIT_STAGE, TITLE_STATE, EDIT_PROCESS,
    CHANGE, EDIT_TITLE, ADD_BACKEND_ACTION, ADD_ACTION_INFO,
    EDITING_ACTION, EDIT_ACTION

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
    allProcess: [],
    editProcessFrontEnd: null,
    editing: false,
    titleState: false,
    editBackendProcess: null,
    editingProcess: false,
    changing: false,
    changingTitle: false,
    titleToChange: null,
    addingAction: false,
    infoToBeAdded: null,
    objectEntity: null,
    editingAction: false,
    editActionBackEnd: null,
    editObj: null
}
export function EditorReducer(state = initEditor, action){
    switch(action.type){
        case GO_HOME:
            return{
                process: [],
                editProcessFrontEnd: null,
                editing: false,
                titleState: false,
                editBackendProcess: null,
                editingProcess: false,
                changing: false,
                changingTitle: false,
                titleToChange: null,
                addingAction: false,
                infoToBeAdded: null,
                objectEntity: null,
                editingAction: false,
                editActionBackEnd: null,
                editObj: null
            }
        case ADD_PROCESS:
            return{
                ...state,
                process: [...state.process, action.process]
            }
        case ALL_PROCESS:
            return{
                ...state,
                allProcess: action.allProcess
            }
        case FILTERED_PROCESS:
            return{
                ...state,
                process: action.process
            }
        case CLEAR_PROCESS: return {
            ...state,
            process: []
        }
        case EDIT_STAGE: return{
            ...state,
            editProcessFrontEnd: action.edit,
            editing: action.editing
        }
        case TITLE_STATE: return{
            ...state,
            titleState: action.titleState
        }
        case EDIT_PROCESS: return {
            ...state,
            editBackendProcess: action.editProcess,
            editingProcess: action.editingProcess,

        }
        case CHANGE: return{
            ...state,
            changing: action.change
        }
        case EDIT_TITLE: return{
            ...state,
            changingTitle: action.changingTitle,
            titleToChange: action.titleToChange
        }
        case ADD_BACKEND_ACTION:
            return{
                ...state,
                addingAction: action.addingAction,
                objectEntity: action.objectE
            }
        case ADD_ACTION_INFO:
            return{
                ...state,
                infoToBeAdded: action.info
            }
        case EDITING_ACTION:
            return{
            ...state,
            editingAction: action.editing,
        }
        case EDIT_ACTION:
            return{
                ...state,
                editActionBackEnd: action.each,
                editObj: action.obj
            }
        default:
            return{
                ...state
            }

    }
}