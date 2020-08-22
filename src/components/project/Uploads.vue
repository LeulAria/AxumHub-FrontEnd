<template>
	<v-card class="mx-auto my-10" max-width="600">
		<v-card dark flat>
			<v-btn absolute bottom color="indigo" right fab @click="dialog = !dialog">
				<v-icon>mdi-cloud-upload-outline</v-icon>
			</v-btn>

			<v-dialog v-model="dialog" max-width="290">
				<v-card>
					<v-card-title class="headline">{{$t("message.uploadfiletogroup")}}</v-card-title>

					<v-card-text>
						<form id="upload">
							<v-file-input multiple name="file" label="File input"></v-file-input>
						</form>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn color="green darken-1" text @click="dialog = false">{{$t("message.cancel")}}</v-btn>

						<v-btn color="green darken-1" text @click="uploadFile()">{{$t("message.upload")}}</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-dialog v-model="loadingFileUpload" hide-overlay persistent width="300">
				<v-card color="primary" dark class="pt-2">
					<v-card-text>
						{{$t("message.pleasestandby")}}
						<v-progress-linear indeterminate color="white" class="mb-0 mt-2"></v-progress-linear>
					</v-card-text>
				</v-card>
			</v-dialog>

			<v-img
				src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
				gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
				class="image-container"
			>
				<v-container class="fill-height">
					<v-row align="center">
						<v-toolbar-title class="ml-4">{{project && project.title}}</v-toolbar-title>
						<br />
						<h1 class="display-4 thin font-weight-thin mr-6 ml-2">{{$t("message.uploads")}}</h1>
					</v-row>
				</v-container>
				<v-btn class="refresh-btn" icon fab small @click="refreshProjectUploads()">
					<v-icon>mdi-refresh</v-icon>
				</v-btn>
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
								<div class="ml-auto">
									<v-btn icon @click="downloadUploadedFile(upload._id)">
										<v-icon>mdi-cloud-download-outline</v-icon>
									</v-btn>
									<v-btn icon v-if="upload.userid==userInfo.id" @click="deleteFileUpload(upload._id)">
										<v-icon>mdi-delete-sweep-outline</v-icon>
									</v-btn>
								</div>
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
		...mapGetters("users", ["userInfo"]),
		...mapGetters("project", ["project", "contributers", "loadingProject"])
	},
	methods: {
		...mapActions("project", [
			"getSingleProject",
			"sendInvitationEmail",
			"uploadFileProject",
			"deleteFileProject"
		])
	}
})
export default class Uploads extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	userInfo!: any;
	project!: any;
	getSingleProject!: Function;
	uploadFileProject!: Function;
	deleteFileProject!: Function;
	loadingProject!: boolean;
	contributers!: any;
	email!: string;

	dialogm1 = "";
	dialog = false;
	upload = false;
	file!: any;
	loadingFileUpload = false;

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
	}

	refreshProjectUploads() {
		this.getSingleProject(this.id);
		this.$vs.notification({
			icon: "<i class='bx bx-refresh'></i>",
			color: "primary",
			position: "bottom-right",
			title: "Refresh Data",
			text: `fetching requried datas...`
		});
	}

	downloadUploadedFile(id: string) {
		alert("upload now..." + id);
		console.log(this.project.uploads);
		const uploadFile = this.project.uploads.filter(
			(upload: any) => upload._id == id
		)[0];
		const fileLink = document.createElement("a");

		fileLink.href = uploadFile.fileuir;
		const uploadFileName = uploadFile.fileuir.split("/")[
			uploadFile.fileuir.split("/").length - 1
		];

		console.log(uploadFile.fileuir);
		fileLink.setAttribute("download", uploadFileName);
		document.body.appendChild(fileLink);

		fileLink.click();
	}

	uploadFile() {
		this.dialog = false;
		this.loadingFileUpload = true;
		const form = document.getElementById("upload") as HTMLFormElement;
		const formData = new FormData(form);
		this.uploadFileProject({ id: this.id, data: formData });
		this.getSingleProject(this.id);
		setTimeout(() => (this.loadingFileUpload = false), 1300);
		this.refreshProjectUploads();
	}

	deleteFileUpload(id: string) {
		this.loadingFileUpload = true;
		setTimeout(() => (this.loadingFileUpload = false), 1300);
		this.getSingleProject(this.id);
		this.deleteFileProject({ id: this.id, uploadId: id });
	}
}
</script>

<style lang="stylus" scoped>
.image-container
	position relative
.refresh-btn
	position absolute
	bottom 10px
	left 10px
</style>