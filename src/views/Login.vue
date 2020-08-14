<template>
	<v-container>
		<v-row justify="center" class="mt-10">
			<v-col cols="12" sm="6">
				<h1 class="form-header text-center">Login</h1>
				<v-card elevation="0" class="pa-6 rounded-lg">
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

					console.log("preparing to unleash the beast");
					this.$store
						.dispatch("users/loginUser", info)
						.then(res => {
							console.log("alrity mighty");
							this.loadingLogin = false;
							console.log(
								"the pofile obj: ",
								Object.keys(this.userProfile).length
							);
							if (Object.keys(this.userProfile).length)
								this.$router.push({ name: "ProfileInfo" });
							this.$router.push({ name: "Dashboard" });
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					setTimeout(() => (this.loadingLogin = false), 2000);
				}
			})
			.catch((error: any) => {
				setTimeout(() => (this.loadingLogin = false), 2000);
				console.log("catch: ", error);
			});
	}
}
</script>