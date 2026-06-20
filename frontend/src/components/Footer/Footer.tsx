import { NavLink } from 'react-router-dom';
import s from './Footer.module.css';

function Footer() {
  return (
    <nav className={s.bottomNav}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? `${s.bnItem} ${s.active}` : `${s.bnItem}`)}
      >
        <span className={s.bnIconSq} />
        Места
      </NavLink>
      <NavLink
        to="/collection"
        className={({ isActive }) => (isActive ? `${s.bnItem} ${s.active}` : `${s.bnItem}`)}
      >
        <span className={s.bnIconStar} />
        Коллекция
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? `${s.bnItem} ${s.active}` : `${s.bnItem}`)}
      >
        <span className={s.bnIconDot} />
        Профиль
      </NavLink>
    </nav>
  );
}

export default Footer;
