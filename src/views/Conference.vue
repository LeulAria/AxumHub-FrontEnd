<template>
	<v-container>
		<h1>This is a simple task...</h1>
		<vue-webrtc ref="webrtc" width="100%" roomId="sample-room" cameraHeight="100" />Room: sample-room
	</v-container>
</template>

<script>
import { Component } from "vue-property-decorator";

import Vue from "vue";
import WebRTC from "vue-webrtc";

import * as io from "socket.io-client";
window.io = io;

Vue.use(WebRTC);

@Component({})
export default class Conference extends Vue {
	mounted() {
		this.$refs.webrtc.join();
	}
}
</script>

<style lang="stylus">
.video-list
  background transparent !important
.video-item > div
  margin 2em !important
</style>