import { SOME_ACTION } from './actions';

function someAction(state = 0, action/*, props*/) {
  return action.type === SOME_ACTION ?
    action.data :
    state;
}

export default function reducer(state = {}, action, props) {
  return {
    someState: someAction(state.someAction, action, props)
  };
}
