<template>
	<v-container class="mt-8 blog-container">
		<v-row no-gutters class="my-2 mb-1" justify="center">
			<v-col cols="10" sm="6" md="4" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">Create New Post</h3>
			</v-col>
			<v-col cols="10" sm="6" md="7">
				<div class="ml-auto d-flex align-center justify-end justify-sm-center">
					<v-row align="center">
						<v-col cols="12" sm="12" md="6">
							<p class="mr-5 sm-col-12 text-sm-center">(choose post type!)</p>
						</v-col>
						<v-col cols="12" sm="12" md="6">
							<v-radio-group v-model="postType" :mandatory="true" class="d-flex">
								<v-radio label="Article" value="article"></v-radio>
								<v-radio label="Blog" value="blog"></v-radio>
								<v-radio label="Job" value="job"></v-radio>
							</v-radio-group>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>
		<v-divider class="mb-2"></v-divider>
		<v-row justify="center" class="question_form_container">
			<v-col cols="12" sm="10" md="5">
				<h3 class="form-header text-center">Create New {{postType}}</h3>
				<v-card elevation="0" class="pa-6 rounded-lg">
					<ValidationObserver ref="createQuestionObserver">
						<form id="blog-form" @submit.prevent="submit">
							<ValidationProvider v-slot="{ errors }" name="title" rules="required|min:3|max:30">
								<v-text-field
									name="title"
									v-model="title"
									prepend-icon="mdi-pencil-circle-outline"
									:counter="30"
									:error-messages="errors"
									label="Titel"
									required
									hint="Question title character between 3-30"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="slug" rules="required|min:3|max:30">
								<v-text-field
									name="slug"
									v-model="slug"
									prepend-icon="mdi-tag-text-outline"
									:counter="30"
									:error-messages="errors"
									label="Slug"
									required
									hint="A slug for your post (dont incude space and specil characters)"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="body" rules="required">
								<v-text-field
									name="body"
									v-model="body"
									:error-messages="errors"
									prepend-icon="mdi-subtitles-outline"
									label="Body"
									required
									:count="60"
									hint="Blog Description"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="tags" rules="required">
								<v-text-field
									name="tags"
									v-model="tags"
									:error-messages="errors"
									prepend-icon="mdi-label-multiple-outline"
									label="Tags"
									required
									hint="Question Tags comma separarated eg: test1, test2"
								></v-text-field>
							</ValidationProvider>

							<v-file-input
								name="blogImage"
								show-size
								v-model="blogImage"
								accept="image/*"
								prepend-icon="mdi-image"
								label="Post Image (OPTIONAL)"
								hint="An Image Desciption for your post"
							>
								<template v-slot:selection="{ text }">
									<v-chip small label color="primary">{{ text }}</v-chip>
								</template>
							</v-file-input>

							<v-card-actions class="mt-4">
								<v-btn
									:loading="loading"
									:disabled="loading"
									color="indigo"
									class="mr-4 white--text"
									small
									type="submit"
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
					<v-subheader class="ml-5 my-6">What are the dfferent kinds of post i can create?</v-subheader>
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
import { mapActions } from "vuex";

@Component({
	methods: {
		...mapActions("blog", ["createNewBlog"])
	}
})
export default class UserQuestionsPost extends Vue {
	title = "";
	body = "";
	tags = "";
	slug = "";
	blogImage = "";
	loading = false;
	postType = "blog";

	instructions = [
		{
			title: "Article Post",
			body:
				"article post is a special kind of post which you post is about some topic your aim is to share information or knowledge of some kind you can provide an much description as you want and should be clean, clear and consise summay of your topic in hand."
		},
		{
			title: "Blog Post",
			body:
				"Post any thing you want having limited description you can post things like inspirations, motivations, Ads..."
		},
		{
			title: "Job Post",
			body:
				"Job Post is another kind of post which will help you find/recrute by posting a job..."
		}
	];

	clear() {
		this.title = "";
		this.body = "";
		this.slug = "";
		this.tags = "";
		this.blogImage = "";
		this.postType = "blog";
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
						body: this.body,
						slug: this.slug,
						tags: this.tags,
						postType: this.postType,
						blogImage: this.blogImage
					};
					const form = document.getElementById("blog-form") as HTMLFormElement;
					const formData = new FormData(form);
					formData.append("postType", this.postType);
					this.$store
						.dispatch("blog/createNewBlog", formData)
						.then(res => {
							console.log("res", res);
							this.loading = false;
							this.$router.push({ name: "Blogs" });
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
.blog-container
  overflow-x hidden
.v-text-field
  font-family Montserrat
.question_form_container
	min-height 100vh !important
</style>