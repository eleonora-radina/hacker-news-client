import { Switch, Route } from 'react-router-dom';
import './App.css';
import '../../vendor/fonts/inter.css';
import '../../vendor/normalize.css';
import Header from '../Header/Header';
import NewsFeed from '../NewsFeed/NewsFeed'
import NewsPage from '../NewsPage/NewsPage';
import mainApi from '../../utils/MainApi';
import { useEffect, useState } from 'react';

function App() {

  const [newsFeed, setNewsFeed] = useState([]);
  const [newsPage, setNewsPage] = useState([]);
  const [newsComments, setNewsComments] = useState([]);

  function getNewsFeed() {
    mainApi.getAllNews()
      .then(async (news) => {
        const newsArray = await Promise.all(
          news.slice(0, 10).map(async (newsId) => {
            try {
              const newsItem = await mainApi.getNews(newsId);
              console.log(newsItem);
              return newsItem;
            } catch (err) {
              console.log(err);
            }
          })
        )
        setNewsFeed(newsArray);
      })
      .catch((err) => { console.log(err); })
  }

  function getNewsPage(newsId) { 
    mainApi.getNews(newsId)
    .then(async (news) => {
      setNewsPage(news);
      const newsComments = await Promise.all(
        news.kids.map(async (newsKid) => {
          try {
            const newsComment = await mainApi.getComment(newsKid);
            return newsComment;
          } catch (err) {
            console.log(err);
          }
        })
      )
      setNewsComments(newsComments);
    })
    .catch((err) => { console.log(err); })
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

  useEffect(() => {
    getNewsFeed();
  }, [])

  function handleClickUpdate() {
    getNewsFeed();
  }

  return (
    <div className="App">
      <Header 
        handleClickUpdate = {handleClickUpdate}
      />

      <Switch>
        <Route exact path='/'>
          <NewsFeed 
            newsFeed={newsFeed}
          />
        </Route>

        <Route path='/item/:newsId'>
          <NewsPage 
              getNewsPage = {getNewsPage}
              newsPage={newsPage}
              newsComments = {newsComments}
              getChildComments = {getChildComments}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
