import Vue from 'vue'
import App from './App.vue'
import Home from './components/home.vue'
import Dashboard from './components/dashboard.vue'

import VueRouter from 'vue-router'
import VueResouce from 'vue-resource'
//var VueResouce = require("vue-resource")
import Materials from 'vue-materials'

Vue.use(Materials)
Vue.use(VueResouce);
Vue.use(VueRouter);

Vue.http.options.credentials = true;
const router = new VueRouter({
  routes:[
    {
      name: 'LandingPage',
      path: '/',
      component: Dashboard
    },
    {
      name: 'Dashboard',
      path: '/home',
      component: Dashboard
    }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
