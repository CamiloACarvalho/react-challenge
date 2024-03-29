import { Link } from 'react-router-dom';
import logo from '../../image/logo.png';
import style from './Header.module.css';
import home from '../../image/home.png';

function Header () {
  return (
    <div className={ style.main }>
      <img 
        src={ logo }
        alt="Logo da Trybe"
        className={ style.logo }  
      />
      <h1 className={ style['poller-one-regular'] }>MILO NEWS</h1>
      <Link to="/" className={ style.link }>
        <img 
          src={home}
          alt="Home" 
          className={ style.home }
      />
      </Link>
    </div>
  )
}

export default Header;