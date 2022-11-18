<template>
  <v-row>
    <v-col>
      <v-sheet height="86vh">
        <v-toolbar elevation="0">
          <v-spacer />
          <div>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            {{ today | moment("Do MMMM YYYY") }}
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
          </div>
          <v-spacer />
        </v-toolbar>
        <v-calendar
          ref="calendar"
          :now="today.slice(0, 10)"
          :value="today.slice(0, 10)"
          :events="events"
          color="primary"
          type="month"
        ></v-calendar>
        
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
  data: () => ({
    today: new Date().toISOString(),
    events: [
      {
        name: "Weekly Meeting",
        start: "2022-11-13 15:01",
      },
    ],
  }),
  methods: {
    prev() {
      this.changer(-30);
    },
    next() {
      this.changer(30);
    },
    changer(day) {
      let today = new Date(this.today);
      today.setDate(today.getDate() + day);
      this.today = today.toISOString();
    },
  },
};
</script>
