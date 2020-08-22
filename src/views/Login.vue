<template>
	<v-container class="bg-img">
		<v-row justify="center">
			<v-col cols="10" sm="6" md="5" class="auth-form-container">
				<h1 class="form-header text-center mt-8">Login</h1>
				<v-card elevation="0" dark class="pa-6 form-container">
					<ValidationObserver ref="loginObserver">
						<form>
							<ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:2">
								<v-text-field
									v-model="email"
									:error-messages="errors"
									prepend-icon="mdi-email-outline"
									hint="Email account or Username"
									label="Username / E-mail"
									required
								></v-text-field>
							</ValidationProvider>
							<ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:8">
								<v-text-field
									v-model="password"
									:prepend-icon="loginpassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
									:type="loginpassword ? 'text' : 'password'"
									:error-messages="errors"
									name="password1"
									label="Password"
									hint="At least 8 characters"
									@click:prepend="loginpassword = !loginpassword"
									required
								></v-text-field>
							</ValidationProvider>
							<v-card-actions>
								<v-btn to="/signup" small text color="info">Dont have Account?</v-btn>
								<v-spacer></v-spacer>
								<v-btn
									:loading="loadingLogin"
									:disabled="loadingLogin"
									color="indigo"
									class="ma-2 white--text"
									small
									@click="submit"
								>
									<span v-show="!loadingLogin">Submit</span>
									<v-icon class="px-4" dark v-show="loadingLogin">mdi-cloud-upload</v-icon>
								</v-btn>
							</v-card-actions>
						</form>
					</ValidationObserver>

					<div class="d-flex justify-center mt-5 mb-2">or</div>
					<v-btn color="#4299E1" @click="loginWithIdentityProvider()">
						<span>
							<svg class="h-8 w-8 fill-current mr-0 md:mr-2" viewBox="0 0 480 512">
								<path
									fill="currentColor"
									d="M186.1 328.7c0 20.9-10.9 55.1-36.7
						55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7
						55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1
						74.8-216.7 74.8-75.8 0-186.2
						2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5
						41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3
						14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0
						54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6
						30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39
						114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56
						6-14.9 2.3-29.8 3.2-45.1 3.2-15.2
						0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5
						82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4
						150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1
						36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"
								/>
							</svg>
						</span>
						Login With Identity Provider
					</v-btn>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

// form validation
import { extend, setInteractionMode } from "vee-validate";
import { required, email, min, max } from "vee-validate/dist/rules";

setInteractionMode("eager");

@Component({
	computed: {
		...mapGetters("profile", ["userProfile"])
	},
	methods: {
		...mapActions(["loginUser"])
	}
})
export default class Login extends Vue {
	userProfile!: any;
	email = "";
	password = "";
	loginpassword = false;
	loadingLogin = false;

	created() {
		this.$store.dispatch("navbar", false);
	}

	submit() {
		this.loadingLogin = true;
		(this.$refs.loginObserver as Vue & {
			validate: () => any;
		})
			.validate()
			.then((isValid: boolean) => {
				if (isValid) {
					const info: any = {
						password: this.password
					};
					if (/[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,3}/.test(this.email))
						info.email = this.email;
					else info.name = this.email;

					this.$store
						.dispatch("users/loginUser", info)
						.then(res => {
							this.loadingLogin = false;
							console.log(
								"the pofile obj: ",
								Object.keys(this.userProfile).length
							);
							if (Object.keys(this.userProfile).length)
								this.$router.push({ name: "ProfileInfo" });

							this.$store.dispatch("navbar", true);
							this.$router.push({ name: "Dashboard" });

							this.$vs.notification({
								icon: "<i class='bx bx-bell' ></i>",
								color: "primary",
								position: "top-right",
								title: "Welcome",
								text: `Error: Welcome again ${this.userProfile.name} to axumhb`
							});
						})
						.catch((err: string) => {
							setTimeout(() => (this.loadingLogin = false), 2000);
							this.$vs.notification({
								icon: "<i class='bx bxs-bug' ></i>",
								color: "danger",
								position: "top-right",
								title: "Login Error",
								text: `Error: ${err}`
							});
						});
				} else {
					setTimeout(() => (this.loadingLogin = false), 2000);
				}
			})
			.catch((error: any) => {
				setTimeout(() => (this.loadingLogin = false), 2000);
			});
	}

	loginWithIdentityProvider() {
		// this.$store.dispatch("navbar", true);
		// this.$router.push({ name: "Dashboard" });

		this.$vs.notification({
			icon: "<i class='bx bx-bell' ></i>",
			color: "primary",
			position: "top-right",
			title: "Welcome",
			text: `Error: Welcome again to axumhb`
		});
	}
}
</script>

<style lang="stylus" scoped>
.bg-img
	position relative
	overflow-x hidden
	overflow-y auto
	top 0
	left 0
	min-height 100vh
	min-width 100vw
	display flex
	align-items center
	justify-content center
	background-image linear-gradient(to bottom, rgba(0,0,0,0.86),rgba(0,0,20,0.96)), url('https://www.omenkaonline.com/wp-content/uploads/2017/08/ETH_2015_DK_154_0.jpg')
	background-position center
	background-attachment cover
.auth-form-container
	position relative
	max-width 360px !important
	min-height 390px !important
	background rgba(0,0,5,.7)
	box-shadow 0 0 15px rgba(0,0,20,0.8)
	overflow hidden
	&::after
		content ''
		z-index 1
		position absolute
		top -60% 
		left 10px
		width 100%
		height 100%
		background rgba(0,0,5,.97)
		transform rotate(0deg)
		border-top-left-radius 450px
		border-top-right-radius 560px
		border-bottom-left-radius 700px
		border-bottom-right-radius 400px
		animation rfa 10s linear alternate infinite

		@keyframes rfa {
			from {
				transform rotate(0deg)
			}
			to {
				transform rotate(560deg)
			}
		}

.form-header
	padding 5px 0;
	color: #fff
	position relative
	z-index 3 !important
.form-container
	background #fff0
	z-index 2
</style>