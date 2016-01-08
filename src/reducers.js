import { SOME_ACTION } from './actions';

function someAction(props, state = {}, action) {
  return action.type === SOME_ACTION ?
    action.data :
    state;
}

export default function reducer(props, state = {}, action) {
  return {
    someState: someAction(props, state.someAction, action)
  };
}
