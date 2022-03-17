import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/User.vue'

export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    redirect: 'welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome,
      },
      {
        path: '/users',
        component: User,
      },
    ],
  },
]
