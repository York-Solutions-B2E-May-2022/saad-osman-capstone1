import './App.css';
import {Home} from "./Main/Home";
import {useSelector} from "react-redux";
import {Editor} from "./Editor/Editor";
import {Follower} from "./Follower/Follower";
import {CreateProcess} from "./Editor/CreateProcess";

function App() {
    const {editor, follower, createProcess} = useSelector(state=> ({
        editor: state.Login.editor,
        follower: state.Login.follower,
        createProcess: state.Login.createProcess
    }))
    if(editor){
        return <Editor />
    }
    if(follower){
        return(
            <>
                 <Follower />
            </>
        )
    }
    if(createProcess){
        return(
            <>
                 <CreateProcess />
            </>
        )
    }
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
