import {ALL_PROCESS_FOLLOWER, GO_TO_EDITOR, GO_TO_FOLLOWER} from "../Store/actions";
import {useDispatch, useSelector} from "react-redux";
import {getAll} from "../Editor/redux/asyncRedux";

export function Home({_useDispatch = useDispatch, _useSelector = useSelector}){
    const dispatch = _useDispatch()
    const allProcess = _useSelector(state=> state.EditorReducer.allProcess)

    return(
        <div>
            <button onClick={
                ()=>{
                    dispatch({type:GO_TO_EDITOR, editor: true})
                    dispatch(getAll())
                }
            }>Editor</button>
            <button onClick={
                ()=>{
                    dispatch(getAll())
                    dispatch({type:GO_TO_FOLLOWER, follower: true})
                }
            }>Follower</button>
        </div>
    )
}
