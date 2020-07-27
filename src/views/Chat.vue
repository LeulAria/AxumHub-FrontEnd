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
						<template v-for="(item, index) in items">
							<v-subheader v-if="index==0" :key="index">Groups</v-subheader>

							<v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

							<v-list-item v-else :key="item.title" ripple>
								<v-list-item-avatar>
									<v-img :src="item.avatar"></v-img>
								</v-list-item-avatar>

								<v-list-item-content>
									<v-list-item-title v-html="item.title"></v-list-item-title>
									<v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</template>
					</v-list>

					<v-list three-line class="chat-lists" v-if="!chatgruplist">
						<template v-for="(item, index) in items">
							<v-subheader v-if="item.header" :key="index" v-text="item.header"></v-subheader>

							<v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

							<v-list-item v-else :key="item.title" ripple>
								<v-list-item-avatar>
									<v-img :src="item.avatar"></v-img>
								</v-list-item-avatar>

								<v-list-item-content>
									<v-list-item-title v-html="item.title"></v-list-item-title>
									<v-list-item-subtitle>Offline...</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</template>
					</v-list>
				</v-card>
			</v-col>
			<v-col cols="12" xs="12" sm="8">
				<chat-board></chat-board>
			</v-col>
		</v-row>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ChatBoard from "@/components/chat/ChatBoard.vue";

@Component({
	components: {
		"chat-board": ChatBoard
	}
})
export default class ChatSpace extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	chatgruplist = false;
	txt = "ok msg goes here";

	toggleChatList() {
		this.chatgruplist = !this.chatgruplist;
	}

	items = [
		{ header: "Group Members" },
		{
			avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
			title: "Brunch this weekend?",
			subtitle:
				"<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
		},
		{ divider: true, inset: true },
		{
			avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
			title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
			subtitle:
				"<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
		}
	];
}
</script>

<style lang="stylus" scoped>
.chat
	width 100vw
	height 100vh
	overflow height
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