<template>
	<v-main class="my-0 pa-0 chat">
		<v-row justify="center" no-gutters class="chat-container">
			<v-col cols="4" v-if="$vuetify.breakpoint.smAndUp" class="chat-sizebar-container">
				<v-card max-width="420" class="mx-6 chat-sizebar" flat outlined>
					<v-toolbar class="chat-app-bar">
						<v-app-bar-nav-icon @click="toggleChatList()"></v-app-bar-nav-icon>
						<h5 class="grey--text" v-if="chatgruplist">Available Groups</h5>
						<h5 class="grey--text" v-if="!chatgruplist">{{id}} project Group</h5>
						<v-spacer></v-spacer>
					</v-toolbar>

					<v-list three-line class="chat-lists" v-if="chatgruplist">
						<template v-for="(project, i) in filteredJoinedProjects">
							<v-subheader v-if="i==0" :key="i">Groups</v-subheader>
							<v-divider :key="i==0" inset></v-divider>
							<div :key="i">
								<v-list-item :key="i" ripple @click="openChat(project.title)" link>
									<v-list-item-avatar>
										<v-img
											src="https://png.pngtree.com/png-vector/20191028/ourlarge/pngtree-men-avatar-icon-for-your-design-websites-and-projects-png-image_1888521.jpg"
										></v-img>
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title>{{project&&project.title}}</v-list-item-title>
										<v-list-item-subtitle>{{project&&project.summary.split(' ').slice(0,7).join(' ')}}</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
								<v-divider></v-divider>
							</div>
						</template>
					</v-list>

					<v-list three-line class="chat-lists" v-if="!chatgruplist">
						<template v-for="(member, i) in members">
							<v-subheader v-if="i==0" :key="i">Group Members</v-subheader>
							<div :key="i">
								<v-list-item ripple>
									<v-list-item-avatar>
										<v-img
											src="http://www.chicagohrs.com/wp-content/uploads/2017/05/Man-Placeholder-300x300.png"
										></v-img>
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title>{{member.name}}</v-list-item-title>
										<v-list-item-subtitle>{{member.isOnline?'Online....' : 'Offline...' }}</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
								<v-divider inset></v-divider>
							</div>
						</template>
					</v-list>
					<v-btn fab class="elevation-0 mb-10 ml-1" :to="{ name: 'Conference' }" link>
						<v-icon>mdi-message-video</v-icon>
					</v-btn>
				</v-card>
			</v-col>
			<v-col cols="12" xs="12" sm="8">
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
		...mapGetters("project", ["joinedProjects"])
	},
	methods: {
		...mapActions("chat", ["getProjectByChatName", "setRoomId"])
	}
})
export default class Chat extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	chatgruplist = false;
	joinedProjects!: [any];
	searchGroups = "";
	loadingchat!: any;

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

	set filteredJoinedProjects(val: any) {
		this.joinedProjects = val;
	}
	get filteredJoinedProjects() {
		const jp = this.joinedProjects.filter((project: any) => {
			return project.title.toLowerCase().match(this.searchGroups);
		});
		return jp;
	}

	openChat(id: string) {
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
	height 100vh
	overflow hidden
	padding 0 !important
	margin 0 !important
.chat-container
	padding 0
.chat-sizebar-container, .chat-sizebar
	height 100vh
	width 100%
	margin 0 !important
.chat-lists, .chat-bar
	height 80vh !important
	min-height 80vh !important
	max-height 80vh !important
	overflow-x hidden !important
	overflow-y scroll !important
	cursor pointer
.chat-app-bar
	box-shadow none !important
.chat-bar
	width 100%
	min-height 90vh !important
	max-height 90vh !important
.chat-message-input
	position fixed
	bottom 4vh
	border 1px solid #999
.chat-input
	width 70% !important

</style>