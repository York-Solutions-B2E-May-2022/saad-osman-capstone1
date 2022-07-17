import './App.css';
import {Home} from "./Main/Home";
import {useDispatch, useSelector} from "react-redux";
import {Editor} from "./Editor/Editor";
import {Follower} from "./Follower/Follower";
import {CreateProcess} from "./Editor/CreateProcess";

function App({_useDispatch = useDispatch, _useSelector = useSelector, _Editor = Editor, _Follower = Follower, _CreateProcess = CreateProcess, _Home = Home}) {
    const {editor, follower, createProcess} = _useSelector(state=> ({
        editor: state.Login.editor,
        follower: state.Login.follower,
        createProcess: state.Login.createProcess
    }))
    if(editor){
        return <_Editor />
    }
    if(follower){
        return(
            <>
                 <_Follower />
            </>
        )
    }
    if(createProcess){
        return(
            <>
                 <_CreateProcess />
            </>
        )
    }
  return (
    <div>
      <_Home />
    </div>
  );
}

export default App;
