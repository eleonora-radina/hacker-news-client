import logo from '../../images/logo.png';
import update from '../../images/update.svg'
import './header.css'
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className='header'>
      <div className='header__info-zone'> 
        <div className='header__logo-zone'> 
          <Link to="/"><img className='header__logo' src={logo} alt='Логотип проекта' /></Link>
          <h1 className='header__title'>Hacker News</h1>
        </div>
        <button className='header__button' type='button' aria-label='Обновление' onClick={props.handleClickUpdate}>
            <img src={update} alt='Update button' />
        </button>
      </div>
    </header>
  )
}

export default Header;
