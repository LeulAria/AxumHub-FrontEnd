<template>
	<v-container class="pa-0" fluid>
		<v-app-bar color="#232123" elevate-on-scroll dark fixed scroll-target="#scrolling-techniques-2">
			<template v-slot:img="{ props }">
				<v-img v-bind="props" gradient="to top right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)"></v-img>
			</template>

			<v-app-bar-nav-icon></v-app-bar-nav-icon>

			<v-toolbar-title class="app_title">
				<span class="logo_title_slim">axum</span>HUB
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn :to="{ name: 'Login' }" text small class="rounded-xl mx-2" link>Login</v-btn>
			<v-btn :to="{ name: 'Signup' }" text small class="rounded-xl mx-3 mr-10" link>Signup</v-btn>
		</v-app-bar>

		<v-container class="pa-0 mb-16" fluid>
			<v-carousel show-arrows continuous cycle touch>
				<v-carousel-item v-for="(item,i) in main_hero_titles" :key="i">
					<v-sheet class="main_hero_bg" height="100%" tile>
						<v-row class="fill-height" align="center" justify="center">
							<h1 class="app_title logo_big">
								<span class="logo_slim">{{item.text}}</span>
								{{item.bold}}
							</h1>
						</v-row>
					</v-sheet>
				</v-carousel-item>
			</v-carousel>
		</v-container>

		<v-container class="mb-16">
			<v-row justify="space-between">
				<template v-for="(item, i) in info_section">
					<v-col :key="i" cols="12" xs="12" sm="6" md="4">
						<v-card outlined class="mx-auto" max-width="344">
							<v-img :src="item.img" height="200px"></v-img>

							<div class="d-flex align-center">
								<v-subheader class="h3 ml-auto">{{item.title}}</v-subheader>
								<v-btn class="mr-auto" icon @click="item.show = !item.show">
									<v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
								</v-btn>
							</div>

							<v-expand-transition>
								<div v-show="item.show">
									<v-divider></v-divider>

									<v-card-text>{{item.detail}}</v-card-text>
								</div>
							</v-expand-transition>
						</v-card>
					</v-col>
				</template>
			</v-row>
		</v-container>

		<app-footer></app-footer>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";

@Component({
	components: {
		"app-footer": Footer
	}
})
export default class Home extends Vue {
	main_hero_titles = [
		{
			text: "axum",
			bold: "HUB"
		},
		{
			text: "OpenSource",
			bold: "HUB"
		},
		{
			text: "Colaboration",
			bold: "HUB"
		},
		{
			text: "Q & A",
			bold: "HUB"
		},
		{
			text: "Opportunitys",
			bold: "HUB"
		},
		{
			text: "Much More",
			bold: "AXUMHUB"
		}
	];

	info_section = [
		{
			img:
				"https://d39l2hkdp2esp1.cloudfront.net/img/photo/183357/183357_00_2x.jpg",
			title: "Colaboration HUB",
			description:
				"colaboration is a key in developing big things, axum hubs main focus is to provide a simple, easy to use, engaging and interesting application.",
			detail:
				"axum hub colaboration include the ability for teams of porject contrubuters to talk and communitate in our main platform including our chat application, video conference and more...",
			show: false
		},
		{
			img:
				"http://www.ictbusiness.it/files/2020/02/immagini_contenuti/44082/icona_t.png",
			title: "Opensource Projects",
			description:
				"colaboration is a key in developing big things, axum hubs main focus is to provide a simple, easy to use, engaging and interesting application.",
			detail:
				"axum hub colaboration include the ability for teams of porject contrubuters to talk and communitate in our main platform including our chat application, video conference and more...",
			show: false
		},
		{
			img:
				"https://www.usacarry.com/wp-content/uploads/2017/12/concealed-carry-digest-768x458.jpeg",
			title: "QA and Blogs",
			description:
				"colaboration is a key in developing big things, axum hubs main focus is to provide a simple, easy to use, engaging and interesting application.",
			detail:
				"axum hub colaboration include the ability for teams of porject contrubuters to talk and communitate in our main platform including our chat application, video conference and more...",
			show: false
		}
	];
}
</script>

<style lang="stylus" scoped>
.app_title
  font-weight 900 !important
  text-shadow 0 1px  10px rgba(0,0,0,0.7)
.logo_title_slim
  font-weight 200 !important
.logo_slim
  font-weight 100 !important
.logo_big
  font-size 4rem
.main_hero_bg
  background-image linear-gradient(to bottom, rgba(0,0,0,0.2),rgba(0,0,20,0.8)), url('https://www.omenkaonline.com/wp-content/uploads/2017/08/ETH_2015_DK_154_0.jpg')
  background-position center
  background-size cover
  position relative
</style>