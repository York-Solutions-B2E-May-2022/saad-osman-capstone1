import {useDispatch} from "react-redux";
import {GO_T0_CREATE_PROCESS} from "../Store/actions";

export function Editor(){
    const dispatch = useDispatch()
    return(
        <>
            <h2>Editor</h2>
            <button onClick={
                ()=>{
                    dispatch({type: GO_T0_CREATE_PROCESS, createProcess: true})
                }
            }>Create Process</button>
        </>
    )
}
