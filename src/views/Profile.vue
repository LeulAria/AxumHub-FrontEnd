<template>
	<v-main>
		<v-row justify="center" class="mt-6">
			<v-col cols="12" xs="12" md="12">
				<div class="d-flex justify-center">
					<v-avatar rounded="true" color="indigo" size="200" class>
						<v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
					</v-avatar>
				</div>
				<v-row>
					<v-col class="d-flex flex-column align-center" col="12" sm="12">
						<h2>{{userInfo&&userInfo.name}}</h2>
						<p class="grey--text">{{userInfo&&userInfo.email}}</p>
						<v-subheader>Location, City</v-subheader>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-container>
			<v-row>
				<v-col cols="6" sm="12" md="6">
					<v-card outlined class="pa-5">
						<v-subheader>Bio</v-subheader>
						<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel beatae recusandae obcaecati reprehenderit itaque excepturi minima.</p>
					</v-card>
				</v-col>
				<v-col cols="6" sm="12" md="6">
					<v-card outlined class="rounded-lg">
						<v-subheader>Skills</v-subheader>
						<v-card class="mx-auto my-3 elevation-0" max-width="300" tile>
							<v-list dense>
								<v-list-item-group v-model="item" color="primary">
									<v-list-item v-for="(item, i) in items" :key="i">
										<v-list-item-icon>
											<v-icon v-text="item.icon"></v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title v-text="item.text"></v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-card>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<v-container>
			<v-row>
				<v-col cols="6" sm="12" md="6">
					<v-card outlined class="pa-5">
						<v-subheader>Experiance</v-subheader>
					</v-card>
				</v-col>
				<v-col cols="6" sm="12" md="6">
					<v-card outlined class="pa-5">
						<v-subheader>Education</v-subheader>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-row justify="center">
			<v-dialog v-model="dialog" fullscreen hide-overlay transition="fab-transition">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog</v-btn>
				</template>
				<v-card>
					<v-toolbar dark color="primary">
						<v-btn icon dark @click="dialog = false">
							<v-icon>mdi-close</v-icon>
						</v-btn>
						<v-toolbar-title>Settings</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-toolbar-items>
							<v-btn dark text @click="dialog = false">Save</v-btn>
						</v-toolbar-items>
					</v-toolbar>
					<v-list three-line subheader>
						<v-subheader>Edit Profile</v-subheader>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Content filtering</v-list-item-title>
								<v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Password</v-list-item-title>
								<v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
					<v-divider></v-divider>
					<v-list three-line subheader>
						<v-subheader>General</v-subheader>
						<v-list-item>
							<v-list-item-action>
								<v-checkbox v-model="notifications"></v-checkbox>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>Notifications</v-list-item-title>
								<v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-action>
								<v-checkbox v-model="sound"></v-checkbox>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>Sound</v-list-item-title>
								<v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-action>
								<v-checkbox v-model="widgets"></v-checkbox>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>Auto-add widgets</v-list-item-title>
								<v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card>
			</v-dialog>
		</v-row>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
	computed: {
		...mapGetters("users", ["userInfo"])
	}
})
export default class Profile extends Vue {
	userInfo!: any;

	item = 1;
	items = [
		{ text: "Html", icon: "mdi-format-quote-close-outline" },
		{ text: "CSS", icon: "mdi-format-quote-close-outline" },
		{ text: "JavaScript", icon: "mdi-format-quote-close-outline" },
		{ text: "Python", icon: "mdi-format-quote-close-outline" },
		{ text: "C++", icon: "mdi-format-quote-close-outline" },
		{ text: "Vue, React", icon: "mdi-format-quote-close-outline" },
		{ text: "Node", icon: "mdi-format-quote-close-outline" }
	];

	dialog = false;
	notifications = false;
	sound = true;
	widgets = false;
}
</script>
