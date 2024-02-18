import { Link } from 'react-router-dom';
import logo from '../../image/logoTrybe.png';
import style from './Header.module.css';
import home from '../../image/home.png';

function Header () {
  return (
    <header>
      <>
        <img src={logo} alt="Logo da Trybe" className={style.logo} />
        <h1>TRYBE NEWS</h1>
        <Link to="/" className={style.link}>
          <img src={home} alt="Home" className={style.home} />
        </Link>
      </>
    </header>
  )
}

export default Header;