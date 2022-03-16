import Login from '../components/Login.vue';
import Home from '../components/Home.vue';

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
  },
];
