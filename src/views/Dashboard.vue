<template>
	<v-main color="primary">
		<v-row no-gutters align="center" class="mx-5 my-3">
			<v-col cols="5" sm="5">
				<h1>Dashboard</h1>
			</v-col>
		</v-row>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";

@Component({
	components: {}
})
export default class Dashboard extends Vue {}
</script>