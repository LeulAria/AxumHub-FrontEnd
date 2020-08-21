<template>
	<v-container class="mt-8">
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">{{$t("message.qna")}}</h3>
			</v-col>
		</v-row>
		<v-divider class="mb-2"></v-divider>
		<v-row justify="center" class="question_form_container">
			<v-col cols="12" sm="10" md="5">
				<h1 class="form-header text-center">{{$t("message.askYourQuestion")}}?</h1>
				<v-card elevation="0" class="pa-6 rounded-lg">
					<ValidationObserver ref="createQuestionObserver">
						<form>
							<ValidationProvider v-slot="{ errors }" name="title" rules="required|min:3|max:30">
								<v-text-field
									v-model="title"
									prepend-icon="mdi-pencil-circle-outline"
									:counter="30"
									:error-messages="errors"
									label="Titel"
									required
									hint="Question title character between 3-30"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="description" rules="required">
								<v-text-field
									v-model="description"
									:error-messages="errors"
									prepend-icon="mdi-subtitles-outline"
									label="Description"
									required
									hint="Question descirption"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="tags" rules="required">
								<v-text-field
									v-model="tags"
									:error-messages="errors"
									prepend-icon="mdi-label-multiple-outline"
									label="Tags"
									required
									hint="Question Tags comma separarated eg: test1, test2"
								></v-text-field>
							</ValidationProvider>

							<v-card-actions class="mt-4">
								<v-btn
									:loading="loading"
									:disabled="loading"
									color="indigo"
									class="mr-4 white--text"
									small
									@click="submit"
								>
									<span v-show="!loading">Submit</span>
									<v-icon class="px-4" dark v-show="loading">mdi-cloud-upload</v-icon>
								</v-btn>
								<v-btn depressed small @click="clear">clear</v-btn>
							</v-card-actions>
						</form>
					</ValidationObserver>
				</v-card>
			</v-col>
			<v-col cols="12" sm="10" md="5">
				<v-expansion-panels popout>
					<v-subheader class="ml-5 my-6">{{$t("message.qclear")}}</v-subheader>
					<v-expansion-panel v-for="(instruction,i) in instructions" :key="i">
						<v-expansion-panel-header>{{instruction.title}}</v-expansion-panel-header>
						<v-expansion-panel-content>{{instruction.body}}</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class UserQuestionsPost extends Vue {
	title = "";
	description = "";
	tags = "";
	loading = false;

	instructions = [
		{
			title: "summerize the problem.",
			body:
				"Try to include detail explanation in the detail field, describe expected results..."
		},
		{
			title: "Describe why?",
			body:
				"Try to include description why your asking this qustion and use cliean gramatic order in describing your questions"
		},
		{
			title: "show or give some examples.",
			body:
				"Try to give example or scenario of the problem that you want to ask"
		}
	];

	clear() {
		this.title = "";
		this.description = "";
		this.tags = "";
		(this.$refs.createQuestionObserver as Vue & {
			reset: () => boolean;
		}).reset();
	}

	submit() {
		this.loading = true;
		(this.$refs.createQuestionObserver as Vue & {
			validate: () => any;
		})
			.validate()
			.then((isValid: boolean) => {
				if (isValid) {
					const info: any = {
						title: this.title,
						description: this.description,
						tags: this.tags
					};
					console.log("ok the input is valid now lets dispatch it", info);
					this.$store
						.dispatch("qa/createQuestionPost", info)
						.then(res => {
							console.log(res);
							this.loading = false;
							this.$router.push({ name: "QA" });
						})
						.catch(err => {
							setTimeout(() => (this.loading = false), 2000);
							console.log(err);
						});
				} else {
					setTimeout(() => (this.loading = false), 2000);
				}
			})
			.catch((error: any) => {
				setTimeout(() => (this.loading = false), 2000);
				console.log(error);
			});
	}
}
</script>

<style lang="stylus" scoped>
.v-text-field
  font-family Montserrat
.question_form_container
	min-height 100vh !important
</style>