<template>
	<v-card flat class="blog-container">
		<v-toolbar color="purple" dark flat prominent>
			<v-btn icon class="create-new" v-if="!(tabs==2||tabs==3)" :to="{ name: 'NewBlog' }" link>
				<i class="bx bxs-message-square-add add-icon"></i>
			</v-btn>
			<v-row>
				<v-col cols="12" xs="12" sm="7" md="8">
					<v-text-field
						append-icon="mic"
						class="mx-4 mt-3"
						flat
						:name="Math.random()"
						hide-details
						label="Search here..."
						prepend-inner-icon="search"
						solo-inverted
					></v-text-field>
				</v-col>

				<v-col cols="12" xs="12" sm="5" md="4">
					<v-card-title class="text-center justify-center py-6">
						<h3 class="font-weight-bold basil--text">AxumHUB Blogs</h3>
					</v-card-title>
				</v-col>
			</v-row>

			<template v-slot:extension>
				<v-tabs v-model="tabs" centered>
					<v-tab v-for="(tab,i) in tabItems" :key="i">{{ tab }}</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>

		<v-tabs-items v-model="tabs">
			<v-tab-item></v-tab-item>
			<v-tab-item>
				<v-container fluid class="px-xs-4 px-sm-8 px-md-15">
					<v-row>
						<v-col
							cols="12"
							xs="12"
							sm="6"
							md="4"
							v-for="blog in blogs"
							:key="blog._id"
							transition="slide-y-reverse-transition"
						>
							<v-card outlined class="mx-auto my-2 rounded-lg" min-height="350" max-height="350">
								<v-img min-height="200" max-heigh="200" :src="`${mediaURI}${blog.blogimage}`"></v-img>

								<v-card-title>{{blog.title | snnipit(3) }}</v-card-title>

								<v-card-text>
									<v-row align="center" class="mx-0">
										<v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

										<div class="grey--text ml-4">4.5 (413)</div>
									</v-row>
									<div>{{blog.body | snnipit(6)}}</div>
								</v-card-text>
								<v-card-actions class="action-btn">
									<v-btn color="deep-purple lighten-2" text>See Article</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</v-tab-item>
			<v-tab-item>
				<v-card flat>
					<v-card-title class="headline">An awesome title</v-card-title>
					<v-card-text>
						<p>Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.</p>

						<p>Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.</p>
						<p
							class="mb-0"
						>Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra convallis urna.</p>
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card flat class="elevation-0">
					<v-card-title class="headline">An even better title</v-card-title>
					<v-card-text>
						<p>Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverr.</p>
						<p
							class="mb-0"
						>Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.</p>
					</v-card-text>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters(["mediaURI"]),
		...mapGetters("blog", ["blogs", "userBlogs", "loading", "loadingUser"])
	},
	methods: {
		...mapActions("blog", [
			"getAllPostedBlogs",
			"getUserPostedBlogs",
			"getUserPostedBlogsById",
			"deleteBlog"
		])
	}
})
export default class Blog extends Vue {
	blogs!: any;
	userBlogs!: any;
	mediaURI!: string;
	loading!: boolean;
	loadingblog!: any;
	loadingUser!: boolean;
	getAllPostedBlogs!: any;
	getUserPostedBlogs!: any;
	getUserPostedBlogsById!: any;
	deleteBlog!: any;

	tabItems = ["Articles", "Blog Posts", "News Feeds", "Job Posts"];

	tabs = null;
	text =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

	created() {
		console.log("ok start...");
		this.getAllPostedBlogs();
		this.loadingblog = this.$vs.loading({
			type: "circles",
			color: "#FF6",
			background: "#000",
			opacity: 0.8,
			scale: 1.3,
			text: "Loading blogs..."
		});
	}

	@Watch("loading")
	onLoading(newVal: boolean, oldVal: boolean) {
		// FIXME: remove on prod
		if (!newVal) {
			setTimeout(() => this.loadingblog.close(), 1000);
		}
	}
}
</script>

<style lang="stylus" scoped>
.blog-container
	position relative
.create-new
	position absolute
	top 10px
	right 10px
.add-icon
	font-size 2em
.card-tags, .action-btn
	margin-top -25px
</style>