<template>
	<v-container>
		<v-row no-gutters class="my-2">
			<v-col cols="10" sm="10" class="mx-5 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">{{$t("message.qna")}}</h3>
			</v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row justify="center">
			<v-col cols="12" xs="12" sm="10" md="8">
				<v-card outlined class="mx-auto my-12 pa-2" max-width="600">
					<div class="d-flex">
						<v-card-title class="font-weight-black h5">{{question.title}}</v-card-title>
					</div>
					<v-card-text>
						<div>{{question.description}}</div>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-text>
						<v-card-subtitle>Tags</v-card-subtitle>
						<v-chip-group active-class="deep-purple accent-4 white--text" column>
							<template v-for="(tag, i) in question.tags">
								<v-chip :key="i">
									<small>{{tag}}</small>
								</v-chip>
							</template>
						</v-chip-group>
					</v-card-text>
					<v-card-actions>
						<v-btn fab small text class="mr-1" @click="likePostedQuestion(id)">
							<v-icon>mdi-heart</v-icon>
						</v-btn>
						<span class="subheading mr-2">{{question.likes.length}} likes</span>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="12" xs="12" sm="10" md="8">
				<div class="d-flex">
					<v-text-field
						v-model="commentText"
						prepend-icon="mdi-comment"
						label="Comment you'r answer here..."
						hide-details="auto"
						@keydown.enter="commentPostAnswer()"
					></v-text-field>
					<v-btn fab small text color="primary" @click="commentPostAnswer()">
						<v-icon>mdi-send</v-icon>
					</v-btn>
				</div>
			</v-col>
		</v-row>

		<v-row justify="center">
			<v-col cols="12" xs="12" sm="10" md="8">
				<v-card class="elevation-0 mx-auto">
					<v-list three-line>
						<template v-for="(answer, index) in question.answers">
							<div :key="index" class="comments">
								<v-subheader class="username_comment">Sub header here...</v-subheader>
								<v-list-item>
									<v-list-item-avatar>
										<v-img max-width="40" src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-subtitle>{{answer.answer}}</v-list-item-subtitle>
										<div class="d-flex align-center">
											<small class="grey--text">{{answer.date}}</small>
											<div class="reaction ml-auto">
												<v-btn fab small text class="grey--text">
													<small>
														<v-icon>mdi-thumb-up</v-icon>
													</small>
												</v-btn>
												<v-btn fab small text class="grey--text">
													<small>
														<v-icon>mdi-thumb-down</v-icon>
													</small>
												</v-btn>
											</div>
										</div>
									</v-list-item-content>
								</v-list-item>
								<v-divider class="mb-3" inset></v-divider>
							</div>
						</template>
					</v-list>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters("qa", ["question", "loadingDetail"])
	},
	methods: {
		...mapActions("qa", [
			"getSingleQuestion",
			"answerOnQuestion",
			"likePostedQuestion"
		])
	}
})
export default class BlogDetail extends Vue {
	@Prop({ type: String, required: true })
	id!: string;

	question!: boolean;
	loadingDetail!: boolean;
	getSingleQuestion!: any;
	answerOnQuestion!: any;
	likePostedQuestion!: any;
	commentText = "";

	created() {
		this.getSingleQuestion(this.id);
	}

	commentPostAnswer() {
		this.answerOnQuestion({ id: this.id, answer: this.commentText });
		this.commentText = "";
	}
}
</script>

<style lang="stylus" scoped>
</style>