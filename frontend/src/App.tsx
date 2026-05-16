import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Выбор роли*/}
        <Route index element={<h1>role</h1>} />
        {/*Авторизация*/}
        <Route path="login" element={<h1>login</h1>}></Route>
        {/*Регистрация*/}
        <Route path="register" element={<h1>register</h1>}></Route>

        {/* Subj Routes */}
        {/*Проверка роли*/}
        <Route element={<ProtectedRoute role="subj" />}>
          {/*Список мест*/}
          <Route path="places" element={<h1>places</h1>}></Route>
          {/*Детали места*/}
          <Route path="/places/:id" element={<h1>Detail place id</h1>}></Route>
          {/*Просмотр коллекции штампов*/}
          <Route path="collection" element={<h1>collection</h1>}></Route>
          {/*Профиль гостя*/}
          <Route path="profile" element={<h1>profile</h1>}></Route>
          {/*Сканирование qr кода*/}
          <Route path="scan" element={<h1>scan</h1>}></Route>
          {/*Подтверждение чекина*/}
          <Route path="checkin/:placeId" element={<h1>Check In</h1>}></Route>
        </Route>

        {/* Obj Routes */}
        {/*Проверка роли*/}
        <Route element={<ProtectedRoute role="obj" />}>
          {/*Просмотр всех мест владельца*/}
          <Route path="my-places" element={<h1>my-places</h1>}></Route>
          {/*Создание нового места*/}
          <Route path="my-places/create" element={<h1>my-places/create</h1>}></Route>
          {/*Редактирование существующего места*/}
          <Route path="my-places/:id/edit" element={<h1>my-places/:id/edit</h1>}></Route>
          {/*Статистика существующего места*/}
          <Route path="my-places/:id/stats" element={<h1>my-places/:id/stats</h1>}></Route>
          {/*Просмотр qr кода места*/}
          <Route path="my-places/:id/qr" element={<h1>my-places/:id/qr</h1>}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
