// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueProgressBar from 'vue-progressbar';
import VModal from 'vue-js-modal';

import Login from 'components/Login';

import Auth from './auth';
import App from './App';
import store from './store';

/* eslint-disable no-unused-vars */
import filters from './filters';

// Vendor
window.jQuery = require('jquery');
require('bootstrap-sass');

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VModal);
Vue.use(require('vue-moment'));

Vue.http.options.root = process.env.API_BASE_URL;

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: { requiresAuth: false }
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('auth_token')) {
    // if route requires auth and user isn't authenticated
    router.push('login');
  }
  else {
    next();
  }
});

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401 && request.url !== 'login') {
      Auth.logout(this);
    }
  });
});

// Remove Authorization header when sending requests to AWS instead of application api
Vue.http.interceptors.push((request, next) => {
  const removeAuthHeaders = request.url.includes('amazonaws');
  if (removeAuthHeaders) {
    request.headers.delete('Authorization');
  }
  else {
    const token = localStorage.getItem('auth_token');
    if (token) {
      request.headers.set('Authorization', localStorage.getItem('auth_token'));
    }
  }
  next();
});

export default router;

Vue.use(VueProgressBar, {
  color: '#2980B9',
  failedColor: '#d9534f',
  thickness: '3px',
  location: 'bottom',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, Login },
});
