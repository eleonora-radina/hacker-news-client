import { combineReducers } from "redux";
import { newsFeedReducer } from './NewsFeed/reducers';
import { newsPageReducer } from './NewsPage/reducers';

export default combineReducers({
  newsFeedReducer: newsFeedReducer,
  newsPageReducer: newsPageReducer
});