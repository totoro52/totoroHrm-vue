import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false
axios.interceptors.request.use(
  config => {
  let token =localStorage.getItem('token')
  if (token) {
    
    config.headers.common['token'] =localStorage.getItem('token');
  }
  return config
  },
  err => {
    return Promise.reject(err);
  });
Vue.prototype.$axios = axios
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
