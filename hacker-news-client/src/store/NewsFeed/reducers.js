import { ACTION_CHANGE_NEWS_FEED } from './actions';

const initialState = {
  newsFeed: []
};

export const newsFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CHANGE_NEWS_FEED:
      return { ...state, newsFeed: action.payload }

    default:
      return state;
  }
}