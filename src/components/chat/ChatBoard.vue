<template>
	<div class="--dark-theme" id="chat">
		<div class="chat__conversation-board" ref="chatBoardContainer">
			<template v-for="(chatMsg, i) in chatMessages">
				<chat-message-box :key="i" :reversed="chatMsg.reversed">{{chatMsg.txt}}</chat-message-box>
			</template>
		</div>
		<div class="chat__conversation-panel">
			<div class="chat__conversation-panel__container">
				<button class="chat__conversation-panel__button panel-item btn-icon add-file-button">
					<svg
						class="feather feather-plus sc-dnqmqq jxshSx"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<line x1="12" y1="5" x2="12" y2="19" />
						<line x1="5" y1="12" x2="19" y2="12" />
					</svg>
				</button>
				<button class="chat__conversation-panel__button panel-item btn-icon emoji-button">
					<svg
						class="feather feather-smile sc-dnqmqq jxshSx"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M8 14s1.5 2 4 2 4-2 4-2" />
						<line x1="9" y1="9" x2="9.01" y2="9" />
						<line x1="15" y1="9" x2="15.01" y2="9" />
					</svg>
				</button>
				<input
					class="chat__conversation-panel__input panel-item"
					placeholder="Type a message..."
					v-model="userChatMessage"
					@keydown.enter="sendMessage()"
				/>
				<button
					class="chat__conversation-panel__button panel-item btn-icon send-message-button"
					@click="sendMessage()"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						data-reactid="1036"
					>
						<line x1="22" y1="2" x2="11" y2="13" />
						<polygon points="22 2 15 22 11 13 2 9 22 2" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChatMessageBox from "@/components/chat/ChatMessageBox.vue";
import { Socket } from "vue-socket.io-extended";

@Component({
	components: {
		"chat-message-box": ChatMessageBox
	}
})
export default class ChatBoard extends Vue {
	userChatMsg!: string;

	chatMessages = [
		{ txt: "this is my text!", reversed: false },
		{ txt: "this is my text two!", reversed: true },
		{ txt: "this is my text three!", reversed: false },
		{ txt: "this is my text four!", reversed: true }
	];

	@Socket()
	connect() {
		console.log("connection established...");
		this.chatMessages.push({
			txt: "connection established...",
			reversed: false
		});
	}

	@Socket("test")
	onTest(msg: string) {
		this.chatMessages.push({ txt: msg, reversed: true });

		this.$nextTick(() => {
			const chatMsgBoard = this.$refs.chatBoardContainer as HTMLDivElement;
			chatMsgBoard.scrollTop = chatMsgBoard.scrollHeight + 10;
			console.log("the scroll top: ", chatMsgBoard.scrollTop);
			console.log("the scroll height: ", chatMsgBoard.scrollHeight);
		});
	}

	@Socket("disconnected")
	onDisconnect(msg: string) {
		this.chatMessages.push({ txt: msg, reversed: false });
	}

	userEmit(msg: string) {
		// this.$socket.client.emit('userEvent', msg);
		this.$store.dispatch("emitEvent", "from user to server.................");
	}

	get userChatMessage() {
		return this.userChatMsg;
	}
	set userChatMessage(val) {
		this.userChatMsg = val;
	}

	sendMessage() {
		this.$socket.client.emit("sendChat", this.userChatMsg);
		this.$store.dispatch("chat/chatEvent");
	}
}
</script>

<style lang="stylus" scoped>
.--dark-theme {
	// --chat-background: rgba(10, 14, 14, 0.95);
	--chat-panel-background: #131719;
	--chat-bubble-background: #14181a;
	--chat-bubble-active-background: #171a1b;
	--chat-add-button-background: #212324;
	--chat-send-button-background: #8147fc;
	--chat-text-color: #a3a3a3;
	--chat-options-svg: #a3a3a3;
}

body {
	background: url('https://images.unsplash.com/photo-1495808985667-ba4ce2ef31b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'); // images.unsplash.com/photo-1495808985667-ba4ce2ef31b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)
	background-size: cover;
}

#chat {
	background: var(--chat-background);
	max-width: 600px;
	margin: 25px auto;
	box-sizing: border-box;
	padding: 1em;
	border-radius: 12px;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url('https://images.unsplash.com/photo-1495808985667-ba4ce2ef31b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80') fixed; // images.unsplash.com/photo-1495808985667-ba4ce2ef31b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) fixed
		z-index: -1;
	}

	.btn-icon {
		position: relative;
		cursor: pointer;

		svg {
			stroke: #FFF;
			fill: #FFF;
			width: 50%;
			height: auto;
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
		}
	}

	.chat__conversation-board {
		padding: 1em 1em 0 1em;
		height: calc(100vh - 55px - 2em - 25px * 2 - 0.5em - 3em);
		overflow: auto;
	}

	.chat__conversation-board__message-container {
		position: relative;
		display: -webkit-box;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;

		&.reversed {
			-webkit-box-orient: horizontal;
			-webkit-box-direction: reverse;
			flex-direction: row-reverse;

			.chat__conversation-board__message__bubble {
				position: relative;

				span {
					&:not(:last-child) {
						margin: 0 0 2em 0;
					}
				}
			}

			.chat__conversation-board__message__person {
				margin: 0 0 0 1.2em;
			}

			.chat__conversation-board__message__options {
				align-self: center;
				position: absolute;
				left: 0;
				display: none;
			}
		}

		&:hover {
			.chat__conversation-board__message__options {
				display: -webkit-box;
				display: flex;
				-webkit-box-align: center;
				align-items: center;
			}

			.option-item {
				&:not(:last-child) {
					margin: 0 0.5em 0 0;
				}
			}
		}

		&:not(:last-child) {
			margin: 0 0 2em 0;
		}
	}

	.chat__conversation-board__message__person {
		text-align: center;
		margin: 0 1.2em 0 0;
	}

	.chat__conversation-board__message__person__avatar {
		height: 35px;
		width: 35px;
		overflow: hidden;
		border-radius: 50%;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		ms-user-select: none;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			height: 100%;
			width: 100%;
		}

		img {
			height: 100%;
			width: auto;
		}
	}

	.chat__conversation-board__message__person__nickname {
		font-size: 9px;
		color: #484848;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		display: none;
	}

	.chat__conversation-board__message__context {
		max-width: 55%;
		align-self: flex-end;
	}

	.chat__conversation-board__message__options {
		align-self: center;
		position: absolute;
		right: 0;
		display: none;

		.option-item {
			border: 0;
			background: 0;
			padding: 0;
			margin: 0;
			height: 16px;
			width: 16px;
			outline: none;
		}

		.emoji-button {
			svg {
				stroke: var(--chat-options-svg);
				fill: transparent;
				width: 100%;
			}
		}

		.more-button {
			svg {
				stroke: var(--chat-options-svg);
				fill: transparent;
				width: 100%;
			}
		}
	}

	.chat__conversation-board__message__bubble {
		span {
			width: -webkit-fit-content;
			width: -moz-fit-content;
			width: fit-content;
			display: inline-table;
			word-wrap: break-word;
			background: var(--chat-bubble-background);
			font-size: 13px;
			color: var(--chat-text-color);
			padding: 0.5em 0.8em;
			line-height: 1.5;
			border-radius: 6px;
		}

		&:not(:last-child) {
			margin: 0 0 0.3em;
		}

		&:active {
			background: var(--chat-bubble-active-background);
		}
	}

	.chat__conversation-panel {
		background: var(--chat-panel-background);
		border-radius: 12px;
		padding: 0 1em;
		height: 55px;
		margin: 0.5em 0 0;

		.add-file-button {
			height: 23px;
			min-width: 23px;
			width: 23px;
			background: var(--chat-add-button-background);
			border-radius: 50%;

			svg {
				width: 70%;
				stroke: #54575c;
			}
		}

		.emoji-button {
			min-width: 23px;
			width: 23px;
			height: 23px;
			background: transparent;
			border-radius: 50%;

			svg {
				width: 100%;
				fill: transparent;
				stroke: #54575c;
			}
		}

		.send-message-button {
			background: var(--chat-send-button-background);
			height: 30px;
			min-width: 30px;
			border-radius: 50%;
			-webkit-transition: 0.3s ease;
			transition: 0.3s ease;

			&:active {
				-webkit-transform: scale(0.97);
				transform: scale(0.77);
			}

			svg {
				margin: 1px -1px;
			}
		}
	}

	.chat__conversation-panel__container {
		display: -webkit-box;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		-webkit-box-align: center;
		align-items: center;
		height: 100%;

		.panel-item {
			&:not(:last-child) {
				margin: 0 1em 0 0;
			}
		}
	}

	.chat__conversation-panel__button {
		background: grey;
		height: 20px;
		width: 30px;
		border: 0;
		padding: 0;
		outline: none;
		cursor: pointer;
	}

	.chat__conversation-panel__input {
		width: 100%;
		height: 100%;
		outline: none;
		position: relative;
		color: var(--chat-text-color);
		font-size: 13px;
		background: transparent;
		border: 0;
		resize: none;
	}
}

@media only screen and (max-width: 600px) {
	#chat {
		margin: 0;
		border-radius: 0;

		.chat__conversation-board {
			height: calc(100vh - 55px - 2em - 0.5em - 3em);
		}

		.chat__conversation-board__message__options {
			display: none !important;
		}
	}
}
</style>