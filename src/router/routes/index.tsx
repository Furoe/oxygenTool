import { lazy } from 'react';
import NotFound from '@/view/NotFound';

const Login = lazy(() => import('@/view/Login'));
const DevTool = lazy(() => import('@/view/DevTool/index'));
const Home = lazy(() => import('@/view/Home'));
const Navbar = lazy(() => import('@/view/components/Navbar'));

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'home',
    element: (
      <>
        <Navbar />
        <Home />,
      </>
    ),
  },
  {
    path: '/sandbox',
    element: (
      <>
        <Navbar />
        <DevTool />
      </>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <NotFound />,
  },
];

export default routes;
