<template>
	<div>
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">Axum HUB Blog</h3>
				<v-menu transition="scroll-y-reverse-transition" class="ml-auto">
					<template v-slot:activator="{ on, attrs }">
						<v-btn text class="ma-2 elevation-0" fab small v-bind="attrs" v-on="on">
							<v-icon>mdi-pencil-plus-outline</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item :to="{ name: '' }" link>
							<v-list-item-title>Create New Blog</v-list-item-title>
						</v-list-item>
						<v-list-item :to="{ name: '' }" link>
							<v-list-item-title>See Your Blogs</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
		</v-row>

		<h1>Blog</h1>
		<p>{{blogs}}</p>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
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
	loading!: boolean;
	loadingUser!: boolean;
	getAllPostedBlogs!: any;
	getUserPostedBlogs!: any;
	getUserPostedBlogsById!: any;
	deleteBlog!: any;

	created() {
		console.log("ok start...");
		this.getAllPostedBlogs();
	}
}
</script>

<style lang="stylus" scoped>

</style>