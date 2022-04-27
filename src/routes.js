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
import Teorie from './pages/Teorie';
import User from './pages/User';
import NotFound from './pages/Page404';
import AuthContext from './context/auth-context';
import Confirm from './components/EmailConfirmation/EmailConfirmation';
import Capitol from './pages/Capitol';
import Subcapitol from './pages/Subcapitol';

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
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'teorie', element: <Capitol /> },
        { path: 'subcapitol', element: <Subcapitol /> },
        { path: 'formule', element: <Navigate to="/dashboard/teorie" /> },
        { path: 'exercitii', element: <Navigate to="/dashboard/teorie" /> },
        { path: 'exercitii', element: <Navigate to="/dashboard/teorie" /> },
        { path: 'teste', element: <Navigate to="/dashboard/teorie" /> },
        { path: 'exercitii_gresite', element: <Navigate to="/dashboard/teorie" /> }
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
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'teorie', element: <Capitol /> },
        { path: 'subcapitol', element: <Subcapitol /> },
        { path: 'formule', element: <Navigate to="/dashboard/teorie" /> },
        { path: 'exercitii', element: <Navigate to="/dashboard/teorie" /> },
        { path: 'exercitii', element: <Navigate to="/dashboard/teorie" /> },
        { path: 'teste', element: <Navigate to="/dashboard/teorie" /> },
        { path: 'exercitii_gresite', element: <Navigate to="/dashboard/teorie" /> }
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
