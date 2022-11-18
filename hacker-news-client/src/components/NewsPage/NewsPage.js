import './news-page.css'
import moment from 'moment';
import Comment from '../Comment/Comment';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { changeNewsPage, changeNewsComments } from '../../store/NewsPage/actions';

const NewsPage = (props) => {

  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const history = useHistory();

  const { newsId } = useParams();

  async function getNewsPage(newsId) {
    setIsLoadingPage(true);
    const newsPage = await props.getNewsPage(newsId);
    props.changeNewsPage(newsPage);
    getNewsComments(newsPage);
    setIsLoadingPage(false);
  }

  async function getNewsComments(newsPage) {
    if (typeof newsPage.kids !== 'undefined') {
      setIsLoadingComments(true);
      const comments = await props.getNewsComments(newsPage);
      props.changeNewsComments(comments);
      setIsLoadingComments(false);
    }
  }

  function handleBack() {
    props.changeNewsPage({});
    props.changeNewsComments([]);
    history.push('/')
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getNewsPage(newsId);
  }, [])

  return (
    <main className='news-page'>
      {isLoadingPage && <PulseLoader className='news-page__loader' color='#ff6600' />}
      {!isLoadingPage &&
        <div className='news-page-zone'>
          <button className='news-page__button' type='button' aria-label='Назад' onClick={handleBack} />
          {props.newsPage.url && <a className='news-page__link' href={props.newsPage.url} target='_blank' rel='noreferrer'>
            Read more
          </a>}
          <h2 className='news-page__title'>{props.newsPage.title}</h2>
          <div className='news-page__about'>
            <p className='news-page__info'>{props.newsPage.by}</p>
            <p className='news-page__info'>{moment.unix(props.newsPage.time).format("DD.MM.YYYY HH:mm")}</p>
            <p className='news-page__info'>{`${props.newsPage.descendants ?? 0} comments`}</p>
            <button className='news-page__comment-button' type='button' aria-label='Update' onClick={async () => { await getNewsComments(props.newsPage) }} />
          </div>
        </div>
      }
      {isLoadingComments && <PulseLoader className='news-page__loader' color='#ff6600' />}
      {(!isLoadingComments && props.newsComments) && props.newsComments.map((comment) => {
        return <Comment
          key={comment.id}
          id={comment.id}
          by={comment.by}
          time={comment.time}
          text={comment.text}
          kids={comment.kids}
          getChildComments={props.getChildComments}
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