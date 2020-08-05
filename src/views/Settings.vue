<template>
	<v-main>
		<v-row class="mt-12" justify="center">
			<v-col cols="6" class="d-flex justify-center">
				<localization-component></localization-component>
			</v-col>
		</v-row>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Localization from "@/components/Localization.vue";

@Component({
	components: {
		"localization-component": Localization
	}
})
export default class Settings extends Vue {}
</script>

<style lang="stylus" scoped>

</style>