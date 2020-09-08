<template>
	<div class="home">
		<v-app-bar color="#4e54c8" elevate-on-scroll dark fixed>
			<v-toolbar-title class="app_title">
				<span class="logo_title_slim ml-5">axum&nbsp;</span>HUB
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn :to="{ name: 'Login' }" text small class="rounded-xl mx-2" link>Login</v-btn>
			<v-btn
				:to="{ name: 'Signup' }"
				light
				small
				color="#fff"
				class="rounded-xl mx-3 mr-10 px-5 font-weight-bold"
				link
			>Signup</v-btn>
		</v-app-bar>
		<div class="context">
			<v-container class="mt-5 ma-auto">
				<v-row justify="space-around">
					<v-col cols="10" sm="10" md="6" class>
						<div class="desc-text">
							<h1 class="white--text">Developers hub</h1>
							<p
								class="white--text text-center align-center"
							>communication and colaboration platform for developers</p>
							<div class="d-flex align-center justify-center">
								<v-btn
									large
									class="start-btn align-center px-5 font-weight-bold"
									link
									:to="{ name: 'Signup' }"
								>Get Started</v-btn>
							</div>
						</div>
					</v-col>
					<v-col cols="10" sm="10" md="4" class="d-flex justify-center mb-5">
						<img
							class="mt-3 banner-img"
							src="http://www.testqtech.com/assets/images/SEO-banner.png"
							height="300px"
						/>
					</v-col>
				</v-row>
			</v-container>
		</div>
		<div class="area">
			<ul class="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');

*
  margin: 0px;
  padding: 0px;


/* Global */
html{
  min-height: 100%;
  // overflow: hidden;
}
body{
  min-height: calc(100vh - 8em);
  padding: 4em;
  color: rgba(255,255,255,.75); 
  background-color: #333 !important;  
}

.context 
  background #4e54c8 !important;

.v-application
  background #4e54c8 !important


.desc-text 
  margin-top 3.5em
  margin-bottom 5em

.banner-img, .desc-text {
  transform: scale(0);
  animation: zoom-in 2s ease-out forwards normal;
}

.start-btn
  border-radius 25px !important
  margin 1em auto !important
  transition all .4s !important
  cursor pointer !important
  &::hover
    box-shadow 0 1px 10px rgba(0,0,0,0.4) !important

@keyframes zoom-in {
  0% {transform:scale(0)}
  25% {transform:scale(1.15)}
  50% {transform:scale(1.1)}
  75% {transform:scale(1.13)}
  80% {transform:scale(.9)}
  100% {transform:scale(1)}
}

/* Animation */
.anim-typewriter{
  animation-delay: 2s;
  animation: typewriter 4s steps(18) 800ms 1 normal both,
             blinkTextCursor 400ms steps(50) infinite normal;
}
@keyframes typewriter{
  from{width: 0;}
  to{width: 10em;}
}
@keyframes blinkTextCursor{
  from{border-right-color: rgba(255,255,255,.75);}
  to{border-right-color: transparent;}
}

.context
  width 100%
  position absolute
  top 20vh

.context h1
  text-align center
  color #fff
  font-size 50px

.area
  background #4e54c8
  background -webkit-linear-gradient(to left, #8f94fb, #4e54c8) 
  width 100%
  height 100vh
  
.circles
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  overflow hidden

.circles li
  position absolute
  display block
  list-style none
  width 20px
  height 20px
  background rgba(255, 255, 255, 0.2)
  animation animate 25s linear infinite
  bottom -150px

.circles li:nth-child(1)
  left 25%
  width 80px
  height 80px
  animation-delay 0s

.circles li:nth-child(2)
  left 10%
  width 20px
  height 20px
  animation-delay 2s
  animation-duration 12s

.circles li:nth-child(3)
  left 70%
  width 20px
  height 20px
  animation-delay 4s

.circles li:nth-child(4)
  left 40%
  width 60px
  height 60px
  animation-delay 0s
  animation-duration 18s

.circles li:nth-child(5)
  left 65%
  width 20px
  height 20px
  animation-delay 0s

.circles li:nth-child(6)
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;

.circles li:nth-child(7)
  left 35%
  width 150px
  height 150px
  animation-delay 7s

.circles li:nth-child(8)
  left 50%
  width 25px
  height 25px
  animation-delay 15s
  animation-duration 45s

.circles li:nth-child(9)
  left 20%
  width 15px
  height 15px
  animation-delay 2s
  animation-duration 35s

.circles li:nth-child(10)
  left 85%
  width 150px
  height 150px
  animation-delay 0s
  animation-duration 11s

@keyframes animate
  0%
    transform translateY(0) rotate(0deg)
    opacity 1
    border-radius 0

  100%
    transform translateY(-1000px) rotate(720deg)
    opacity 0
    border-radius 50%
</style>