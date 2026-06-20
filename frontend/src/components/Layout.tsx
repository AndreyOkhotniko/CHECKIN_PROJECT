import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import s from './Layout.module.css';
import Footer from './Footer/Footer';

function Layout() {
  return (
    <div className={s.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
