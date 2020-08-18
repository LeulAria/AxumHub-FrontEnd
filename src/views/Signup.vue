<template>
	<v-container class="bg-img">
		<v-row justify="center">
			<v-col cols="10" sm="6" md="5" class="auth-form-container">
				<h1 class="form-header text-center">Signup</h1>
				<v-card elevation="0" dark class="pa-6 form-container">
					<ValidationObserver ref="singupObserver">
						<form>
							<ValidationProvider v-slot="{ errors }" name="username" rules="required|min:2|max:150">
								<v-text-field
									v-model="username"
									prepend-icon="mdi-account-circle-outline"
									:counter="150"
									:error-messages="errors"
									label="Fullname"
									required
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="email" rules="required|email|min:5">
								<v-text-field
									v-model="email"
									prepend-icon="mdi-email-outline"
									label="E-mail"
									:error-messages="errors"
									required
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="password" rules="required|min:8">
								<v-text-field
									v-model="password1"
									:prepend-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
									:type="showPassword ? 'text' : 'password'"
									:error-messages="errors"
									name="password1"
									label="Password"
									hint="At least 8 characters"
									@click:prepend="showPassword = !showPassword"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="confirm password" rules="required|min:8">
								<v-text-field
									v-model="password2"
									:prepend-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
									:type="showPassword ? 'text' : 'password'"
									:error-messages="errors"
									name="password1"
									label="Confirm Password"
									hint="password must match with previous one"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" rules="required" name="agreeterms">
								<v-checkbox
									color="info"
									v-model="agreeterms"
									:error-messages="errors"
									:value="1"
									label="I agree to Axumhub Terms and Service and Privacy Policy"
									type="checkbox"
									required
								></v-checkbox>
							</ValidationProvider>

							<v-card-actions class="mt-4">
								<v-btn
									:loading="loadingSignup"
									:disabled="loadingSignup"
									color="indigo"
									class="mr-4 white--text"
									small
									@click="submit"
								>
									<span v-show="!loadingSignup">Submit</span>
									<v-icon class="px-4" dark v-show="loadingSignup">mdi-cloud-upload</v-icon>
								</v-btn>
								<v-btn depressed small @click="clear">clear</v-btn>
							</v-card-actions>
						</form>
					</ValidationObserver>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Signup extends Vue {
	username = "";
	email = "";
	password1 = "";
	password2 = "";
	agreeterms = null;
	showPassword = false;
	loadingSignup = false;

	clear() {
		this.username = "";
		this.email = "";
		this.password1 = "";
		this.password2 = "";
		this.agreeterms = null;
		this.showPassword = false;
		(this.$refs.singupObserver as Vue & { reset: () => boolean }).reset();
	}

	submit() {
		this.loadingSignup = true;
		(this.$refs.singupObserver as Vue & {
			validate: () => any;
		})
			.validate()
			.then((isValid: boolean) => {
				if (isValid) {
					const info: any = {
						name: this.username,
						email: this.email,
						password: this.password1,
						password2: this.password2
					};

					console.log("send this.....", info);
					this.$store
						.dispatch("users/registerUser", info)
						.then(res => {
							console.log("show this result: ", res);
							this.loadingSignup = false;
							this.$vs.notification({
								icon: "<i class='bx bx-bell' ></i>",
								color: "primary",
								position: "top-right",
								title: "Success",
								text: `Accout created successfully for ${info.name}`
							});
							this.$router.push({ name: "Login" });
						})
						.catch(err => {
							this.$vs.notification({
								icon: "<i class='bx bxs-bug' ></i>",
								color: "danger",
								position: "top-right",
								title: "Signup Error",
								text: `Error: ${err.error ? err.error : err.email ? err.email : err.password2 ? err.password2 : 'Some thing went wrong!'}`
							});
							setTimeout(() => (this.loadingSignup = false), 1000);
							console.log(err);
						});
				} else {
					setTimeout(() => (this.loadingSignup = false), 2000);
				}
			})
			.catch((err: any) => {
				console.log("show this error: ", err);
				this.$vs.notification({
					icon: "<i class='bx bxs-bug' ></i>",
					color: "danger",
					position: "top-right",
					title: "Signup Error",
					text: `Error: ${err}`
				});
				setTimeout(() => (this.loadingSignup = false), 1000);
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