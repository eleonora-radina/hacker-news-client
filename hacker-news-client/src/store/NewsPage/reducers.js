import { ACTION_CHANGE_NEWS_PAGE, ACTION_CHANGE_NEWS_COMMENTS } from './actions';

const initialState = {
  newsPage: {},
  newsComments: []
};

export const newsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CHANGE_NEWS_PAGE:
      return { ...state, newsPage: action.payload };

    case ACTION_CHANGE_NEWS_COMMENTS:
        return { ...state, newsComments: action.payload };

    default:
      return state;
  }
}