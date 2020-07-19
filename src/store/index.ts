import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist';

// Modules
import userModule from './modules/users'
import qaModule from './modules/qa'
import chatModule from './modules/chat'

Vue.use(Vuex);

import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default new Vuex.Store({
  strict: true,
  devtools: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    users: userModule,
    qa: qaModule,
    chat: chatModule,
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      key: 'AxumHUB',
    }).plugin,
  ],
});
