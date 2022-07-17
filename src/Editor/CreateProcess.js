import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_ACTION_INFO, ADD_BACKEND_ACTION,
    ADD_PROCESS,
    ALL_PROCESS,
    CLEAR_PROCESS,
    EDIT_STAGE, EDIT_TITLE, EDITING_ACTION,
    FILTERED_PROCESS,
    GO_HOME,
    TITLE_STATE
} from "../Store/actions";
import {addAdditonalAction, addProcess, editStageBE, editTitle, getAll} from "./redux/asyncRedux";
import { v4 as uuidv4 } from 'uuid';
import {DisplayProcess} from "./DisplayProcess";
import {DisplaySubmittedProcesses} from "./DisplaySubmittedProcesses";

export function CreateProcess(){
    const dispatch = useDispatch()
    const {processList, allProcess, editing, editProcessFrontEnd, titleState, changingTitle, titleToChange, addingAction, objectEntity, editingAction, editActionBackEnd, editObj} = useSelector(state=> ({
        processList: state.EditorReducer.process,
        allProcess: state.EditorReducer.allProcess,
        editing: state.EditorReducer.editing,
        editProcessFrontEnd: state.EditorReducer.editProcessFrontEnd,
        titleState: state.EditorReducer.titleState,
        changingTitle: state.EditorReducer.changingTitle,
        titleToChange: state.EditorReducer.titleToChange,
        addingAction: state.EditorReducer.addingAction,
        objectEntity: state.EditorReducer.objectEntity,
        editingAction: state.EditorReducer.editingAction,
        editActionBackEnd: state.EditorReducer.editActionBackEnd,
        editObj: state.EditorReducer.editObj
    }))
    const [title, setTitle] = useState('')
    const [step, setStep] = useState()
    const [action,setAction] = useState('')
    const [mcChoice, setMcChoice] = useState();
    const [createProcess, setCreateProcess] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [response, setResponse] = useState({
        text: false,
        multiple_choice: false,
        trueOrFalse: false,
        val: ''
    })
    const [multipleChoice, setMultipleChoice] = useState({
        mcOne: '',
        mcTwo: '',
        mcThree: '',
        mcFour: ''
    })
    const info =  {
        action: action,
        step: step,
        answer: '',
        frontEndId: uuidv4(),
        responseEmbedd: {
            text: response.text,
            multipleChoice: response.multiple_choice,
            trueOrFalse: response.trueOrFalse,
            val: response.val
        },
        mutipleChoiceEmbedd: {
            one: multipleChoice.mcOne,
            two: multipleChoice.mcTwo,
            three: multipleChoice.mcThree,
            four: multipleChoice.mcFour
        }
    }
    const dropdown = useRef();
    function addTitle(e){
        setTitle(e.target.value)
    }
    function addStep(e){
        setStep(e.target.value)
    }
    function addAction(e){
        setAction(e.target.value)
    }
    function handleResponse(e){
        if(e.target.value === 'text') setResponse({...response, text: true, multiple_choice: false, trueOrFalse: false, val: e.target.value})
        if(e.target.value === 'multipleChoice') setResponse({...response, multiple_choice: true, text: false, trueOrFalse:false, val: e.target.value})
        if(e.target.value === 'trueOrFalse') setResponse({...response, trueOrFalse: true, text: false, multiple_choice: false, val: e.target.value})
    }
    function handleMultipleChoiceOne(e){
        setMultipleChoice({
            ...multipleChoice,
            mcOne: e.target.value
        })
    }
    function handleMultipleChoiceTwo(e){
        setMultipleChoice({
            ...multipleChoice,
            mcTwo: e.target.value
        })
    }
    function handleMultipleChoiceThree(e){
        setMultipleChoice({
            ...multipleChoice,
            mcThree: e.target.value
        })
    }
    function handleMultipleChoiceFour(e){
        setMultipleChoice({
            ...multipleChoice,
            mcFour: e.target.value
        })
    }
    function handleMCResponse(e){
        setMcChoice(e.target.value)
    }
    function Add(e){
        e.preventDefault()
        if(editing){
            const filteredList = processList.filter((s)=>s.frontEndId !== editProcessFrontEnd.frontEndId)
            const obj = {
                ...info,
                frontEndId: editProcessFrontEnd.frontEndId
            }
            const list = [...filteredList, obj]
            dispatch({type:FILTERED_PROCESS, process: list})
            setToDefault()
            dispatch({type: EDIT_STAGE, edit: null, editing: false})
            return;
        }
        if(response.multiple_choice)
            dispatch({type: ADD_PROCESS, process: {
                    ...info,
                    frontEndId: uuidv4()
                }})
        else if(response.text)
            dispatch({type: ADD_PROCESS, process: {
                    ...info,
                    frontEndId: uuidv4(),
                    mutipleChoiceEmbedd: {
                        one: '',
                        two: '',
                        three: '',
                        four: ''
                    }
                }})
        else if(response.trueOrFalse)
            dispatch({type: ADD_PROCESS, process:{
                    ...info,
                    frontEndId: uuidv4(),
                    mutipleChoiceEmbedd: {
                        one: "",
                        two: "",
                        three: "",
                        four: ""
                    }
                }})
        setToDefault()

    }
    function setToDefault(){
        setAction('')
        setStep('')
        setMultipleChoice({
            mcOne: '',
            mcTwo: '',
            mcThree: '',
            mcFour: ''
        })
        setResponse({
            text: false,
            multiple_choice: false,
            trueOrFalse: false,
            val: ''
        })
        dropdown.current.value = "default";
        setStep('')
        setAction('')
        setMultipleChoice({
            mcOne: '',
            mcTwo: '',
            mcThree: '',
            mcFour: ''})
        setResponse({
            text: false,
            multiple_choice: false,
            trueOrFalse: false,
            val: ''
        })
    }

    function handleCreateProcess(e){
        e.preventDefault()
        if(title !== '') {
            dispatch({type: TITLE_STATE, titleState: true})
            setCreateProcess(true)
        }
        setBtnDisabled(true)
    }
    function handleCancelProcess(e){
        e.preventDefault()
        setToDefault()
        setTitle('')
        dispatch({type: TITLE_STATE, titleState: false})
        setCreateProcess(false);
        dispatch({type: CLEAR_PROCESS})
        setBtnDisabled(false)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(addProcess({processList: processList, title:title, finished: false}))
        dispatch({type: CLEAR_PROCESS})
        setToDefault()
        setCreateProcess(false);
        setTitle('')
        dispatch({type: TITLE_STATE, titleState: false})
        setBtnDisabled(false)
    }


    function changeBackendTitle(e){
        e.preventDefault()
        dispatch(editTitle(title, titleToChange.id))
        dispatch({type: EDIT_TITLE, changingTitle: false, titleToChange: null})
        setTitle('')
    }
    function addActionToBackend(e){
        e.preventDefault()
        dispatch(addAdditonalAction(objectEntity.id, info))
        dispatch({type: ADD_BACKEND_ACTION, addingAction: false, objectE: null})
        dispatch({type: TITLE_STATE, titleState: false})
        setToDefault();

    }

    function sendEditAction(e){
        e.preventDefault()
        dispatch(editStageBE(editObj.id,editActionBackEnd.id,info))
        setToDefault()
        dispatch({type: EDITING_ACTION, editing: false})
        dispatch({type: TITLE_STATE, titleState: false})
    }
    function cancelEdit(e){
        e.preventDefault()
        setToDefault()
        dispatch({type: EDITING_ACTION, editing: false})
        dispatch({type: TITLE_STATE, titleState: false})
    }
    return(
        <div>
           <h2 style={{textAlign:'center', marginRight:'25rem'}}>Create A Process</h2>
            <button style={{width: '5rem', height: '2rem', borderRadius:'.5rem', position:'absolute', top: '1rem', right:'1rem'}} onClick={()=>dispatch({type:GO_HOME})}>Go Home</button>

            <form style={{marginLeft:'3rem'}}>
                {changingTitle? <label>Change Title: </label>: <label>Unique Title: </label>}
                <input disabled={titleState} onChange={addTitle} value={title} placeholder={changingTitle ? titleToChange?.title: "Title"} type='text'/>
                {changingTitle ? <button onClick={(e)=>changeBackendTitle(e)}>Change Title</button>:
                    <>
                        <button disabled={btnDisabled} onClick={handleCreateProcess}>Create Process</button>
                        <button onClick={handleCancelProcess}>Cancel</button><br /><br />
                    </>}
                {createProcess?<>
                <span style={{display:'block', fontSize:'1.3rem'}}>Create Stages:</span>
                <label>Step:</label>
                <input onChange={addStep} value={step} placeholder={editing ? editProcessFrontEnd.step :"Step"} type='number'/><br />
                <label>Action:</label>
                <input onChange={addAction} value={action} placeholder={editing ? editProcessFrontEnd.action: "Action"} type='text'/><br />
                    <select ref={dropdown}  onChange={handleResponse} defaultValue={editing ? editProcessFrontEnd.responseEmbedd.val : 'default'} >
                        <option value="default">Select A Response</option>
                        <option value="text">Text</option>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="trueOrFalse">T/F</option>
                            }
                        )}}
                    </select>
                    <br />
                    {response.multiple_choice? <>

                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcOne} /> <input type="text" onChange={handleMultipleChoiceOne} value={multipleChoice.mcOne} placeholder={editing ? editProcessFrontEnd.mutipleChoiceEmbedd.one : null} /><br />
                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcTwo} /> <input type="text" onChange={handleMultipleChoiceTwo} value={multipleChoice.mcTwo} placeholder={editing ? editProcessFrontEnd.mutipleChoiceEmbedd.two : null} /><br />
                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse'value={multipleChoice.mcThree} /> <input type="text" onChange={handleMultipleChoiceThree} value={multipleChoice.mcThree} placeholder={editing ? editProcessFrontEnd.mutipleChoiceEmbedd.three : null} /><br />
                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcFour} /> <input type="text" onChange={handleMultipleChoiceFour} value={multipleChoice.mcFour} placeholder={editing ? editProcessFrontEnd.mutipleChoiceEmbedd.four : null} />
                        </>
                        : null
                    }
                    {editing ? <button onClick={Add}>Complete Edit</button>: <button onClick={Add}>Add</button>}
                    {editing ? null: <button type='submit' onClick={handleSubmit}>Submit Process</button>} <br />
                   </> :null}

                {addingAction?<>
                    <span style={{display:'block', fontSize:'1.3rem'}}>Add Additional Stage:</span>
                    <label>Step:</label>
                    <input onChange={addStep} value={step} placeholder={"Step"} type='number'/><br />
                    <label>Action:</label>
                    <input onChange={addAction} value={action} placeholder={"Action"} type='text'/><br />
                    <select ref={dropdown}  onChange={handleResponse} defaultValue={ 'default'} >
                        <option value="default">Select A Response</option>
                        <option value="text">Text</option>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="trueOrFalse">T/F</option>
                        }
                        )}}
                    </select>
                    <br />
                    {response.multiple_choice? <>

                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcOne} /> <input type="text" onChange={handleMultipleChoiceOne} value={multipleChoice.mcOne}  /><br />
                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcTwo} /> <input type="text" onChange={handleMultipleChoiceTwo} value={multipleChoice.mcTwo} /><br />
                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse'value={multipleChoice.mcThree} /> <input type="text" onChange={handleMultipleChoiceThree} value={multipleChoice.mcThree}  /><br />
                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcFour} /> <input type="text" onChange={handleMultipleChoiceFour} value={multipleChoice.mcFour}  />
                        </>
                        : null
                    }
                     <button onClick={addActionToBackend}>Add</button>

                </> :null}

                {editingAction ?<>
                    <span style={{display:'block', fontSize:'1.3rem'}}>Edit Action:</span>
                    <label>Step:</label>
                    <input onChange={addStep} value={step} placeholder={editActionBackEnd.step} type='number'/><br />
                    <label>Action:</label>
                    <input onChange={addAction} value={action} placeholder={editActionBackEnd.action} type='text'/><br />
                    <select ref={dropdown}  onChange={handleResponse} defaultValue={editActionBackEnd.responseEmbedd.text} >
                        <option value="default">Select A Response</option>
                        <option value="text">Text</option>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="trueOrFalse">T/F</option>
                        }
                        )}}
                    </select>
                    <br />
                    {response.multiple_choice? <>

                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcOne} /> <input type="text" placeholder={editActionBackEnd.mutipleChoiceEmbedd.one} onChange={handleMultipleChoiceOne} value={multipleChoice.mcOne}  /><br />
                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcTwo} /> <input type="text" placeholder={editActionBackEnd.mutipleChoiceEmbedd.one} onChange={handleMultipleChoiceTwo} value={multipleChoice.mcTwo} /><br />
                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse'value={multipleChoice.mcThree} /> <input type="text" placeholder={editActionBackEnd.mutipleChoiceEmbedd.one} onChange={handleMultipleChoiceThree} value={multipleChoice.mcThree}  /><br />
                            <input type='radio' disabled onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcFour} /> <input type="text" placeholder={editActionBackEnd.mutipleChoiceEmbedd.one} onChange={handleMultipleChoiceFour} value={multipleChoice.mcFour}  />
                        </>
                        : null
                    }
                    <button onClick={(e)=>sendEditAction(e)}>Edit</button>
                    <button onClick={(e)=>cancelEdit(e)}>Cancel</button>

                </> :null}

                <br/>
                <DisplayProcess />
            </form>

            <h2>Display Process</h2>
            <DisplaySubmittedProcesses />

        </div>
    )

}