<template>
	<div class="locale-changer">
		<vs-select color="#56B" placeholder="Select Language" v-model="$i18n.locale">
			<vs-option
				v-for="(lang, i) in langs"
				:key="`Lang${i}`"
				:label="lang.label"
				:value="lang.value"
			>{{lang.label}}</vs-option>
		</vs-select>
	</div>
</template>

<script>
export default {
	name: "locale-changer",
	data() {
		return {
			langs: [
				{ label: "English", value: "en" },
				{ label: "አማርኛ", value: "am" }
				// { label: "French", value: "en" },
				// { label: "ሱማልኛ", value: "am" },
				// { label: "Oromiffaa", value: "en" }
			]
		};
	}
};
</script>