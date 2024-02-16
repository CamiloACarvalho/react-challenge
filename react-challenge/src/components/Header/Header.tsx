import logo from '../../image/logoTrybe.png';
import style from './Header.module.css';

function Header () {
  return (
    <header>
      <>
        <img src={logo} alt="Logo da Trybe" className={style.logo} />
        <h1>TRYBE NEWS</h1>
      </>
    </header>
  )
}

export default Header;