import { Navigate, useRoutes } from 'react-router-dom';
import React, { useContext } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import AuthContext from './context/auth-context';
import Confirm from './components/EmailConfirmation/EmailConfirmation';
import Capitol from './pages/Capitol';
import FisaFormule from './pages/FisaFormule';
import Utilizator from './pages/Utilizator';
import Exercitii from './pages/Exercitii';
import Teste from './pages/Teste';
import ExercitiiGresite from './pages/ExercitiiGresite';

// ----------------------------------------------------------------------

export default function Router() {
  const context = useContext(AuthContext);

  const routesObj1 = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { path: 'login', element: <Login /> },
        { path: 'app', element: <Navigate to="/login" /> },
        { path: 'utilizator', element: <Utilizator /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'teorie', element: <Capitol /> },
        { path: 'formule', element: <FisaFormule /> },
        { path: 'exercitii', element: <Exercitii /> },
        { path: 'teste', element: <Teste /> },
        { path: 'exercitii_gresite', element: <ExercitiiGresite /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '/email/confirm/:id', component: { Confirm } },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);

  const routesObj2 = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'utilizator', element: <Utilizator /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'teorie', element: <Capitol /> },
        { path: 'formule', element: <FisaFormule /> },
        { path: 'exercitii', element: <Exercitii /> },
        { path: 'teste', element: <Teste /> },
        { path: 'exercitii_gresite', element: <ExercitiiGresite /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '/email/confirm/:id', component: { Confirm } },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);

  return !context.token ? routesObj1 : routesObj2;
}
