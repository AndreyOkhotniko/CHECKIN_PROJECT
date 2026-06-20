import { Link } from 'react-router-dom';
import s from './Header.module.css';

function Header() {
  return (
    <header className={s.header}>
      <Link to="/" className={s.logo}>
        Чекин
      </Link>
    </header>
  );
}

export default Header;
