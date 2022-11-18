import './news-page.css'
import moment from 'moment';
import Comment from '../Comment/Comment';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function NewsPage(props) {

  const { newsId } = useParams();

  useEffect(() => {
    props.getNewsPage(newsId);
  }, [])

  return (
      <main className='news-page'>
        <Link to='/' className='news-page__button' type='button' aria-label='Обновление' />
        {props.newsPage.url && <a className='news-page__link' href={props.newsPage.url} target='_blank' rel='noreferrer'>
          Read more
        </a>}
        <h2 className='news-page__title'>{props.newsPage.title}</h2>
        <div className='news-page__about'>
          <p className='news-page__info'>{props.newsPage.by}</p>
          <p className='news-page__info'>{moment.unix(props.newsPage.time).format("DD.MM.YYYY HH:mm")}</p>
          <p className='news-page__info'>{`${props.newsPage.descendants} comments`}</p>
        </div>

        {props.newsComments && props.newsComments.map((comment) => {
          return <Comment 
            key = {comment.id}
            id = {comment.id}
            by = {comment.by}
            time = {comment.time}
            text = {comment.text}
            kids = {comment.kids}
            getChildComments = {props.getChildComments}
          />
        })}
      </main>
  )
}

export default NewsPage;
