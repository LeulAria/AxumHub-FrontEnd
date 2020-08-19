<template>
	<v-card class="mx-auto" max-width="600">
		<v-card-title class="blue-grey white--text">
			<span class="title">Logs</span>
			<v-spacer></v-spacer>
			<v-btn
				:outlined="interval == null"
				:color="interval == null ? 'white' : 'primary'"
				dark
				depressed
				@click="interval == null ? start() : stop()"
			>Realtime Logging</v-btn>
		</v-card-title>
		<v-card-text class="py-0">
			<v-timeline dense>
				<v-slide-x-reverse-transition group hide-on-leave>
					<v-timeline-item v-for="item in items" :key="item.id" :color="item.color" small fill-dot>
						<v-alert
							:value="true"
							:color="item.color"
							:icon="item.icon"
							class="white--text"
						>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-alert>
					</v-timeline-item>
				</v-slide-x-reverse-transition>
			</v-timeline>
		</v-card-text>
	</v-card>
</template>


<script>
const COLORS = ["info", "warning", "error", "success"];
const ICONS = {
	info: "mdi-information",
	warning: "mdi-alert",
	error: "mdi-alert-circle",
	success: "mdi-check-circle"
};

export default {
	data: () => ({
		interval: null,
		items: [
			{
				id: 1,
				color: "info",
				icon: ICONS["info"]
			}
		],
		nonce: 2
	}),

	beforeDestroy() {
		this.stop();
	},

	methods: {
		addEvent() {
			const { icon } = this.genAlert();
			let { color } = this.genAlert();

			const previousColor = this.items[0].color;

			while (previousColor === color) {
				color = this.genColor();
			}

			this.items.unshift({
				id: this.nonce++,
				color,
				icon
			});

			if (this.nonce > 6) {
				this.items.pop();
			}
		},
		genAlert() {
			const color = this.genColor();

			return {
				color,
				icon: this.genIcon(color)
			};
		},
		genColor() {
			return COLORS[Math.floor(Math.random() * 3)];
		},
		genIcon(color) {
			return ICONS[color];
		},
		start() {
			this.interval = setInterval(this.addEvent, 3000);
		},
		stop() {
			clearInterval(this.interval);
			this.interval = null;
		}
	}
};
</script>

<!--
<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card
      dark
      flat
    >
      <v-btn
        absolute
        bottom
        color="pink"
        right
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-card-title class="pa-2 purple lighten-3">
        <v-btn icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <h3 class="title font-weight-light text-center grow">Timeline</h3>
        <v-avatar>
          <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>
        </v-avatar>
      </v-card-title>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
        <v-container class="fill-height">
          <v-row align="center">
            <strong class="display-4 font-weight-regular mr-6">8</strong>
            <v-row justify="end">
              <div class="headline font-weight-light">Monday</div>
              <div class="text-uppercase font-weight-light">February 2015</div>
            </v-row>
          </v-row>
        </v-container>
      </v-img>
    </v-card>
    <v-card-text class="py-0">
      <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          color="pink"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>5pm</strong>
            </v-col>
            <v-col>
              <strong>New Icon</strong>
              <div class="caption">Mobile App</div>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>3-4pm</strong>
            </v-col>
            <v-col>
              <strong>Design Stand Up</strong>
              <div class="caption mb-2">Hangouts</div>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                ></v-img>
              </v-avatar>
              <v-avatar>

                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                ></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="pink"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>12pm</strong>
            </v-col>
            <v-col>
              <strong>Lunch break</strong>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>9-11am</strong>
            </v-col>
            <v-col>
              <strong>Finish Home Screen</strong>
              <div class="caption">Web App</div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

-->