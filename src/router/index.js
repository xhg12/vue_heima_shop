import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
  routes,
});

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //    next()  放行  next('/login')  强制跳转

  //如果用户访问的是登录页面，直接放行
  if (to.path === '/login') return next();

  //从 sessionStorage 中获取到保存的 token 值
  const tokenStr = sessionStorage.getItem('token');

  //如果没有 token 强制跳转到登录页面
  if (!tokenStr) return next('/login');

  next();
});

export default router;
