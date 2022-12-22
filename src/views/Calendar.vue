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
          :events="
            this.$store.state.personnelVisits.map((x) => ({
              description: x.Description,
              name: x.People.Name,
              start:
                x.VisitedAt.split('T')[0] +
                ' ' +
                x.VisitedAt.split('T')[1].substr(0, 5),
            }))
          "
          type="month"
          @click:event="showEvent"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
          elevated="0"
        >
          <v-card width="400px">
            <v-toolbar elevation="0">
              <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
            </v-toolbar>
            <hr />
            <v-card-text>
              <div>{{ selectedEvent.description }}</div>
              <div class="text-end">
                {{ selectedEvent.start | moment("Do MMMM YYYY, dddd H:mm") }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="error" @click="selectedOpen = false">
                Kapat
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
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
        name: "",
        start: "2022-12-13 15:01",
      },
    ],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  methods: {
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
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
