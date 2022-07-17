import { render, screen } from '@testing-library/react';
import App from './App';

test('should render Editor Component When editor state is True', () => {
  const _useSelector = (fn) => {
    return fn({
      Login: {
        editor: true,
        createProcess: false,
        follower: false
      }
    });
  };
  const _useDispatch = () => {};
  const _Editor = () => "hello";
  render(<App _Editor={_Editor} _useSelector={_useSelector} />);
  expect(screen.getByText("hello")).toBeInTheDocument()
});
test('should render Follower Component When follower state is True and editor is False', () => {
  const _useSelector = (fn) => {
    return fn({
      Login: {
        editor: false,
        follower: true,
        createProcess:false
      }
    });
  };
  const _useDispatch = () => {};
  const _Follower = () => "bye";
  render(<App _Follower={_Follower} _useSelector={_useSelector} />);
  expect(screen.getByText("bye")).toBeInTheDocument()
});
test('should render CreateProcess Component When createProcess state is True, follower is false, and editor is false', () => {
  const _useSelector = (fn) => {
    return fn({
      Login: {
        editor: false,
        follower: false,
        createProcess: true
      }
    });
  };
  const _useDispatch = () => {};
  const _CreateProcess = () => "see ya";
  render(<App _CreateProcess={_CreateProcess} _useSelector={_useSelector} />);
  expect(screen.getByText("see ya")).toBeInTheDocument()
});
test('should render the Home component when follower, editor, and createProcess are false ', () => {
  const _useSelector = (fn) => {
    return fn({
      Login: {
        editor: false,
        follower: false,
        createProcess: false
      }
    });
  };
  const _useDispatch = () => {};
  const _Home = () => "create Process";
  render(<App _Home={_Home} _useSelector={_useSelector} />);
  expect(screen.getByText("create Process")).toBeInTheDocument()
});