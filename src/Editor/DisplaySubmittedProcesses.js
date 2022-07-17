import {useDispatch, useSelector} from "react-redux";
import {deleteBackendAction, deleteWithId, getAll} from "./redux/asyncRedux";
import { v4 as uuidv4 } from 'uuid';
import {
    ADD_BACKEND_ACTION,
    CHANGE,
    EDIT_ACTION,
    EDIT_PROCESS,
    EDIT_TITLE,
    EDITING_ACTION,
    TITLE_STATE
} from "../Store/actions";
import {useEffect, useState} from "react";
export function DisplaySubmittedProcesses() {
    const dispatch = useDispatch()
    const {processList, allProcess, editingProcess, editBackendProcess, change, changingTitle, editActionBackEnd, editObj} = useSelector(state => ({
        processList: state.EditorReducer.process,
        allProcess: state.EditorReducer.allProcess,
        editingProcess: state.EditorReducer.editingProcess,
        editBackendProcess: state.EditorReducer.editBackendProcess,
        change: state.EditorReducer.changing,
        changingTitle: state.EditorReducer.changingTitle,
        editActionBackEnd: state.EditorReducer.editActionBackEnd,
        editObj: state.EditorReducer.editObj
    }))
        function deleteProcess(e, other) {
            dispatch(deleteWithId(other.id))
        }

        function editTitle(e, other,idx) {
            e.preventDefault()
            dispatch({type: EDIT_TITLE, changingTitle: true, titleToChange: other})
            window.scroll(0,0)
        }

        function deleteAction(other, each){
            dispatch(deleteBackendAction(other.id,each))
        }
        function editAction(other, each){
            dispatch({type: EDIT_ACTION, each:each, obj: other})
            dispatch({type: EDITING_ACTION, editing: true})
            dispatch({type: TITLE_STATE, titleState: true})

        }

        function addAction(e, other, index){
            dispatch({type: ADD_BACKEND_ACTION, addingAction: true, objectE: other})
            dispatch({type: TITLE_STATE, titleState: true})
            window.scrollTo({ top: 0, behavior: 'smooth' })

        }

        return (
            <>
                <div>
                    {allProcess?.length > 0 ? allProcess?.map((other, idx) => {
                        return (
                            <div style={{marginBottom: '1rem'}} key={idx}>
                                <div style={{display: 'flex'}}>
                                    <h3 style={{fontSize: '3vmax', marginRight: '1rem'}}>Title: {other.title}</h3>
                                    <button style={{height: '2rem', alignSelf: 'center'}}
                                            onClick={(e) => addAction(e, other, idx)}>Add Action
                                    </button>
                                    <button style={{height: '2rem', alignSelf: 'center'}}
                                            onClick={(e) => editTitle(e, other, idx)}>Edit Title
                                    </button>
                                    <button onClick={(e) => deleteProcess(e, other)}
                                            style={{height: '2rem', alignSelf: 'center'}}>Delete Process
                                    </button>
                                </div>
                                {other?.processList.sort((a, b) => a.step - b.step).map((each) => {
                                    return (
                                        <div key={uuidv4()} style={{display: 'flex'}}>
                                            <div>
                                                Action: {each.action} --- Step: {each.step}<br/>
                                                Response Type: {each.responseEmbedd.val} <br/>
                                                {each.responseEmbedd.val === 'multipleChoice' ? <>
                                                    Option 1: {each.mutipleChoiceEmbedd.one}<span
                                                    style={{marginRight: '.5rem'}}/>
                                                    Option 2: {each.mutipleChoiceEmbedd.two}<br/>
                                                    Option 3: {each.mutipleChoiceEmbedd.three}<span
                                                    style={{marginRight: '.5rem'}}/>
                                                    Option 4: {each.mutipleChoiceEmbedd.four}<br/>
                                                </> : null}
                                                <br/>
                                            </div>

                                            <div style={{height: '1.8rem', position: 'absolute', marginLeft: '15rem'}}>
                                                <button onClick={()=>editAction(other, each)}>Edit Action</button>
                                                <button onClick={()=>deleteAction(other, each)}>Delete Action</button>
                                            </div>
                                        </div>
                                    )
                                })
                                }

                            </div>)
                    }) : null}
                </div>

            </>)

}