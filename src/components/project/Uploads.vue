<template>
	<v-card class="mx-auto my-10" max-width="600">
		<v-card dark flat>
			<v-btn absolute bottom color="indigo" right fab @click="dialog = !dialog">
				<v-icon>mdi-cloud-upload-outline</v-icon>
			</v-btn>

			<v-dialog v-model="dialog" max-width="290">
				<v-card>
					<v-card-title class="headline">Upload file to group</v-card-title>

					<v-card-text>
						<form id="upload">
							<v-file-input multiple name="file" label="File input"></v-file-input>
						</form>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>

						<v-btn color="green darken-1" text @click="uploadFile()">Upload</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-dialog v-model="upload" hide-overlay persistent width="300">
				<v-card color="primary" dark class="pt-2">
					<v-card-text>
						Please stand by
						<v-progress-linear indeterminate color="white" class="mb-0 mt-2"></v-progress-linear>
					</v-card-text>
				</v-card>
			</v-dialog>

			<v-img
				src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
				gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
			>
				<v-container class="fill-height">
					<v-row align="center">
						<v-toolbar-title class="ml-4">axumhub</v-toolbar-title>
						<br />
						<h1 class="display-4 thin font-weight-thin mr-6 ml-2">Uploads</h1>
					</v-row>
				</v-container>
			</v-img>
		</v-card>
		<v-card-text class="py-0">
			<div v-if="!project.uploads">
				<v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
			</div>
			<v-timeline align-top dense>
				<v-timeline-item color="pink" small v-for="(upload,m) in project.uploads" :key="m">
					<v-row>
						<v-col cols="4">
							<div class="d-flex align-center">
								<strong>
									{{new Date(upload.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
									})}}
								</strong>
								<div class="d-flex justify-center align-center flex-column ml-2">
									<v-avatar>
										<v-img :src="upload.userid.avatar"></v-img>
									</v-avatar>
									<strong>{{upload.userid.name}}</strong>
								</div>
							</div>
						</v-col>
						<v-col class="upload-file">
							<v-card outlined hover class="pa-4 d-flex">
								<div>
									<strong>{{upload.filename.substring(13)}}</strong>
									<div
										class="caption"
									>file/{{upload.filename.split('.')[upload.filename.split('.').length-1]}}</div>
								</div>
								<v-btn icon class="ml-auto">
									<v-icon>mdi-cloud-download-outline</v-icon>
								</v-btn>
							</v-card>
						</v-col>
					</v-row>
				</v-timeline-item>
			</v-timeline>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters("user", ["userInfo"]),
		...mapGetters("project", ["project", "contributers", "loadingProject"])
	},
	methods: {
		...mapActions("project", ["getSingleProject", "sendInvitationEmail"])
	}
})
export default class Uploads extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	userInfo!: any;
	project!: any;
	getSingleProject!: Function;
	sendInvitationEmail!: Function;
	loadingProject!: boolean;
	contributers!: any;
	email!: string;

	dialogm1 = "";
	dialog = false;
	upload = false;
	file!: any;

	searchadmin = "";
	searchcontrib = "";
	selectedadmin = [];
	selectedcontrib = [];
	headers = [
		{
			text: "UserName",
			align: "start",
			filterable: true,
			value: "name"
		},
		{ text: "UserType", value: "name" },
		{ text: "Email", value: "email" }
	];

	created() {
		this.getSingleProject(this.id);
		// console.log(any)
	}

	uploadFile() {
		alert("now upload!");
	}
}
</script>

<style lang="stylus" scoped>

</style>