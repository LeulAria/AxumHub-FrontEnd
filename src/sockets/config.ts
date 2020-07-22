import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import store from '../store'
import { baseURL } from '@/api/Api'

// development server
const socket = io(baseURL.slice(0, -3))

Vue.use(VueSocketIOExt, socket, { store });