import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';

import merge from 'lodash/merge';

const commentsReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_COMMENTS:
      return action.comments;
    case RECEIVE_COMMENT:
      return nextState = merge({}, state, {[action.comment.id]: action.comment});
    case REMOVE_COMMENT:
      nextState = merge({}, state);
      delete nextState[action.comment.id];
      return nextState;
    default:
      return state;
  }
}

export default commentsReducer;
