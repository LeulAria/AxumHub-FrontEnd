<template>
	<v-main class="my-0 pa-0 chat">
		<v-row justify="center" no-gutters class="chat-container">
			<v-col cols="0" xs="0" sm="3" v-if="$vuetify.breakpoint.smAndUp" class="chat-sizebar-container">
				<v-card max-width="420" class="mx-6 chat-sizebar" flat outlined>
					<v-toolbar class="chat-app-bar">
						<v-app-bar-nav-icon @click="toggleChatList()"></v-app-bar-nav-icon>
						<h5 class="grey--text" v-if="chatgruplist">{{$t("message.availableGroup")}}</h5>
						<h5 class="grey--text" v-if="!chatgruplist">{{id}} {{$t("message.projectGroup")}}</h5>
						<v-spacer></v-spacer>
					</v-toolbar>

					<div three-line class="chat-lists" v-if="chatgruplist">
						<template v-for="(project, i) in filteredProjects">
							<v-subheader v-if="i==0" :key="i">{{$t("message.groups")}}</v-subheader>
							<div
								:key="project._id"
								ripple
								class="chat-list d-flex align-content-center open-chat"
								@click="openChat(project.chatgroupname)"
							>
								<vs-avatar class="mr-3" circle link size="40">
									<i class="bx bx-group"></i>
								</vs-avatar>
								<p class="chat-list-txt">{{project.title}}</p>
							</div>
						</template>
					</div>

					<div three-line class="chat-lists" v-if="!chatgruplist">
						<template v-for="(member, i) in members">
							<v-subheader v-if="i==0" :key="i">{{$t("message.groupMembers")}}</v-subheader>
							<div :key="member.id" ripple class="chat-list d-flex align-content-center">
								<vs-avatar
									class="mr-3"
									circle
									:badge="member.isOnline"
									:loading="!member.isOnline"
									size="40"
								>
									<i class="bx bx-user"></i>
								</vs-avatar>
								<p class="chat-list-txt">{{member.name}}</p>
							</div>
						</template>
					</div>
					<div class="d-flex align-content-center align-center justify-space-around">
						<v-btn
							v-if="!chatgruplist"
							fab
							small
							class="elevation-0 ml-1"
							:to="{ name: 'Conference' }"
							link
						>
							<i class="bx bxs-video icon-size-md"></i>
						</v-btn>
						<vs-avatar-group max="4" v-if="!chatgruplist">
							<vs-avatar v-for="(member,i) in members" :key="i">
								<img
									src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png"
									alt
								/>
							</vs-avatar>
						</vs-avatar-group>
					</div>
				</v-card>
			</v-col>
			<v-col cols="12" xs="12" sm="9">
				<chat-board></chat-board>
			</v-col>
		</v-row>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ChatBoard from "@/components/chat/ChatBoard.vue";
import { mapGetters, mapActions } from "vuex";

@Component({
	components: {
		"chat-board": ChatBoard
	},
	computed: {
		...mapGetters("chat", [
			"admins",
			"contributers",
			"members",
			"chats",
			"loading"
		]),
		...mapGetters("project", ["projects"])
	},
	methods: {
		...mapActions("chat", ["getProjectByChatName", "setRoomId"])
	}
})
export default class Chat extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	chatgruplist = false;
	searchGroups = "";
	loadingchat!: any;
	projects!: any;

	admins!: [any];
	contributers!: [any];
	members!: [any];
	chats!: [any];
	loading!: boolean;
	getProjectByChatName!: Function;
	setRoomId!: Function;

	created() {
		this.loadingchat = this.$vs.loading({
			type: "circles",
			color: "#FF6",
			background: "#000",
			opacity: 0.8,
			scale: 1.3,
			text: "Loading chats..."
		});

		this.getProjectByChatName(this.id);
		this.setRoomId(this.id);
	}

	toggleChatList() {
		this.chatgruplist = !this.chatgruplist;
	}

	set filteredProjects(val: any) {
		this.projects = val;
	}
	get filteredProjects() {
		const jp = this.projects.filter((project: any) => {
			return project.title.toLowerCase().match(this.searchGroups);
		});
		return jp;
	}

	openChat(id: string) {
		this.getProjectByChatName(id);
		this.setRoomId(id);
		this.$router.push({ name: "Chat", params: { id } });
	}

	@Watch("loading")
	onLoadingChage(newVal: boolean, prevVal: boolean) {
		// FIXME: remove on prod
		if (!(newVal && !this.$socket.connected)) {
			setTimeout(() => this.loadingchat.close(), 1000);
		}
	}
}
</script>

<style lang="stylus" scoped>
.chat
	width 100vw
	height calc(100vh - 40px)
	overflow hidden
	padding 0 !important
	margin 0 !important
.chat-container
	padding 0
.chat-sizebar-container, .chat-sizebar
	height calc(100vh - 40px)
	max-width 100%
	margin 0 !important
.chat-lists, .chat-bar
	height 80% !important
	min-height 80% !important
	max-height 80% !important
	overflow-x hidden !important
	overflow-y scroll !important
	cursor pointer
.chat-app-bar
	box-shadow none !important

.chat-list
	width 100%
	padding 5px 1.3em
	transition all .5s
	height 50px
	&:hover
		transform scale(1.07)
	.chat-list-txt
		font-size .75em
		line-height 40px
.open-chat
	transition all .5s
	&:active
		transform scale(.93)

</style>