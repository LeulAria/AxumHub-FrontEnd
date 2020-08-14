<template>
	<v-card flat class="blog-container">
		<v-toolbar color="purple" dark flat prominent>
			<v-btn icon class="create-new" v-if="!(tabs==2||tabs==3)" :to="{ name: 'NewBlog' }" link>
				<i class="bx bxs-message-square-add add-icon"></i>
			</v-btn>
			<v-row>
				<v-col cols="12" xs="12" sm="7" md="8">
					<v-text-field
						append-icon="mic"
						class="mx-4 mt-3"
						flat
						:name="Math.random()"
						hide-details
						label="Search here..."
						prepend-inner-icon="search"
						solo-inverted
					></v-text-field>
				</v-col>

				<v-col cols="12" xs="12" sm="5" md="4">
					<v-card-title class="text-center justify-center py-6">
						<h3 class="font-weight-bold basil--text">AxumHUB Blogs</h3>
					</v-card-title>
				</v-col>
			</v-row>

			<template v-slot:extension>
				<v-tabs v-model="tabs" centered>
					<v-tab v-for="(tab,i) in tabItems" :key="i">{{ tab }}</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>

		<v-tabs-items v-model="tabs">
