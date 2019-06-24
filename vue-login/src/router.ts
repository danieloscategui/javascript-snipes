import Vue from 'vue';
import Router from 'vue-router';
import LoginComponent from './views/login.vue';
import SecureComponent from './views/secure.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login',
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
    },
    {
      path: '/secure',
      name: 'secure',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "secure" */ './views/secure.vue'),
      component: SecureComponent,
    },
  ],
});
