<template>
	<v-main color="primary">
		<v-row no-gutters align="center" class="mx-5 my-3">
			<v-col cols="12" xs="12" sm="12" md="5">
				<v-card
					dark
					class="elevation-0 welcome-card pa-5 rounded-xl hoverable mt-3"
					min-height="250px"
					min-width="300px"
				>
					<v-img
						src="https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-digital-technology-electronic-lock-electronic-security-background-image_131755.jpg"
						class="image-decore1"
					></v-img>
					<div class="card-ui">
						<v-row justify="center">
							<v-img
								src="https://cdn3.iconfinder.com/data/icons/flat-badges-vol1/100/64_-512.png"
								class="badge-image"
								max-width="80px"
							></v-img>
						</v-row>
						<h2
							class="user-welcome-txt text-center text"
						>{{$t("message.welcome")}} {{userInfo.name | snnipword(4)}}</h2>
						<h3 contenteditable="true" class="text-center">{{$t("message.focus")}}?</h3>
						<p class="text-center">{{(hour>12)?hour-12:hour}} : {{minute}} : {{second}}</p>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";

@Component({
	components: {},
	computed: {
		...mapGetters("users", ["userInfo"])
	}
})
export default class Dashboard extends Vue {
	userInfo!: any;
	dateId!: number;
	hour = 0;
	minute = 0;
	second = 0;

	mounted() {
		this.getHours();
	}
	destroyed() {
		clearInterval(this.dateId);
	}

	getHours() {
		this.dateId = setInterval(() => {
			this.hour = new Date().getHours();
			this.minute = new Date().getMinutes();
			this.second = new Date().getSeconds();
		}, 1000);
	}
}
</script>

<style lang="stylus" scoped>
.welcome-card
	position relative
	overflow hidden
.image-decore1
	position absolute
	top 0
	left 0
	width 100%
	height 100%
	z-index 1
.card-ui
	position relative
	z-index 10
.user-welcome-txt
	margin-top 1em
	letter-spacing 2px
	text-transform uppercase
.badge-image
	width 80px !important
</style>