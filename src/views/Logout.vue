<template>
	<div></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Logout extends Vue {
	logginout!: any;

	created() {
		this.logginout = this.$vs.loading({
			type: "circles",
			color: "#FF6",
			background: "#000",
			opacity: 0.8,
			scale: 1.6,
			text: "Loggingout"
		});

		this.$store.dispatch("users/logOut");
		setTimeout(() => {
			this.$router.push({ name: "Login" });
			this.logginout.close();
		}, 2000);
	}
}
</script>