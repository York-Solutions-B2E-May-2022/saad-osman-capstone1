import {GO_TO_EDITOR, GO_TO_FOLLOWER} from "../Store/actions";
import {useDispatch} from "react-redux";

export function Home(){
    const dispatch = useDispatch()
    return(
        <div>
            <button onClick={
                ()=>{
                    dispatch({type:GO_TO_EDITOR, editor: true})
                }
            }>Editor</button>
            <button onClick={
                ()=>{
                    dispatch({type:GO_TO_FOLLOWER, follower: true})
                }
            }>Follower</button>
        </div>
    )
}