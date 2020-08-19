<template>
	<v-container>
		<v-row>
			<v-col cols="12" class="d-flex mt-5">
				<div>
					<h3>{{project && project.title}}</h3>
					<small>{{project && project.summary}}</small>
					<br />
					<small>{{project && project.licence}}</small>
					<br />
					<small>{{project && project.version}}</small>
					<br />
					<small>{{project && project.developmentmodel}}</small>
					<br />
					<small>{{project && project.website}}</small>
					<br />
					<small>{{project && project.githubrepolink}}</small>
					<br />
					<small>{{project && project.chatgroupname}}</small>
					<br />
					<small>{{project && project.author}}</small>
					<br />
					<small>{{project && project.contributers}}</small>
					<br />
					<small>{{project && project.chatgroupname}}</small>
					<br />
					<br />
					<small>{{project}}</small>
				</div>
				<div class="ml-auto d-flex">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn icon link :to="{ name: 'TaskList' }" class="mr-5" v-bind="attrs" v-on="on">
								<i class="bx bx-list-check icon-size-md"></i>
							</v-btn>
						</template>
						<span>See Project Task</span>
					</v-tooltip>

					<v-row justify="center">
						<v-dialog v-model="dialog" scrollable max-width="600px">
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon class="mr-5" v-bind="attrs" v-on="on">
									<i class="bx bx-user-plus icon-size-md"></i>
								</v-btn>
							</template>
							<v-card class="pa-5">
								<p>Send invitation using email adress type in the input the email.</p>
								<v-text-field class="mx-4" v-model="email" placeholder="Email..."></v-text-field>
								<p class="mt-5">Or Send email invitation to</p>
								<v-divider></v-divider>
								<v-card-text style="height: 400px;">
									<v-checkbox-group v-model="dialogm1" column>
										<v-checkbox label="Bahamas, The" value="bahamas"></v-checkbox>
										<v-checkbox label="Bahrain" value="bahrain"></v-checkbox>
										<v-checkbox label="Bangladesh" value="bangladesh"></v-checkbox>
										<v-checkbox label="Barbados" value="barbados"></v-checkbox>
										<v-checkbox label="Belarus" value="belarus"></v-checkbox>
										<v-checkbox label="Belgium" value="belgium"></v-checkbox>
										<v-checkbox label="Belize" value="belize"></v-checkbox>
										<v-checkbox label="Benin" value="benin"></v-checkbox>
										<v-checkbox label="Burundi" value="burundi"></v-checkbox>
									</v-checkbox-group>
								</v-card-text>
								<v-divider></v-divider>
								<v-card-actions>
									<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
									<v-btn color="blue darken-1" text @click="sendEmail()">Send</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-row>
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
		...mapGetters("user", ["userInfo"]),
		...mapGetters("project", ["project", "contributers", "loadingProject"])
	},
	methods: {
		...mapActions("project", ["getSingleProject", "sendInvitationEmail"])
	}
})
export default class ProjectDetail extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	userInfo!: any;
	project!: any;
	getSingleProject!: Function;
	sendInvitationEmail!: Function;
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
		this.getSingleProject(this.id);
	}

	sendEmail() {
		console.log("send this: ", {
			projectname: this.project.name,
			destination: this.email,
			sender: this.userInfo
		});
		alert("send invitation email..." + this.email);
		this.sendInvitationEmail({
			projectname: this.project.name,
			destination: this.email,
			sender: this.userInfo.email
		});
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