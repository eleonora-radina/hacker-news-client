import logo from '../../images/logo.png';
import './header.css'
import { Link } from 'react-router-dom';

function Header(props) {

  return (
    <header className='header'>
      <div className='header__info-zone'>
        <Link to="/" className='header__link'>
          <div className='header__logo-zone'>
            <img className='header__logo' src={logo} alt='Логотип проекта' />
            <h1 className='header__title'>Hacker News</h1>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header;
