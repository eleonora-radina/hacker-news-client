export const ACTION_CHANGE_NEWS_PAGE = 'ACTION_CHANGE_NEWS_PAGE';
export const ACTION_CHANGE_NEWS_COMMENTS = 'ACTION_CHANGE_NEWS_COMMENTS';

export const changeNewsPage = (newsPage) => ({
  type: ACTION_CHANGE_NEWS_PAGE,
  payload: newsPage
});

export const changeNewsComments = (newsComments) => ({
  type: ACTION_CHANGE_NEWS_COMMENTS,
  payload: newsComments
});