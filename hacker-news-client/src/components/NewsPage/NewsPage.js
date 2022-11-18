import './news-page.css'
import moment from 'moment';
import Comment from '../Comment/Comment';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { changeNewsPage, changeNewsComments } from '../../store/NewsPage/actions';

const NewsPage = (props) => {

  const [IsLoading, setIsLoading] = useState(false);
  const { newsId } = useParams();

  async function getNewsPage(newsId) {
    const newsPage = await props.getNewsPage(newsId);
    props.changeNewsPage(newsPage);
    if (typeof newsPage.kids !== 'undefined') {
      getNewsComments(newsPage);
    }
  }

  async function getNewsComments(newsPage) {
    setIsLoading(true);
    const comments = await props.getNewsComments(newsPage);
    props.changeNewsComments(comments);
    setIsLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getNewsPage(newsId);
  }, [])

  return (
      <main className='news-page'>
        <Link to='/' className='news-page__button' type='button' aria-label='Назад' />
        {props.newsPage.url && <a className='news-page__link' href={props.newsPage.url} target='_blank' rel='noreferrer'>
          Read more
        </a>}
        <h2 className='news-page__title'>{props.newsPage.title}</h2>
        <div className='news-page__about'>
          <p className='news-page__info'>{props.newsPage.by}</p>
          <p className='news-page__info'>{moment.unix(props.newsPage.time).format("DD.MM.YYYY HH:mm")}</p>
          <p className='news-page__info'>{`${props.newsPage.descendants ?? 0} comments`}</p>
          <button className='news-page__comment-button' type='button' aria-label='Обновить комментарии' onClick={async () => {await getNewsComments(props.newsPage)}} />
        </div>
        { IsLoading && <PulseLoader className='news-page__loader'  color='#ff6600'/>}
        { (!IsLoading && props.newsComments) && props.newsComments.map((comment) => {
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

const putStateToProps = (state) => {
  return { 
    newsPage: state.newsPageReducer.newsPage,
    newsComments: state.newsPageReducer.newsComments
  }
}

const putActionsToProps = {
  changeNewsPage,
  changeNewsComments
}

export default connect(putStateToProps, putActionsToProps)(NewsPage);