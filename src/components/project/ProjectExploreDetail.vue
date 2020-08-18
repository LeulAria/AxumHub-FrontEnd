<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" xs="10" sm="8" md="6" class="d-flex mt-5">
				<v-card outlined class="rounded-lg pa-5">
					<div>
						<h2>{{project && project.title}}</h2>
						<small>{{project}}</small>
					</div>
				</v-card>
			</v-col>
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
	email!: string;

	dialogm1 = "";
	dialog = false;

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

	sendEmail() {
		alert("send email...");
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
getColor(vsColor, alpha = 1)
	unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
getVar(var)
	unquote("var(--vs-"+var+")")
.not-margin
	margin 0px
	font-weight normal
	padding 10px
.con-form
	width 100%
	.flex
		display flex
		align-items center
		justify-content space-between
		a
			font-size .8rem
			opacity .7
			&:hover
				opacity 1
	.vs-checkbox-label
		font-size .8rem
	.vs-input-content
		margin 10px 0px
		width calc(100%)
		.vs-input
			width 100%
.footer-dialog
	display flex
	align-items center
	justify-content center
	flex-direction column
	width calc(100%)
	.new
		margin 0px
		margin-top 20px
		padding: 0px
		font-size .7rem
		a
			color getColor('primary') !important
			margin-left 6px
			&:hover
				text-decoration underline
	.vs-button
		margin 0px
</style>