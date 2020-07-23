<template>
	<v-main color="primary">
		<v-row no-gutters align="center" class="mx-5 my-3">
			<v-col cols="5" sm="5">
				<h1>Dashboard</h1>
			</v-col>

			<v-btn color="indigo" class="text--white" large link :to="{ name: 'Conference' }">Conference</v-btn>

			<v-spacer></v-spacer>
			<v-col cols="5" sm="5">
				<div class="text-center">
					<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
						<template v-slot:activator="{ on, attrs }">
							<v-avatar v-bind="attrs" v-on="on">
								<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
							</v-avatar>
						</template>

						<v-card>
							<v-list>
								<v-list-item>
									<v-list-item-avatar>
										<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title>John Doe</v-list-item-title>
										<v-list-item-subtitle>Develoepr</v-list-item-subtitle>
									</v-list-item-content>

									<v-list-item-action>
										<v-btn :class="fav ? 'indigo--text' : ''" icon @click="fav = !fav">
											<v-icon>mdi-account</v-icon>
										</v-btn>
									</v-list-item-action>
								</v-list-item>
							</v-list>

							<v-divider></v-divider>

							<v-list>
								<v-list-item>
									<v-list-item-action>
										<v-switch v-model="message" color="purple" inset></v-switch>
									</v-list-item-action>
									<v-list-item-title>Enable messages</v-list-item-title>
								</v-list-item>

								<v-list-item>
									<v-list-item-action>
										<v-switch v-model="hints" color="purple" inset></v-switch>
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
		</v-row>
		<v-divider class="mx-4 mb-5"></v-divider>
		<v-row justify="center">
			<v-col cols="4" xs="12" sm="6" md="4">
				<v-card class="rounded-lg mb-5 bshadow">
					<v-list dense>
						<v-subheader>REPORTS</v-subheader>
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

				<v-card class="rounded-lg mt-5 bshadow">
					<v-list dense>
						<v-subheader>REPORTS</v-subheader>
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
			</v-col>
			<v-col cols="7" xs="12" sm="6" md="7">
				<v-card class="rounded-lg bshadow">
					<v-list>
						<v-list-item>
							<v-list-item-icon>
								<v-icon>mdi-home</v-icon>
							</v-list-item-icon>

							<v-list-item-title>Home</v-list-item-title>
						</v-list-item>

						<v-list-group prepend-icon="account_circle" value="true">
							<template v-slot:activator>
								<v-list-item-title>Users</v-list-item-title>
							</template>

							<v-list-group no-action sub-group value="true">
								<template v-slot:activator>
									<v-list-item-content>
										<v-list-item-title>Admin</v-list-item-title>
									</v-list-item-content>
								</template>

								<v-list-item v-for="(admin, i) in admins" :key="i" link>
									<v-list-item-title v-text="admin[0]"></v-list-item-title>
									<v-list-item-icon>
										<v-icon v-text="admin[1]"></v-icon>
									</v-list-item-icon>
								</v-list-item>
							</v-list-group>

							<v-list-group sub-group no-action>
								<template v-slot:activator>
									<v-list-item-content>
										<v-list-item-title>Actions</v-list-item-title>
									</v-list-item-content>
								</template>
								<v-list-item v-for="(crud, i) in cruds" :key="i">
									<v-list-item-title v-text="crud[0]"></v-list-item-title>
									<v-list-item-action>
										<v-icon v-text="crud[1]"></v-icon>
									</v-list-item-action>
								</v-list-item>
							</v-list-group>
						</v-list-group>
					</v-list>
				</v-card>
			</v-col>
		</v-row>

		<v-divider class="mx-4 my-5"></v-divider>
		<v-row justify="center">
			<v-col cols="7" xs="12" sm="6" md="7">
				<!-- personal Progress -->
				<v-card class="rounded-lg bshadow" max-width="600" color="blue" dark>
					<v-card-text>
						<v-sheet color="rgba(0, 0, 0, .12)">
							<v-sparkline
								:value="value"
								color="rgba(255, 255, 255, .7)"
								height="100"
								padding="24"
								stroke-linecap="round"
								smooth
							>
								<template v-slot:label="item">{{ item.value }}</template>
							</v-sparkline>
						</v-sheet>
					</v-card-text>

					<v-card-text>
						<h1 class="font-weight-thin">Devlopment Progress</h1>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions class="justify-center">
						<v-btn block text>Go to Report</v-btn>
					</v-card-actions>
				</v-card>
				<!-- personal Progress -->
			</v-col>

			<v-col cols="4" xs="12" sm="12" md="4">
				<recent-chats></recent-chats>
			</v-col>
		</v-row>

		<!-- footer -->
		<v-footer dark padless>
			<v-card flat tile class="indigo lighten-1 white--text text-center">
				<v-card-text>
					<v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
						<v-icon size="24px">{{ icon }}</v-icon>
					</v-btn>
				</v-card-text>

				<v-card-text
					class="white--text pt-0"
				>Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae veli.</v-card-text>

				<v-divider></v-divider>

				<v-card-text class="white--text">
					{{ new Date().getFullYear() }} —
					<strong>Axum-HUB</strong>
				</v-card-text>
			</v-card>
		</v-footer>
		<!-- footer -->
	</v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import DevelopmentProgress from "@/components/dashboard/DevelopmentProgress.vue";
import RecentChats from "@/components/dashboard/RecentChats.vue";

@Component({
	components: {
		"app-footer": Footer,
		"development-progress": DevelopmentProgress,
		"recent-chats": RecentChats
	}
})
export default class Dashboard extends Vue {
	// mini card in top left
	item = 1;
	items = [
		{ text: "Real-Time", icon: "mdi-clock" },
		{ text: "Audience", icon: "mdi-account" },
		{ text: "Conversions", icon: "mdi-flag" }
	];

	// top huge card with drop downs
	admins = [
		["Management", "people_outline"],
		["Settings", "settings"]
	];
	cruds = [
		["Create", "add"],
		["Read", "insert_drive_file"],
		["Update", "update"],
		["Delete", "delete"]
	];

	// user-top pop-over
	fav = true;
	menu = false;
	message = false;
	hints = true;

	// grap
	value = [423, 446, 675, 510, 590, 610, 760];

	// footer
	icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];
}
</script>