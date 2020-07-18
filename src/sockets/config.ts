import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import store from '../store'

// development server
const socket = io('http://localhost:8000')

Vue.use(VueSocketIOExt, socket, { store });
