<template>
	<v-card class="mx-auto my-10" max-width="600">
		<v-card dark flat>
			<v-btn absolute bottom color="pink" right fab>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
			<v-img
				src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
				gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
			>
				<v-container class="fill-height">
					<v-row align="center">
						<v-toolbar-title class="ml-4">axumhub</v-toolbar-title>
						<br />
						<h1 class="display-4 thin font-weight-thin mr-6 ml-2">Uploads</h1>
					</v-row>
				</v-container>
			</v-img>
		</v-card>
		<v-card-text class="py-0">
			<v-timeline align-top dense>
				<v-timeline-item color="pink" small v-for="(i,m) in 4" :key="m">
					<v-row>
						<v-col cols="4">
							<div class="d-flex align-center">
								<strong>5pm</strong>
								<div class="d-flex flex-column ml-2">
									<v-avatar>
										<v-img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"></v-img>
									</v-avatar>
									<strong>Jhon Doe</strong>
								</div>
							</div>
						</v-col>
						<v-col class="upload-file">
							<v-card outlined hover class="pa-4 d-flex">
								<div>
									<strong>File_Name.pdf</strong>
									<div class="caption">file/pdf</div>
								</div>
								<v-btn icon class="ml-auto">
									<v-icon>mdi-cloud-download-outline</v-icon>
								</v-btn>
							</v-card>
						</v-col>
					</v-row>
				</v-timeline-item>
			</v-timeline>
		</v-card-text>
	</v-card>
</template>

<style lang="stylus" scoped>

</style>