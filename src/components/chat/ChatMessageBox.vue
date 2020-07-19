<template>
	<div
		:class="{ 'chat__conversation-board__message-container': true, 'reversed': reversed, 'msg_sideTweak': true }"
	>
		<div class="chat__conversation-board__message__person">
			<div class="chat__conversation-board__message__person__avatar">
				<img src="https://randomuser.me/api/portraits/men/9.jpg" alt="Dennis Mikle" />
			</div>
			<span class="chat__conversation-board__message__person__nickname">Dennis Mikle</span>
		</div>
		<div class="chat__conversation-board__message__context">
			<div class="chat__conversation-board__message__bubble">
				<span>
					<slot></slot>
					<small :class="{'chat_time': true, 'reverse_chat_time': reversed}">8:28 pm</small>
				</span>
			</div>
		</div>
		<div class="chat__conversation-board__message__options">
			<button
				class="btn-icon chat__conversation-board__message__option-button option-item emoji-button"
			>
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
			<button
				class="btn-icon chat__conversation-board__message__option-button option-item more-button"
			>
				<svg
					class="feather feather-more-horizontal sc-dnqmqq jxshSx"
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
					<circle cx="12" cy="12" r="1" />
					<circle cx="19" cy="12" r="1" />
					<circle cx="5" cy="12" r="1" />
				</svg>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ChatMessageBox extends Vue {
	@Prop({ default: true })
	reversed!: boolean;
}
</script>

<style lang="stylus" scoped>
.--dark-theme {
	--chat-background: rgba(10, 14, 14, 0.95);
	--chat-panel-background: #131719;
	--chat-bubble-background: #14181a;
	--chat-bubble-active-background: #171a1b;
	--chat-add-button-background: #212324;
	--chat-send-button-background: #8147fc;
	--chat-text-color: #a3a3a3;
	--chat-options-svg: #a3a3a3;
}

#chat {
	.chat__conversation-board {
		padding: 1em 0 2em;
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
		position: relative;

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
			position: relative;
			z-index: 10;

			.chat_time {
				display: block;
			}

			.reverse_chat_time {
				display: block;
			}
		}

		&:not(:last-child) {
			margin: 0 0 0.3em;
		}

		&:active {
			background: var(--chat-bubble-active-background);
		}
	}
}

@media only screen and (max-width: 600px) {
	#chat {
		margin: 0;
		border-radius: 0;

		.chat__conversation-board__message__options {
			display: none !important;
		}
	}
}
</style>