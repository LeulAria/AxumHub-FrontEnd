<template>
	<v-container style="max-width: 700px" class="pa-5">
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">Axum HUB Tasks</h3>
				<v-menu transition="scroll-y-reverse-transition" class="ml-auto">
					<template v-slot:activator="{ on, attrs }">
						<v-btn class="ma-2 elevation-0" fab small v-bind="attrs" v-on="on">
							<v-icon>mdi-pencil-plus-outline</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item :to="{ name: 'CreateQuestion' }" link>
							<v-list-item-title>Save</v-list-item-title>
						</v-list-item>
						<v-list-item :to="{ name: 'UserPosts' }" link>
							<v-list-item-title>Clear</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
		</v-row>
		<v-text-field
			v-model="task"
			prepend-icon="mdi-clipboard-list-outline"
			label="What are you working on?"
			@keydown.enter="create"
			class="mt-13"
		>
			<v-fade-transition v-slot:append>
				<v-icon v-if="task" @click="create">add_circle</v-icon>
			</v-fade-transition>
		</v-text-field>

		<h2 class="display-1 success--text pl-4">
			Tasks:&nbsp;
			<v-fade-transition leave-absolute>
				<span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
			</v-fade-transition>
		</h2>

		<v-divider class="mt-4"></v-divider>

		<v-row class="my-1" align="center">
			<strong class="mx-4 info--text text--darken-2">Remaining: {{ remainingTasks }}</strong>

			<v-divider vertical></v-divider>

			<strong class="mx-4 success--text text--darken-2">Completed: {{ completedTasks }}</strong>

			<v-spacer></v-spacer>

			<v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
		</v-row>

		<v-divider class="mb-4"></v-divider>

		<v-card v-if="tasks&&tasks.length > 0">
			<v-slide-y-transition class="py-0" group tag="v-list">
				<template v-for="(task, i) in tasks">
					<v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

					<v-list-item :key="`${i}-${task.text}`">
						<v-list-item-action>
							<v-checkbox v-model="task.done" :color="task.done && 'grey' || 'primary'">
								<template v-slot:label>
									<div :class="task.done && 'grey--text' || 'primary--text'" class="ml-4" v-text="task.text"></div>
								</template>
							</v-checkbox>
						</v-list-item-action>

						<v-spacer></v-spacer>

						<v-scroll-x-transition>
							<v-icon v-if="task.done" color="success">check</v-icon>
						</v-scroll-x-transition>
					</v-list-item>
				</template>
			</v-slide-y-transition>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class TaskList extends Vue {
	tasks = [
		{
			done: false,
			text: "Foobar"
		},
		{
			done: false,
			text: "Fizzbuzz"
		}
	];
	ownTask!: string;

	get task(): string {
		return this.ownTask;
	}
	set task(val) {
		this.ownTask = val;
	}

	get completedTasks() {
		return this.tasks.filter(task => task.done).length;
	}
	get progress() {
		return (this.completedTasks / this.tasks.length) * 100;
	}
	get remainingTasks() {
		return this.tasks.length - this.completedTasks;
	}

	create() {
		this.tasks.push({
			done: false,
			text: this.ownTask
		});
		this.ownTask = "";
		this.task = "";
	}
}
</script>