import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/vuesax";
import './sockets/config'
import './utils/validation_observer'
import './styles/global.styl';

import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'boxicons'
import 'boxicons/css/boxicons.min.css'

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
