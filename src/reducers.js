import { TOGGLE_VISIBILITY } from './actions';

function toggleVisibility(props, state = props.defaultIsVisible, action) {
  return action.type === TOGGLE_VISIBILITY ? !state : state
}

export default function reducer(props, state = {}, action) {
  return {
    isVisible: toggleVisibility(props, state.isVisible, action)
  };
}
