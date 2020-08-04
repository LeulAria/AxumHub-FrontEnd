<template>
	<v-container>
		<h1>Project detail for {{id}}</h1>
		<p>{{project}}</p>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters("project", ["project", "loadingProject"])
	},
	methods: {
		...mapActions("project", ["getSingleProject"])
	}
})
export default class ProjectDetail extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	getSingleProject!: Function;
	loadingProject!: boolean;
	loadingproj!: any;

	created() {
		this.loadingproj = this.$vs.loading({
			type: "circles",
			color: "#FF6",
			background: "#000",
			opacity: 0.8,
			scale: 1.3,
			text: "Loading Project Details..."
		});
		this.getSingleProject(this.id);
	}

	@Watch("loadingProject")
	onLoadingProject(newVal: boolean, oldVal: boolean) {
		if (!newVal) {
			this.loadingproj.close();
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>