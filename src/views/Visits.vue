<template>
  <div class="container">
    <div class="center">
      <div class="navbar mt-5" style="width: 500px">
        <input v-model="start" type="date" />
        <span>-</span>
        <input v-model="finish" type="date" />
      </div>
    </div>
    <div class="text-center">
      <v-btn
        color="primary"
        @click="getPersonnelsVisitsByDate"
        depressed
        width="100px"
        class="mt-3"
        :disabled="isLoading"
      >
        <v-progress-circular v-if="isLoading" indeterminate color="primary" />
        <div v-else>Getir</div>
      </v-btn>
    </div>
    <div class="row mt-6">
      <div class="col-sm-4">
        <div>
          <v-list nav dense height="500px" class="scroll">
            <v-list-item-group active-class="no-active">
              <v-list-item
                v-for="(item, index) in this.$store.state.allPersonnelVisits"
                :key="index"
                @click="(isDialogOpen = true), (selectedVisits = item.Visits)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.Name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{
                    $store.state.allPersonnelVisits.map((x) => x.Visits.length)[
                      index
                    ]
                  }}
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </div>
      <div class="col-sm-8">
        <apexchart
          ref="realtimeChart"
          class="mx-auto"
          width="100%"
          height="500px"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
    </div>
    <VisitInformation
      @closeDialog="isDialogOpen = false"
      :visits="selectedVisits"
      :isDialogOpen="isDialogOpen"
    />
  </div>
</template>

<script>
// @ is an alias to /src
var tr = require("apexcharts/dist/locales/tr.json");
import VisitInformation from "../components/Visit/VisitInformation.vue";
export default {
  mounted() {
    this.setValues();
  },
  computed: {
    personelVisits() {
      return [];
    },
  },
  components: {
    VisitInformation,
  },
  data() {
    return {
      selectedVisits: [],
      isDialogOpen: false,
      isLoading: false,
      start: new Date().toISOString().substr(0, 10),
      finish: new Date(new Date().valueOf() + 1000 * 3600 * 24)
        .toISOString()
        .substr(0, 10),
      options: {
        chart: {
          id: "Ziyaretler",
          locales: [tr],
          defaultLocale: "tr",
        },
        yaxis: [
          {
            labels: {
              formatter: function (val) {
                return val.toFixed(0);
              },
            },
          },
        ],
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "Ziyaret sayısı",
          data: [],
        },
      ],
    };
  },
  watch: {
    "$store.state.allPersonnelVisits"() {
      this.setValues();
    },
  },
  methods: {
    setValues() {
      this.$refs.realtimeChart.updateSeries(
        [
          {
            data: this.$store.state.allPersonnelVisits.map(
              (x) => x.Visits.length
            ),
          },
        ],
        false,
        true
      );
      this.$refs.realtimeChart.updateOptions({
        xaxis: {
          categories: this.$store.state.allPersonnelVisits.map((x) => x.Name),
        },
      });
      this.options.xaxis.categories = this.$store.state.allPersonnelVisits.map(
        (x) => x.Name
      );
    },
    async getPersonnelsVisitsByDate() {
      this.isLoading = true;
      await this.axios
        .get("/personnels-visits-by-date", {
          params: {
            start: this.start,
            finish: this.finish,
          },
        })
        .then((result) => {
          this.$store.state.allPersonnelVisits = result.data.personnels;
        })
        .catch((err) => {
          console.log(err);
        });
      this.isLoading = false;
    },
    updateSeriesLine() {},
  },
};
</script>
