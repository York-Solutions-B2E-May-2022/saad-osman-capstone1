import { render, screen } from '@testing-library/react';
import {Home} from "./Home";
import userEvent from "@testing-library/user-event";
import {GO_TO_EDITOR, GO_TO_FOLLOWER} from "../Store/actions";

test('should render a button with text Editor that dispatches GO_TO_EDITOR when clicked', () => {
    const dispatch = jest.fn();
    const _useSelector = (fn)=>{
        return fn({
            EditorReducer: {
                allProcess: []
            }
        })
    }
    render(<Home _useSelector={_useSelector}  _useDispatch={()=> dispatch} />);
    const button = screen.getByText("Editor");
    userEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith({
        type: GO_TO_EDITOR, editor: true
    })
});
test('should render a button with text Follower that dispatches GO_TO_FOLLOWER when clicked', () => {
    const dispatch = jest.fn();
    const _useSelector = (fn)=>{
        return fn({
            EditorReducer: {
                allProcess: []
            }
        })
    }
    render(<Home _useSelector={_useSelector}  _useDispatch={()=> dispatch} />);
    const button = screen.getByText("Follower");
    userEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith({
        type: GO_TO_FOLLOWER, follower: true
    })
});