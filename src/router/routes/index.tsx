import { lazy } from 'react';
import NotFound from '@/view/NotFound';

const Login = lazy(() => import('@/view/Login'));
const DevTool = lazy(() => import('@/view/DevTool/index'));

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'sandbox',
    element: <DevTool />,
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <NotFound />,
  },
];

export default routes;
