import { render, screen } from '@testing-library/react';
import {Follower} from "./Follower";

test('if startProcess is false, we should expect to display H2 text "Start Process"', () => {
    const dispatch = jest.fn();
    const _useSelector = (fn) => {
        return fn({
            followerReducer: {
                startProcess: false,
            }
        });
    };
    render(<Follower _useDispatch={()=>dispatch} _useSelector={_useSelector} />);
    const headingTwo = screen.getByText("Start Process")
    expect(headingTwo.tagName).toBe("H2")
});
