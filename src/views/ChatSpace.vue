<template>
	<v-main class="my-4">
		<v-row justify="center">
			<v-col cols="5">
				<v-card max-width="420" class="mx-6" flat outlined>
					<v-toolbar class="chat-app-bar">
						<v-app-bar-nav-icon></v-app-bar-nav-icon>
						<v-toolbar-title>AxumHUB project Group</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon>
							<v-icon>mdi-magnify</v-icon>
						</v-btn>
					</v-toolbar>

					<v-list three-line class="chat-lists">
						<template v-for="(item, index) in items">
							<v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

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
				</v-card>
			</v-col>
			<v-col cols="6">
				<chat-board></chat-board>
			</v-col>
		</v-row>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChatBoard from "@/components/chat/ChatBoard.vue";

@Component({
	components: {
		"chat-board": ChatBoard
	}
})
export default class ChatSpace extends Vue {
	txt = "ok msg goes here";

	items = [
		{ header: "Today" },
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
		},
		{ divider: true, inset: true },
		{
			avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
			title: "Oui oui",
			subtitle:
				"<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
		},
		{ divider: true, inset: true },
		{
			avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
			title: "Birthday gift",
			subtitle:
				"<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
		},
		{ divider: true, inset: true },
		{
			avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
			title: "Recipe to try",
			subtitle:
				"<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
		},
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
		},
		{ divider: true, inset: true },
		{
			avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
			title: "Oui oui",
			subtitle:
				"<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
		},
		{ divider: true, inset: true },
		{
			avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
			title: "Birthday gift",
			subtitle:
				"<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
		},
		{ divider: true, inset: true },
		{
			avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
			title: "Recipe to try",
			subtitle:
				"<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
		}
	];
}
</script>

<style lang="stylus" scoped>
.chat-lists, .chat-bar {
	height: 80vh !important;
	min-height: 80vh !important;
	max-height: 80vh !important;
	overflow-x: hidden !important;
	overflow-y: scroll !important;
	cursor: pointer;
}

.chat-app-bar {
	box-shadow: none !important;
	// box-shadow 0px 1px 10px rgba(0,0,0,0.1) !important
}

.chat-bar {
	width: 100%;
	min-height: 90vh !important;
	max-height: 90vh !important;
}

.chat-message-input {
	position: fixed;
	bottom: 4vh;
	border: 1px solid #999;
}

.chat-input {
	width: 70% !important;
}
</style>