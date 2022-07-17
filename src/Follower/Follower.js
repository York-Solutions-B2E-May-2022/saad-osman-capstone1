import {useDispatch, useSelector} from "react-redux";
import {getAll, startProcessToken, submitProcess, tokenRemove} from "../Editor/redux/asyncRedux";
import { v4 as uuidv4 } from 'uuid';
import {useEffect, useRef, useState} from "react";
import {
    ALL_PROCESS_FOLLWER, CANCEL_FOLLOWER_PROCESS,
    FILTERED_PROCESS_FOLLOWER, GO_HOME,
    START_PROCESS,
    START_PROCESS_FOLLOWER,
    SUBMIT_STATE
} from "../Store/actions";

export function Follower({_useDispatch = useDispatch, _useSelector = useSelector}){
    const dispatch = _useDispatch()
    const [startProcessBtn, setStartProcessBtn] = useState(false)
    let {startProcess, select, allProcessFollower, submit, token} = _useSelector(state=> ({
        startProcess: state.followerReducer.startProcess,
        select: state.followerReducer.select,
        allProcessFollower: state.followerReducer.allProcessFollower,
        submit: state.followerReducer.submit,
        token: state.followerReducer.token
    }))
    const dropdown = useRef();
    console.log(token)
    const [next, setNext] = useState(false)
    const [prev, setPrev] = useState(true)
    const [idx, setIdx] = useState(0);
    const [selectedObj, setSelectedObj] = useState()
    const [text, setText] = useState('')

    function handleStartProcess(objId){
        const one = allProcessFollower.filter(s=> s.id ==selectedObj)
        dispatch(startProcessToken(one[0].id, one[0]))
        setNext(false)
    }
    let sortedList = select?.processList?.sort((a, b) => a.step - b.step)
    function nextStage(length){
        if(length ===1 || idx === length - 1 && token) {
            setNext(true)
            return dispatch({type: SUBMIT_STATE, submit: true});
        }
        if(token) {
            setIdx((prev) => prev + 1);
            setPrev(false)
        }

    }
    function prevStage(id, length){
        if(idx <= 1)setPrev(true)
        if(idx <= 0) setIdx(0)
        else {
            setIdx((prev)=> prev - 1);
            dispatch({type: SUBMIT_STATE, submit: false})
            setNext(false)
        }
    }

    function handleResponse(e){
        setSelectedObj(e.target.value)
    }

    function handleMCResponse(e,idx,id){
        select.processList.map((each, index)=> {
            if(each.id ===id){
                select.processList[index] = {
                    ...select.processList[index],
                    answer: e.target.value
                }
            }
        })
    }
    function handleTFResponse(e,idx,id){
        select.processList.map((each, index)=> {
            if(each.id ===id){
                select.processList[index] = {
                    ...select.processList[index],
                    answer: e.target.value === 'true' ? true : false
                }
            }
        })
    }
    function handleText(e, id){
        setText(e.target.value)
        select.processList.map((each, index)=> {
            if(each.id ===id){
                select.processList[index] = {
                    ...select.processList[index],
                    answer: text
                }
            }
        })
    }
    function toDefault(){
        setNext(true)
        setPrev(false)
        setIdx(0)
        setSelectedObj()
        setText('')
    }
    function submitFollower(){
        dispatch(submitProcess(select, select.id));
        dispatch({type:CANCEL_FOLLOWER_PROCESS})
        dispatch(tokenRemove(token))
        toDefault()
    }
    function cancelFollowerProcess(e){
        dispatch({type:CANCEL_FOLLOWER_PROCESS})
        dispatch(getAll())
        dispatch(tokenRemove(token))
        toDefault()
    }
    return(
        <div>
            {startProcess ? null : <>
                <h2>Start Process</h2>
                <select ref={dropdown} onChange={handleResponse} defaultValue={"default"}>
                    <option value="default">Please Start A Process</option>
                    {allProcessFollower?.filter((s)=>s.finished === false).map((each, index) => {
                        return <option key={index} value={each.id}>{each.title}</option>
                    })}
                </select>
                <button onClick={()=>handleStartProcess()}>Begin Process</button>
                <button style={{position:'absolute', top: '1.5rem', right: '2rem'}} onClick={()=>dispatch({type: GO_HOME})}>Go Home</button>
            </>
            }
            {startProcess ?<>
                <div style={{display: 'flex'}}>
                    <h2>Process: {select.title}</h2>
                    <button onClick={cancelFollowerProcess} style={{height:'1.2rem', justifySelf:'center', margin:'1.6rem'}}>Cancel</button>
                </div>

                <div style={{display:'flex', marginTop: '-1.6rem'}}>
                    <h3 style={{alignSelf:'center'}}>{select.processList[idx].step}.</h3>
                    <h2 style={{paddingBottom:'.3rem'}}>{select.processList[idx].action}</h2>
                </div>

                {sortedList[idx].responseEmbedd.val === "trueOrFalse" ?<>
                    <input type={'radio'} name='T/F' onChange={(e)=>handleTFResponse(e,idx, sortedList[idx].id)} value={true}/>T
                    <input type={'radio'} name='T/F' onChange={(e)=>handleTFResponse(e,idx,sortedList[idx].id)} value={false}/>F
                </>: null}

                {sortedList[idx].responseEmbedd.val === "text" ?<>
                    <input type={'text'} onChange={(e)=>handleText(e, sortedList[idx].id)} value={text}/>
                </>: null}
                {sortedList[idx].responseEmbedd.val === "multipleChoice" ?<>
                    <input type={'radio'} name='M/C' value={sortedList[idx].mutipleChoiceEmbedd.one} onChange={(e)=>handleMCResponse(e,idx, sortedList[idx].id)} /> {sortedList[idx].mutipleChoiceEmbedd.one}
                    <input type={'radio'} name='M/C' value={sortedList[idx].mutipleChoiceEmbedd.two} onChange={(e)=>handleMCResponse(e,idx, sortedList[idx].id)} /> {sortedList[idx].mutipleChoiceEmbedd.two}
                    <input type={'radio'} name='M/C' value={sortedList[idx].mutipleChoiceEmbedd.three} onChange={(e)=>handleMCResponse(e,idx, sortedList[idx].id)} /> {sortedList[idx].mutipleChoiceEmbedd.three}
                    <input type={'radio'} name='M/C' value={sortedList[idx].mutipleChoiceEmbedd.four} onChange={(e)=>handleMCResponse(e,idx, sortedList[idx].id)} /> {sortedList[idx].mutipleChoiceEmbedd.four}
                </>: null}
                <button disabled={prev} onClick={()=>prevStage(sortedList.length)}> {'<<'} </button>
                <button disabled={next} onClick={()=>nextStage(sortedList.length)}> {'>>'} </button>
                {submit ? <button onClick={submitFollower}>Submit</button>: null}
            </> :null}

            {startProcess ? null: <div>
                <h2>Completed Proces</h2>
                {allProcessFollower?.filter((s)=>s.finished === true).map((s)=>{
                    return(
                        <>
                            - {s.title} <br />
                        </>
                    )
                })}
            </div>}
        </div>
    )
}