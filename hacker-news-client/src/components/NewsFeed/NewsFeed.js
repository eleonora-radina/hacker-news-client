import { Link, useParams } from 'react-router-dom';
import NewsCard from '../NewsCard/NewsCard';
import './news-feed.css'

function NewsFeed(props) {

  return (
    <main className='news-feed'>
      <ul className='news-feed__list'>
      { props.newsFeed && props.newsFeed.map((news => {
          return <Link to={`/item/${news.id}`} className='news-feed__link'>
            <NewsCard 
              key = {news.id}
              id = {news.id}
              title = {news.title}
              score = {news.score}
              by = {news.by}
              data = {news.time}
              url = {news.url}
              handleClickNewsCard = {props.handleClickNewsCard}
            />
          </Link>
        }))}
      </ul>
    </main>
  )
}

export default NewsFeed;

/* 
{props.newsFeed.map((news => {
          return <Link to={news.id} className='news-feed__link'>
            <NewsCard 
              key = {news.id}
              id = {news.id}
              title = {news.title}
              score = {news.score}
              by = {props.by}
              data = {props.time}
              url = {props.url}
            />
          </Link>
        }))}
*/