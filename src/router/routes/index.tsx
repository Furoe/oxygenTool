import {lazy} from 'react'
const Login = lazy(() => import('@/view/Login'))
import NotFound from '@/view/NotFound'


const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound/>,
    errorElement: <NotFound/>
  }
]

export default routes