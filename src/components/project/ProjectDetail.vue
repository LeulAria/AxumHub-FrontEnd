<template>
	<v-container>
		<v-row>
			<v-col cols="12" class="d-flex mt-5">
				<div>
					<h3>{{project.title}}</h3>
					<small>{{project.description}}</small>
				</div>
				<div class="ml-auto">
					<vs-tooltip>
						<v-btn icon>
							<i class="bx bx-user-plus icon-size-md"></i>
						</v-btn>
						<template #tooltip>add new user to project</template>
					</vs-tooltip>
				</div>
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row>
			<v-col>
				<v-card outlined class="rounded-lg">
					<v-card-title>
						Members
						<v-spacer></v-spacer>
						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
						></v-text-field>
					</v-card-title>
					<v-data-table
						v-model="selected"
						:headers="headers"
						:items="contributers"
						sort-by="name"
						:search="search"
						item-key="name"
						show-select
					></v-data-table>
				</v-card>
			</v-col>
			<v-col></v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters("project", ["project", "contributers", "loadingProject"])
	},
	methods: {
		...mapActions("project", ["getSingleProject"])
	}
})
export default class ProjectDetail extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	project!: any;
	getSingleProject!: Function;
	loadingProject!: boolean;
	loadingproj!: any;
	contributers!: any;

	search = "";
	selected = [];
	headers = [
		{
			text: "ID",
			align: "start",
			value: "_id"
		},
		{ text: "Name", value: "name" },
		{ text: "Group", value: "group", default: this.project.title }
	];

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