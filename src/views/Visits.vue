<template>
  <div class="container">
    <div class="center">
      <div class="navbar mt-5" style="width: 500px">
        <input class="" v-model="start" type="date" />
        <span>-</span>
        <input class="" v-model="finish" type="date" />
      </div>
    </div>
    <div class="text-center">
      <v-btn color="primary" depressed width="100px" class="mt-3">Getir</v-btn>
    </div>
    <div class="row mt-6">
      <div class="col-sm-4">
        <div>
          <v-list nav dense height="500px" class="scroll">
            <v-list-item-group active-class="no-active">
              <v-list-item
                v-for="(item, index) in this.$store.state.personnels.map(
                  (x) => x.Name
                )"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{
                    $store.state.personnels.map((x) => x.Visits.length)[index]
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
  </div>
</template>

<script>
// @ is an alias to /src
var tr = require("apexcharts/dist/locales/tr.json");

export default {
  mounted() {
    this.setValues();
  },
  data() {
    return {
      start: new Date().toISOString().substr(0,10),
      finish: new Date().toISOString().substr(0,10),
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
    "$store.state.personnels"() {
      this.setValues();
    },
  },
  methods: {
    setValues() {
      this.$refs.realtimeChart.updateSeries(
        [
          {
            data: this.$store.state.personnels.map((x) => x.Visits.length),
          },
        ],
        false,
        true
      );
      this.$refs.realtimeChart.updateOptions({
        xaxis: {
          categories: this.$store.state.personnels.map((x) => x.Name),
        },
      });
      this.options.xaxis.categories = this.$store.state.personnels.map(
        (x) => x.Name
      );
    },
    async getPersonnelsVisitsByDate() {
      await this.axios
        .get("/personnels-visits-by-date")
        .then((result) => {
          this.$store.state.personnels = result.data.personnels;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateSeriesLine() {},
  },
};
</script>
