<template>
	<v-container>
		<v-row justify="center" class="mt-10">
			<v-col cols="12" sm="6">
				<h2 class="form-header text-center">Add Education Profile</h2>
				<v-card elevation="0" class="pa-6 rounded-lg">
					<ValidationObserver ref="singupObserver">
						<form>
							<ValidationProvider v-slot="{ errors }" name="school" rules="required|min:5|max:40">
								<v-text-field
									v-model="school"
									prepend-icon="mdi-castle"
									:counter="40"
									:error-messages="errors"
									label="*School"
									required
									hint="School or Collage name"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="degree" rules="required|min:2">
								<v-text-field
									v-model="degree"
									:error-messages="errors"
									prepend-icon="mdi-school-outline"
									label="*Degree/Cirtificate"
									required
									hint="Educational status degree, deploma, Msc..."
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
											label="Learning From"
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
									label="Still curruntly learning"
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
										label="Finished On"
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
									:loading="loadingEducation"
									:disabled="loadingEducation"
									color="indigo"
									class="mr-4 white--text"
									small
									@click="submit"
								>
									<span v-show="!loadingEducation">Submit</span>
									<v-icon class="px-4" dark v-show="loadingEducation">mdi-cloud-upload</v-icon>
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
import { Component, Vue, Watch, Ref } from "vue-property-decorator";

@Component({})
export default class Signup extends Vue {
	school = "";
	degree = "";
	from = "";
	to = "";
	current = false;
	description = "";
	loadingEducation = false;

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
		this.school = "";
		this.degree = "";
		this.from = "";
		this.to = "";
		this.current = false;
		this.description = "";
		(this.$refs.singupObserver as Vue & { reset: () => boolean }).reset();
	}

	submit() {
		this.loadingEducation = true;
		(this.$refs.singupObserver as Vue & {
			validate: () => any;
		})
			.validate()
			.then((isValid: boolean) => {
				if (isValid) {
					const info = {
						school: this.school,
						degree: this.degree,
						from: this.from,
						to: !this.current ? this.to : new Date().toISOString().slice(0, 10),
						current: this.current,
						description: this.description
					};

					this.$store
						.dispatch("profile/addEducationProfile", info)
						.then(res => {
							console.log(res);
							this.loadingEducation = false;
							this.$router.push({ name: "Profile" });
						})
						.catch(err => {
							setTimeout(() => (this.loadingEducation = false), 2000);
							console.log(err);
						});
				} else {
					setTimeout(() => (this.loadingEducation = false), 2000);
				}
			})
			.catch((error: any) => {
				setTimeout(() => (this.loadingEducation = false), 2000);
				console.log(error);
			});
	}
}
</script>

<style lang="stylus" scoped>
</style>