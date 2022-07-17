import {useDispatch} from "react-redux";
import {GO_T0_CREATE_PROCESS} from "../Store/actions";
import {CreateProcess} from "./CreateProcess";

export function Editor(){
    const dispatch = useDispatch()
    return(
        <>
            <h2>Editor</h2>
            <CreateProcess/>
        </>
    )
}
