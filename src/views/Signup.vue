<template>
	<v-container>
		<v-row justify="center" class="mt-10">
			<v-col cols="12" sm="6">
				<h1 class="form-header text-center">Signup</h1>
				<v-card elevation="0" class="pa-6 rounded-lg">
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
									:error-messages="errors"
									prepend-icon="mdi-email-outline"
									label="E-mail"
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
									value="1"
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

					this.$store
						.dispatch("users/registerUser", info)
						.then(res => {
							console.log(res);
							this.loadingSignup = false;
							this.$router.push({ name: "Login" });
						})
						.catch(err => {
							setTimeout(() => (this.loadingSignup = false), 2000);
							console.log(err);
						});
				} else {
					setTimeout(() => (this.loadingSignup = false), 2000);
				}
			})
			.catch((error: any) => {
				setTimeout(() => (this.loadingSignup = false), 2000);
				console.log(error);
			});
	}
}
</script>

<style lang="stylus" scoped>
.v-text-field
  font-family Montserrat
</style>