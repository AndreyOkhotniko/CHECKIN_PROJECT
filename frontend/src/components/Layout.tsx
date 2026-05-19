import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import s from './Layout.module.css';

function Layout() {
  return (
    <div className={s.container}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
