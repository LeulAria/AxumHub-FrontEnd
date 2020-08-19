<template>
	<div>
		<v-row>
			<v-col xs="12" class="mb-4 controls d-flex justify-end">
				<div class="text-center align-right">
					<v-dialog v-model="dialog" width="500">
						<template v-slot:activator="{ on, attrs }">
							<v-btn icon color="primary" class="elevation-0 mr-4" dark v-bind="attrs" v-on="on">
								<v-icon>mdi-cog-outline</v-icon>
							</v-btn>
						</template>

						<v-card class="py-5 px-10">
							<h3 class="mb-3">Customize calender view format</h3>

							<v-select
								class="my-8"
								v-model="type"
								prepend-icon="mdi-calendar-month"
								:items="typeOptions"
								label="Type"
								hide-details
								dense
							></v-select>
							<v-menu
								ref="startMenu"
								v-model="startMenu"
								:close-on-content-click="false"
								:nudge-right="40"
								:return-value.sync="start"
								transition="scale-transition"
								min-width="290px"
								offset-y
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="start"
										class="mb-8"
										label="Start Date"
										prepend-icon="event"
										dense
										readonly
										hide-details
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker v-model="start" no-title scrollable>
									<v-spacer></v-spacer>
									<v-btn text color="primary" @click="startMenu = false">Cancel</v-btn>
									<v-btn text color="primary" @click="$refs.startMenu.save(start)">OK</v-btn>
								</v-date-picker>
							</v-menu>
							<v-menu
								v-if="hasEnd"
								ref="endMenu"
								v-model="endMenu"
								:close-on-content-click="false"
								:nudge-right="40"
								:return-value.sync="end"
								transition="scale-transition"
								min-width="290px"
								offset-y
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="end"
										class="mb-8"
										label="End Date"
										prepend-icon="event"
										dense
										readonly
										hide-details
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker v-model="end" no-title scrollable>
									<v-spacer></v-spacer>
									<v-btn text color="primary" @click="endMenu = false">Cancel</v-btn>
									<v-btn text color="primary" @click="$refs.endMenu.save(end)">OK</v-btn>
								</v-date-picker>
							</v-menu>
							<v-menu
								ref="nowMenu"
								v-model="nowMenu"
								:close-on-content-click="false"
								:nudge-right="40"
								:return-value.sync="now"
								transition="scale-transition"
								min-width="290px"
								offset-y
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="now"
										class="mb-8"
										label="Today"
										prepend-icon="event"
										dense
										readonly
										hide-details
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker v-model="now" no-title scrollable>
									<v-spacer></v-spacer>
									<v-btn text color="primary" @click="nowMenu = false">Cancel</v-btn>
									<v-btn text color="primary" @click="$refs.nowMenu.save(now)">OK</v-btn>
								</v-date-picker>
							</v-menu>
							<v-select
								v-model="mode"
								:items="modeOptions"
								dense
								prepend-icon="mdi-clock-time-eleven-outline"
								hide-details
								class="mb-8"
								label="Event Overlap Mode"
							></v-select>
							<v-select
								v-model="weekdays"
								:items="weekdaysOptions"
								dense
								prepend-icon="mdi-calendar-weekend-outline"
								hide-details
								class="mb-8"
								label="Weekdays"
							></v-select>
							<v-text-field
								v-if="type === 'custom-weekly'"
								v-model="minWeeks"
								dense
								prepend-icon="mdi-calendar-weekend-outline"
								hide-details
								class="mb-8"
								label="Minimum Weeks"
								type="number"
							></v-text-field>
							<v-select
								v-if="hasIntervals"
								v-model="intervals"
								:items="intervalsOptions"
								dense
								prepend-icon="mdi-calendar-sync-outline"
								hide-details
								class="mb-8"
								label="Intervals"
							></v-select>
							<v-select
								v-if="type === 'custom-daily'"
								v-model="maxDays"
								:items="maxDaysOptions"
								dense
								prepend-icon="mdi-view-day-outline"
								hide-details
								class="mb-8"
								label="# of Days"
							></v-select>
							<v-select
								v-if="hasIntervals"
								v-model="styleInterval"
								:items="styleIntervalOptions"
								dense
								prepend-icon="mdi-format-color-fill"
								hide-details
								class="mb-8"
								label="Styling"
							></v-select>
						</v-card>
					</v-dialog>
				</div>
			</v-col>
		</v-row>
		<v-row justify="center" class="mb-4">
			<v-col xs="12" sm="6" md="4" lg="3" class="mb-4 controls">
				<div>
					<v-btn
						fab
						small
						absolute
						right
						color="primary"
						class="elevation-0"
						@click="$refs.calendar.next()"
					>
						<v-icon dark>mdi-chevron-right</v-icon>
					</v-btn>
					<v-btn
						fab
						small
						absolute
						left
						color="primary"
						class="elevation-0"
						@click="$refs.calendar.prev()"
					>
						<v-icon dark>mdi-chevron-left</v-icon>
					</v-btn>
				</div>
			</v-col>
		</v-row>

		<v-row justify="center">
			<v-col sm="12" md="10" lg="8" class="pl-4">
				<v-sheet height="600">
					<v-calendar
						ref="calendar"
						v-model="start"
						:type="type"
						:start="start"
						:end="end"
						:min-weeks="minWeeks"
						:max-days="maxDays"
						:now="now"
						:dark="dark"
						:weekdays="weekdays"
						:first-interval="intervals.first"
						:interval-minutes="intervals.minutes"
						:interval-count="intervals.count"
						:interval-height="intervals.height"
						:interval-style="intervalStyle"
						:show-interval-label="showIntervalLabel"
						:short-intervals="shortIntervals"
						:short-months="shortMonths"
						:short-weekdays="shortWeekdays"
						:color="color"
						:events="events"
						:event-overlap-mode="mode"
						:event-overlap-threshold="45"
						:event-color="getEventColor"
						@change="getEvents"
					></v-calendar>
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>


<script>
const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];

const intervalsDefault = {
	first: 0,
	minutes: 60,
	count: 24,
	height: 48
};

const stylings = {
	default(interval) {
		return undefined;
	},
	workday(interval) {
		const inactive =
			interval.weekday === 0 ||
			interval.weekday === 6 ||
			interval.hour < 9 ||
			interval.hour >= 17;
		const startOfHour = interval.minute === 0;
		const dark = this.dark;
		const mid = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

		return {
			backgroundColor: inactive
				? dark
					? "rgba(0,0,0,0.4)"
					: "rgba(0,0,0,0.05)"
				: undefined,
			borderTop: startOfHour ? undefined : "1px dashed " + mid
		};
	},
	past(interval) {
		return {
			backgroundColor: interval.past
				? this.dark
					? "rgba(0,0,0,0.4)"
					: "rgba(0,0,0,0.05)"
				: undefined
		};
	}
};

export default {
	data: () => ({
		dialog: false,
		startMenu: false,
		start: "2019-01-12",
		endMenu: false,
		end: "2019-01-27",
		nowMenu: false,
		minWeeks: 1,
		now: null,
		events: [],
		colors: [
			"blue",
			"indigo",
			"deep-purple",
			"cyan",
			"green",
			"orange",
			"grey darken-1"
		],
		names: [
			"Meeting",
			"Holiday",
			"PTO",
			"Travel",
			"Event",
			"Birthday",
			"Conference",
			"Party"
		],
		type: "month",
		typeOptions: [
			{ text: "Day", value: "day" },
			{ text: "4 Day", value: "4day" },
			{ text: "Week", value: "week" },
			{ text: "Month", value: "month" },
			{ text: "Custom Daily", value: "custom-daily" },
			{ text: "Custom Weekly", value: "custom-weekly" }
		],
		mode: "stack",
		modeOptions: [
			{ text: "Stack", value: "stack" },
			{ text: "Column", value: "column" }
		],
		weekdays: weekdaysDefault,
		weekdaysOptions: [
			{ text: "Sunday - Saturday", value: weekdaysDefault },
			{ text: "Mon, Wed, Fri", value: [1, 3, 5] },
			{ text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
			{ text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] }
		],
		intervals: intervalsDefault,
		intervalsOptions: [
			{ text: "Default", value: intervalsDefault },
			{
				text: "Workday",
				value: { first: 16, minutes: 30, count: 20, height: 48 }
			}
		],
		maxDays: 7,
		maxDaysOptions: [
			{ text: "7 days", value: 7 },
			{ text: "5 days", value: 5 },
			{ text: "4 days", value: 4 },
			{ text: "3 days", value: 3 }
		],
		styleInterval: "default",
		styleIntervalOptions: [
			{ text: "Default", value: "default" },
			{ text: "Workday", value: "workday" },
			{ text: "Past", value: "past" }
		],
		color: "primary",
		colorOptions: [
			{ text: "Primary", value: "primary" },
			{ text: "Secondary", value: "secondary" },
			{ text: "Accent", value: "accent" },
			{ text: "Red", value: "red" },
			{ text: "Pink", value: "pink" },
			{ text: "Purple", value: "purple" },
			{ text: "Deep Purple", value: "deep-purple" },
			{ text: "Indigo", value: "indigo" },
			{ text: "Blue", value: "blue" },
			{ text: "Light Blue", value: "light-blue" },
			{ text: "Cyan", value: "cyan" },
			{ text: "Teal", value: "teal" },
			{ text: "Green", value: "green" },
			{ text: "Light Green", value: "light-green" },
			{ text: "Lime", value: "lime" },
			{ text: "Yellow", value: "yellow" },
			{ text: "Amber", value: "amber" },
			{ text: "Orange", value: "orange" },
			{ text: "Deep Orange", value: "deep-orange" },
			{ text: "Brown", value: "brown" },
			{ text: "Blue Gray", value: "blue-gray" },
			{ text: "Gray", value: "gray" },
			{ text: "Black", value: "black" }
		],
		shortIntervals: true,
		shortMonths: false,
		shortWeekdays: false
	}),
	computed: {
		intervalStyle() {
			return stylings[this.styleInterval].bind(this);
		},
		hasIntervals() {
			return (
				this.type in
				{
					week: 1,
					day: 1,
					"4day": 1,
					"custom-daily": 1
				}
			);
		},
		hasEnd() {
			return (
				this.type in
				{
					"custom-weekly": 1,
					"custom-daily": 1
				}
			);
		}
	},
	methods: {
		viewDay({ date }) {
			this.start = date;
			this.type = "day";
		},
		getEventColor(event) {
			return event.color;
		},
		showIntervalLabel(interval) {
			return interval.minute === 0;
		},
		getEvents({ start, end }) {
			const events = [];

			const min = new Date(`${start.date}T00:00:00`);
			const max = new Date(`${end.date}T23:59:59`);
			const days = (max.getTime() - min.getTime()) / 86400000;
			const eventCount = this.rnd(days, days + 20);

			for (let i = 0; i < eventCount; i++) {
				const allDay = this.rnd(0, 3) === 0;
				const firstTimestamp = this.rnd(min.getTime(), max.getTime());
				const first = new Date(firstTimestamp - (firstTimestamp % 900000));
				const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
				const second = new Date(first.getTime() + secondTimestamp);

				events.push({
					name: this.names[this.rnd(0, this.names.length - 1)],
					start: first,
					end: second,
					timed: !allDay,
					color: this.colors[this.rnd(0, this.colors.length - 1)]
				});
			}

			this.events = events;
		},
		rnd(a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a;
		}
	}
};
</script>

<style scoped>
.controls {
	position: relative;
}
</style>