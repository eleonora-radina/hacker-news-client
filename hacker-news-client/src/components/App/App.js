import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import '../../vendor/fonts/inter.css';
import '../../vendor/normalize.css';
import Header from '../Header/Header';
import NewsFeed from '../NewsFeed/NewsFeed'
import NewsPage from '../NewsPage/NewsPage';
import mainApi from '../../utils/MainApi';

import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../store/reducers';

function App() {

  const store = createStore(rootReducer);

  const getNewsFeed = async () => {
    return await mainApi.getAllNews()
      .then(async (news) => {
        const newsArray = await Promise.all(
          news.slice(0, 10).map(async (newsId) => {
            try {
              const newsItem = await mainApi.getNews(newsId);
              return newsItem;
            } catch (err) {
              console.log(err);
            }
          })
        )
        return newsArray;
      })
      .catch((err) => { console.log(err); })
  }

  const getNewsPage = async (newsId) => {
    let news = [];
    try {
      news = await mainApi.getNews(newsId);
    } catch (err) {
      console.log(err);
    } finally { return news; }
  }

  const getNewsComments = async (news) => {
    return await Promise.all(
      news.kids.map(async (newsKid) => {
        try {
          const newsComment = await mainApi.getComment(newsKid);
          return newsComment;
        } catch (err) {
          console.log(err);
        }
      })
    )
  }

  const getChildComments = async (kids) => {
    const childComments = await Promise.all(
      kids.map(async (newsKid) => {
        try {
          const newsComment = await mainApi.getComment(newsKid);
          return newsComment;
        } catch (err) {
          console.log(err);
        }
      })
    )
    return childComments;
  }

  return (
    <div className="App">
      <Provider store={store}>
        <Header />

        <Switch>
          <Route exact path='/'>
            <NewsFeed
              getNewsFeed={getNewsFeed}
            />
          </Route>

          <Route path='/item/:newsId'>
            <NewsPage
              getNewsPage={getNewsPage}
              getNewsComments={getNewsComments}
              getChildComments={getChildComments}
            />
          </Route>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
