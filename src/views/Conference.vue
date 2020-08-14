<template>
	<v-container>
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">AxumHUB Meet ( {{id}} Team )</h3>
				<v-menu transition="scroll-y-reverse-transition" class="ml-auto" offset-y>
					<template v-slot:activator="{ on, attrs }">
						<v-btn class="ma-2 elevation-0" fab small v-bind="attrs" v-on="on">
							<v-icon>mdi-menu-down-outline</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item @click="joinMeting(id)">
							<v-list-item-title>Join Meeting</v-list-item-title>
						</v-list-item>
						<v-list-item @click="shareScreen(id)">
							<v-list-item-title>Share Screen</v-list-item-title>
						</v-list-item>
						<v-list-item @click="capture(id)">
							<v-list-item-title>Capture Image</v-list-item-title>
						</v-list-item>
						<v-list-item @click="leaveMeting(id)">
							<v-list-item-title>Leave Meeting</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" xs="12">
				<div class="d-flex">
					<div class="ml-auto">
						<v-btn @click="shareScreen(id)" dark small color="info" class="elevation-0" v-if="hasJoined">
							share screen
							<v-icon class="ml-2">mdi-monitor-screenshot</v-icon>
						</v-btn>
						<v-btn
							@click="capture(id)"
							dark
							small
							color="success"
							class="elevation-0 ml-4"
							v-if="hasJoined"
						>
							capture image
							<v-icon class="ml-2">mdi-camera-enhance</v-icon>
						</v-btn>
					</div>
				</div>
			</v-col>
		</v-row>
		<v-row v-if="!hasJoined" align="center" justify="center">
			<v-col cols="6" xs="12" sm="5" min-height="600px">
				<h1 class="align-center">JOIN MEETING NOW!</h1>
				<vs-button @click="joinMeting(id)">
					JOIN MEETING
					<i class="bx bxs-paper-plane"></i>
				</vs-button>
			</v-col>
		</v-row>
		<v-container>
			<vue-webrtc
				ref="webrtc"
				width="100%"
				:roomId="id"
				cameraHeight="200"
				:enableAudio="true"
				:enableVideo="true"
				:autoplay="true"
				:joined-room="userJoinedRoom"
			/>
		</v-container>
	</v-container>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
import WebRTC from "vue-webrtc";

import * as io from "socket.io-client";

Vue.use(WebRTC);

@Component({})
export default class Conference extends Vue {
	@Prop({ type: String, required: true })
	id = "";
	hasJoined = false;

	mounted() {
		window.io = io;
	}
	joinMeting(id) {
		this.hasJoined = true;
		this.$store.dispatch(
			"snackbar",
			`You have joined ${this.id} meet successfully!`
		);
		this.$refs.webrtc.join(id);
	}
	leaveMeting(id) {
		this.hasJoined = false;
		this.$refs.webrtc.leave(id);
		this.$store.dispatch("snackbar", `You have leaved ${this.id} meet!`);
	}
	shareScreen(id) {
		this.$refs.webrtc.shareScreen(id);
		this.$store.dispatch("snackbar", `Screen is shering for ${this.id} meet!`);
	}
	capture(id) {
		this.$refs.webrtc.capture(id);
		this.$store.dispatch(
			"snackbar",
			`Screen has been captured ( ${this.id} meet!)`
		);
	}

	// events
}
</script>

<style lang="stylus">
.video-list
  background transparent !important
.video-item > div
  margin 2em !important
	border-radius 10px
	box-shadow 0px 0px 10px rgba(0,0,0,0.2)
</style>