<template>
	<v-container>
		<v-row justify="center" class="mt-10">
			<v-col cols="12" sm="6">
				<h2 class="form-header text-center">Add Experiance Profile</h2>
				<v-card elevation="0" class="pa-6 rounded-lg">
					<ValidationObserver ref="singupObserver">
						<form>
							<ValidationProvider v-slot="{ errors }" name="title" rules="required|min:5|max:40">
								<v-text-field
									v-model="title"
									prepend-icon="mdi-account-key-outline"
									:counter="40"
									:error-messages="errors"
									label="*Job Title"
									required
									hint="Job title worked as... eg: software engineer"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="company" rules="required|min:2">
								<v-text-field
									v-model="company"
									:error-messages="errors"
									prepend-icon="mdi-home-city-outline"
									label="Company Name"
									required
									hint="The company name that you have worke in (OPTIONAL)"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="from" rules="required">
								<v-menu
									ref="from"
									v-model="menuFrom"
									:close-on-content-click="false"
									transition="scale-transition"
									offset-y
									min-width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="from"
											label="Working From"
											prepend-icon="event"
											readonly
											v-bind="attrs"
											v-on="on"
											required
											:error-messages="errors"
										></v-text-field>
									</template>
									<v-date-picker
										ref="picker"
										v-model="from"
										:max="new Date().toISOString().substr(0, 10)"
										min="1950-01-01"
										@change="saveFrom"
									></v-date-picker>
								</v-menu>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="current">
								<v-checkbox
									color="info"
									v-model="current"
									:error-messages="errors"
									label="Still curruntly working"
									type="checkbox"
								></v-checkbox>
							</ValidationProvider>

							<v-menu
								v-if="!current"
								ref="to"
								v-model="menuTo"
								:close-on-content-click="false"
								transition="scale-transition"
								offset-y
								min-width="290px"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="to"
										label="Working till"
										prepend-icon="event"
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker
									ref="picker"
									v-model="to"
									:max="new Date().toISOString().substr(0, 10)"
									min="1950-01-01"
									@change="saveTo"
								></v-date-picker>
							</v-menu>

							<ValidationProvider v-slot="{ errors }" name="description" rules="min:5">
								<v-text-field
									v-model="description"
									counter="200"
									:error-messages="errors"
									prepend-icon="mdi-account-details-outline"
									label="Descirption"
									required
									hint="Brife description about your experiance... (OPTIONAL)"
								></v-text-field>
							</ValidationProvider>

							<v-card-actions class="mt-4 ml-5">
								<v-btn
									:loading="loadingSignup"
									:disabled="loadingSignup"
									color="indigo"
									class="mr-4 white--text"
									small
									@click="submit()"
								>
									<span v-show="!loadingSignup">Submit</span>
									<v-icon class="px-4" dark v-show="loadingSignup">mdi-cloud-upload</v-icon>
								</v-btn>
								<v-btn depressed small @click="clear()">clear</v-btn>
							</v-card-actions>
						</form>
					</ValidationObserver>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from "vue-property-decorator";

@Component({})
export default class Signup extends Vue {
	title = "";
	company = "";
	from = "";
	to = "";
	current = false;
	description = "";
	loadingSignup = false;

	date = null;
	menuFrom = false;
	menuTo = false;

	@Watch("from")
	onFromChange(val: string) {
		val && setTimeout(() => (this.$refs.from as any).activePicker == "YEAR");
	}
	@Watch("to")
	onToChange(val: string) {
		val && setTimeout(() => (this.$refs.to as any).activePicker == "YEAR");
	}
	saveFrom(date: string) {
		(this.$refs.from as any).save(date);
	}
	saveTo(date: string) {
		(this.$refs.to as any).save(date);
	}
	clear() {
		this.title = "";
		this.company = "";
		this.from = "";
		this.to = "";
		this.current = false;
		this.description = "";
		(this.$refs.singupObserver as Vue & { reset: () => boolean }).reset();
	}

	submit() {
		const info = {
			title: this.title,
			company: this.company,
			from: this.from,
			to: !this.current ? this.to : "now",
			current: this.current,
			description: this.description
		};
		console.log(info);
		// 	this.loadingSignup = true;
		// 	(this.$refs.singupObserver as Vue & {
		// 		validate: () => any;
		// 	})
		// 		.validate()
		// 		.then((isValid: boolean) => {
		// 			if (isValid) {
		// 				const info: any = {
		// 					name: this.handle
		// 				};

		// 				this.$store
		// 					.dispatch("users/registerUser", info)
		// 					.then(res => {
		// 						console.log(res);
		// 						this.loadingSignup = false;
		// 						this.$router.push({ name: "Dashboard" });
		// 					})
		// 					.catch(err => {
		// 						setTimeout(() => (this.loadingSignup = false), 2000);
		// 						console.log(err);
		// 					});
		// 			} else {
		// 				setTimeout(() => (this.loadingSignup = false), 2000);
		// 			}
		// 		})
		// 		.catch((error: any) => {
		// 			setTimeout(() => (this.loadingSignup = false), 2000);
		// 			console.log(error);
		// 		});
	}
}
</script>

<style lang="stylus" scoped>
</style>