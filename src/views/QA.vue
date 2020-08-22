<template>
	<v-main>
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">Axum HUB Q&A</h3>
				<v-menu transition="scroll-y-reverse-transition" class="ml-auto">
					<template v-slot:activator="{ on, attrs }">
						<v-btn class="ma-2 elevation-0" fab small v-bind="attrs" v-on="on">
							<v-icon>mdi-pencil-plus-outline</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item :to="{ name: 'CreateQuestion' }" link>
							<v-list-item-title>{{$t("message.createNewQuestion")}}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
		</v-row>
		<v-row no-gutters class="my-2 my-4">
			<v-subheader>{{$t("message.allQuestions")}}</v-subheader>
			<v-col cols="12" xs="12">
				<v-text-field
					v-model="search"
					cache-items
					prepend-inner-icon="mdi-magnify"
					class="auto-complete mx-4 mx-md-13"
					flat
					hide-no-data
					hide-details
					label="Search Events..."
					solo-inverted
				></v-text-field>
			</v-col>
		</v-row>
		<v-container>
			<v-row justify="center">
				<v-col v-if="isLoading" cols="12" xs="7" sm="6" md="4" lg="3" class="mt-15">
					<v-progress-linear
						color="deep-purple accent-4"
						indeterminate
						rounded
						height="6"
						max-width="300"
					></v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
		<v-container fluid class="px-xs-4 px-sm-8 px-md-15">
			<v-row>
				<v-col
					cols="12"
					xs="12"
					sm="6"
					md="4"
					v-for="question in filteredQuestions"
					:key="question._id"
					transition="slide-y-reverse-transition"
				>
					<v-card
						outlined
						color="#232121"
						dark
						class="rounded-lg pa-2"
						min-height="270"
						max-height="270"
					>
						<v-card-subtitle>{{question.date}}</v-card-subtitle>
						<h4 class="ml-4 bolded">{{question.title | snnipit(3) }}</h4>

						<v-card-subtitle>{{question.description | snnipit(20) }}</v-card-subtitle>

						<v-card-actions class="d-flex">
							<v-btn fab small text class="mr-1" @click="likePostedQuestion(question._id)">
								<v-icon>mdi-heart</v-icon>
							</v-btn>
							<span class="subheading mr-2">{{question.likes.length}} {{$t("message.likes")}}</span>
							<span class="mr-1">·</span>
							<v-btn fab small class="ml-auto" text @click="showDetail(question._id)">
								<v-icon>mdi-eye</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
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
export default class QA extends Vue {
	search = "";
	isLoading!: boolean;
	questions!: [any];
	getAllQuestions!: any;

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