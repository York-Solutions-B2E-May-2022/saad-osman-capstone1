import {useDispatch, useSelector} from "react-redux";
import {FILTERED_PROCESS, EDIT_STAGE, TITLE_STATE} from "../Store/actions";

export function DisplayProcess(){
    const dispatch = useDispatch()
    const {processList, allProcess, titleState} = useSelector(state=> ({
        processList: state.EditorReducer.process,
        allProcess: state.EditorReducer.allProcess,
        titleState: state.EditorReducer.titleState
    }))
    function deleteAction(e,action){
        e.preventDefault()
        console.log(action)
        const filteredArray = processList.filter(s=>s.frontEndId !==action.frontEndId)
        console.log(filteredArray)
        dispatch({type: FILTERED_PROCESS, process: filteredArray})
    }
    function editAction(e, action){
        e.preventDefault()
        dispatch({type: EDIT_STAGE, edit: action, editing: true})
    }

    return(
        <div>
            {processList ? processList.sort((a, b) => a.step - b.step).map((s)=>{
                return(
                    <>
                        Step: {s.step}<br/>
                        Action: {s.action} <br />
                        Response Type:{s.responseEmbedd.val} <br />
                        {s.responseEmbedd.val === "multipleChoice" ? <>
                            Option 1: {s.mutipleChoiceEmbedd.one}<span style={{marginRight:'.5rem'}}/>
                            Option 2: {s.mutipleChoiceEmbedd.two}<br />
                            Option 3: {s.mutipleChoiceEmbedd.three}<span style={{marginRight:'.5rem'}}/>
                            Option 4: {s.mutipleChoiceEmbedd.four}<br />
                        </>: null}
                        <button onClick={(e)=>editAction(e,s)}>Edit</button>
                        <button onClick={(e)=>deleteAction(e,s)}>Delete</button>
                        <br/>
                        <br/>
                    </>
                )
            }): null}
    </div>)
}