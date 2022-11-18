import './news-card.css'
import moment from 'moment';
import { Link } from 'react-router-dom';

function NewsCard(props) {

  return (
    <li className='news-card' key={props.id} >
      <Link to={`/item/${props.id}`} className='news-card__link'>
        <div className='news-card__zone'>
          <h2 className='news-card__title'>{props.title}</h2>
          <div className='news-card__about-zone'>
            <div className='news-card__about'>
              <p className='news-card__info'>{props.score}</p>
              <p className='news-card__info'>{props.by}</p>
              <p className='news-card__info'>{moment.unix(props.data).format("DD.MM.YYYY HH:mm")}</p>
            </div>
            <p className='news-card__info news-card__info_link' >Read more</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default NewsCard;
