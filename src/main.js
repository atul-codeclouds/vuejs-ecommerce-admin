// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iziToast from 'izitoast'
import uniqid from 'uniqid'
import modal from './components/others/modal'

Vue.config.productionTip = false

var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;
Vue.prototype.$axios = axios;
Vue.prototype.$iziToast = iziToast;
Vue.prototype.$uniqid = uniqid;

Vue.component("modal",modal);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
