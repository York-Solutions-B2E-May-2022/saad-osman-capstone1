import { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ADD_PROCESS, ALL_PROCESS, CLEAR_PROCESS, GO_HOME} from "../Store/actions";
import {addProcess} from "./redux/asyncRedux";

export function CreateProcess(){
    const dispatch = useDispatch()
    const {processList, allProcess} = useSelector(state=> ({
        processList: state.EditorReducer.process,
        allProcess: state.EditorReducer.allProcess
    }))
    const [process, setProcess] = useState([])
    const [title, setTitle] = useState('')
    const [step, setStep] = useState()
    const [action,setAction] = useState('')
    const [mcChoice, setMcChoice] = useState();
    const [textResponse, setTextResponse] = useState('')
    const [createProcess, setCreateProcess] = useState(false)
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
    const [titleReference, setTitleReference] = useState(false)
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
        if(e.target.value === 'text')
            setResponse({...response, text: true, multiple_choice: false, trueOrFalse: false, val: e.target.value})
        if(e.target.value === 'multipleChoice')
            setResponse({...response, multiple_choice: true, text: false, trueOrFalse:false, val: e.target.value})
        if(e.target.value === 'trueOrFalse')
            setResponse({...response, trueOrFalse: true, text: false, multiple_choice: false, val: e.target.value})
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
    // function handleTextResponse(e){
    //     setTextResponse(e.target.value)
    // }
    function Add(e){
        e.preventDefault()
        if(response.multiple_choice)
            dispatch({type: ADD_PROCESS, process: {
                    action: action,
                    step: step,
                    response: response,
                    multipleChoice: {
                        one: multipleChoice.mcOne,
                        two: multipleChoice.mcTwo,
                        three: multipleChoice.mcThree,
                        four: multipleChoice.mcFour
                    }
                } })
        else if(response.text)
            dispatch({type: ADD_PROCESS, process: {
                    action: action,
                    step: step,
                    response: response,
                    multipleChoice: {
                        one: multipleChoice.mcOne,
                        two: multipleChoice.mcTwo,
                        three: multipleChoice.mcThree,
                        four: multipleChoice.mcFour
                    }
                }})
        else if(response.trueOrFalse)
            dispatch({type: ADD_PROCESS, process:{
                    action: action,
                    step: step,
                    response: response,
                    multipleChoice: {
                        one: multipleChoice.mcOne,
                        two: multipleChoice.mcTwo,
                        three: multipleChoice.mcThree,
                        four: multipleChoice.mcFour
                    }

                } })
    }
    console.log(process, title, step, action, response, mcChoice, textResponse)

    console.log(multipleChoice.mcOne, multipleChoice.mcTwo, multipleChoice.mcThree, multipleChoice.mcFour)
    console.log(mcChoice)
    console.log(process)

    function handleCreateProcess(e){
        e.preventDefault()
        if(title !== '') {
            setTitleReference(true)
            setCreateProcess(true)
        }
    }
    console.log(processList)
    function handleCancelProcess(e){
        e.preventDefault()
        setTitle('')
        setTitleReference(false)
        setCreateProcess(false)
        setStep()
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
    function handleSubmit(e){
        e.preventDefault()
        dispatch({type: ALL_PROCESS, finalProcess: processList})
        dispatch(addProcess(processList))
        //emtying array
        dispatch({type: CLEAR_PROCESS})
    }
    console.log(allProcess)
    return<div>
        <button onClick={()=>dispatch({type: GO_HOME})}>Go Home</button>
            <form>
                <label>Title:</label>
                <input disabled={titleReference} onChange={addTitle} value={title} placeholder="Title" type='text'/> <br />
                <button onClick={handleCreateProcess}>Create Process</button>
                <button onClick={handleCancelProcess}>Cancel</button>
                {createProcess?<>
                <label>Action</label><br />
                <label>Step:</label>
                <input onChange={addStep} value={step} placeholder="Step" type='number'/>
                <input onChange={addAction} value={action} placeholder="Action" type='text'/><br />
                <input type="radio" onChange={handleResponse} name='response' value={"text"}/> Text
                <input type="radio" onChange={handleResponse} name='response' value={"multipleChoice"}/> Multiple-Choice
                <input type="radio" onChange={handleResponse} name='response' value={"trueOrFalse"}/> T/F

                {/*{response.text?<input type={'text'} onChange={handleTextResponse} value={textResponse}></input>: null}*/}
                {response.multiple_choice? <>

                    <input type='radio' onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcOne} /><input type="text" onChange={handleMultipleChoiceOne} value={multipleChoice.mcOne}/>
                    <input type='radio' onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcTwo} /> <input type="text" onChange={handleMultipleChoiceTwo} value={multipleChoice.mcTwo}/>
                    <input type='radio' onChange={handleMCResponse} name='MCResponse'value={multipleChoice.mcThree} /> <input type="text" onChange={handleMultipleChoiceThree} value={multipleChoice.mcThree} />
                    <input type='radio' onChange={handleMCResponse} name='MCResponse' value={multipleChoice.mcFour} /> <input type="text" onChange={handleMultipleChoiceFour} value={multipleChoice.mcFour}/>
                    </>
                    : null
                }
                {/*{response.trueOrFalse ? <>*/}
                {/*        <input type='radio' value={'true'} /> True*/}
                {/*        <input type='radio' value={'false'}/> False*/}
                {/*        </>*/}
                {/*    : null*/}
                {/*}*/}

                <button onClick={Add}>Add</button>
                <button type='submit' onClick={handleSubmit}>Submit</button>
                   </> :null}

                {processList ? processList.sort((a, b) => a.step - b.step).map((s)=>{
                    return(
                        <>
                            {s.step}<br/>
                            {s.action} {s.response.val}
                        </>
                    )
                }): null}
            </form>
        </div>

}