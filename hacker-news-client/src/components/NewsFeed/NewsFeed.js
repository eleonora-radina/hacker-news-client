import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeNewsFeed } from '../../store/NewsFeed/actions'
import NewsCard from '../NewsCard/NewsCard';
import { BounceLoader } from 'react-spinners';
import './news-feed.css';

const NewsFeed = (props) => {
  const [IsLoading, setIsLoading] = useState(false);

  async function getNews() {
    props.changeNewsFeed(await props.getNewsFeed());
  }

  const handleNewsUpdate = async () => {
    setIsLoading(true);
    await getNews();
    setIsLoading(false);
  }

  useEffect(() => {
    if (props.newsFeed.length === 0) {
      handleNewsUpdate();
    }
  }, [])

  useEffect(() => {
  }, [props.newsFeed])

  useEffect(() => {
    const interval = setInterval(() => { getNews() }, 60000);
    return () => clearInterval(interval);
  })

  return (
    <main className='news-feed'>
      <div className='news-feed__title-zone'>
        <h1 className='news-feed__title'>Latest news</h1>
        <button className='news-feed__button' type='button' aria-label='Update news' onClick={handleNewsUpdate} />
      </div>
      <ul className='news-feed__list'>
        {IsLoading && <BounceLoader className='news-feed__loader' color='#ff6600' />}
        {(!IsLoading && props.newsFeed) && props.newsFeed.filter(news => news.id !== null && news.deleted !== true).map((news => {
          return <NewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              score={news.score}
              by={news.by}
              data={news.time}
              url={news.url}
              handleClickNewsCard={props.handleClickNewsCard}
            />
        }))}
      </ul>
    </main>
  )
}

const putStateToProps = (state) => {
  return { newsFeed: state.newsFeedReducer.newsFeed }
}

const putActionsToProps = {
  changeNewsFeed
}

export default connect(putStateToProps, putActionsToProps)(NewsFeed);