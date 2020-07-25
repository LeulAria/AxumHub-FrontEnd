<template>
	<v-main>
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">Axum HUB Q&A</h3>
				<v-menu transition="scroll-y-reverse-transition" class="ml-auto">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" class="ma-2 elevation-0" fab small v-bind="attrs" v-on="on">
							<v-icon>mdi-pencil-plus-outline</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item :to="{ name: 'CreateQuestion' }" link>
							<v-list-item-title>Create New Question</v-list-item-title>
						</v-list-item>
						<v-list-item :to="{ name: 'UserPosts' }" link>
							<v-list-item-title>See Your Questions</v-list-item-title>
						</v-list-item>
						<v-list-item link>
							<v-list-item-title>Delete a Question</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
		</v-row>
		<v-container fluid class="px-xs-4 px-sm-8 px-md-15 py-0">
			<v-row justify="space-between">
				<v-col cols="12" xs="12" sm="6" md="6">
					<v-row>
						<v-col cols="12" xs="12">
							<v-card outlined class="rounded-lg" min-height="80">recent-chats</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
			<v-col cols="12" xs="12" sm="6" md="5">
				<v-text-field
					v-model="search"
					cache-items
					prepend-inner-icon="mdi-magnify"
					class="auto-complete mx-4 mx-md-13"
					flat
					hide-no-data
					label="Search Events..."
					:autocomplete="false"
				></v-text-field>
				<v-card
					transition="slide-y-transition"
					v-bind="attrs"
					v-for="(question, i) in filteredQuestions"
					:key="question.id"
					outlined
					class="project-card rounded-lg pa-2 py-5 my-3 overflow-hidden"
					min-height="150"
					max-height="150"
				>
					<small class="project-date grey--text text--darken-1 ma-0">{{question.date.slice(0,10)}}</small>
					<h4 class="ml-4 bolded">{{question.title}}</h4>
					<v-card-subtitle>{{question.description.split(' ').slice(0,10).join(' ')}}</v-card-subtitle>
					<div class="project-star d-flex align-center">
						<v-icon color="info">mdi-star-outline</v-icon>
						<small>12</small>
					</div>
					<v-col cols="12" sm="6" offset-sm="3">
						<div class="text-center" v-if="i==0">
							<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
								<template v-slot:activator="{ on, attrs }">
									<v-btn text fab small class="project-more-btn elevation-0" v-bind="attrs" v-on="on">
										<v-icon>mdi-dots-vertical</v-icon>
									</v-btn>
								</template>

								<v-card>
									<v-list>
										<v-list-item>
											<v-list-item-action>
												<v-switch inset v-model="message" color="purple"></v-switch>
											</v-list-item-action>
											<v-list-item-title>Enable messages</v-list-item-title>
										</v-list-item>

										<v-list-item>
											<v-list-item-action>
												<v-switch inset v-model="hints" color="purple"></v-switch>
											</v-list-item-action>
											<v-list-item-title>Enable hints</v-list-item-title>
										</v-list-item>
									</v-list>

									<v-card-actions>
										<v-spacer></v-spacer>

										<v-btn text @click="menu = false">Cancel</v-btn>
										<v-btn color="primary" text @click="menu = false">Save</v-btn>
									</v-card-actions>
								</v-card>
							</v-menu>
						</div>
					</v-col>
				</v-card>
			</v-col>
		</v-container>
		<v-overlay :value="isLoading">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters("qa", ["isLoading", "questions"])
	},
	methods: {
		...mapActions("qa", ["getAllQuestions", "likePostedQuestion"])
	}
})
export default class Project extends Vue {
	search = "";
	isLoading!: boolean;
	questions!: [any];
	getAllQuestions!: any;

	fav = true;
	menu = false;
	message = false;
	hints = true;

	mounted() {
		this.getAllQuestions();
		console.log(this.questions);
	}

	showDetail(id: string) {
		this.$router.push({ name: "QuestionDetail", params: { id } });
	}

	set filteredQuestions(val: any) {
		this.questions = val;
	}
	get filteredQuestions() {
		const q = this.questions.filter((question: any) => {
			return question.title.toLowerCase().match(this.search);
		});
		return q;
	}
}
</script>

<style lang="stylus" scoped>
.container
	padding 0
.project-card
	position relative
.project-date
	position absolute
	font-size .67em
	top 5px
	right 10px
.project-star
	position absolute
	bottom 8px
	left: 20px
	.v-icon
		font-size 1em
.project-more-btn
	position absolute
	bottom 8px
	right 20px

.v-card>.v-card__progress+:not(.v-btn):not(.v-chip),
.v-card>:last-child:not(.v-btn):not(.v-chip)
	padding-top 3px !important
</style>