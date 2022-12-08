<template>
  <div class="container">
    <div class="center">
      <div class="navbar mt-5" style="width: 500px">
        <input class="" type="date" />
        <span>-</span>
        <input class="" type="date" />
      </div>
    </div>

    <div class="text-center">
      <v-btn color="primary" width="100px" class="mt-3">Getir</v-btn>
    </div>
    <div class="row mt-6">
      <div class="col-sm-4">
        <div>
          <v-list nav dense height="500px" class="scroll">
            <v-list-item-group active-class="no-active">
              <v-list-item
                v-for="(item, index) in options.xaxis.categories"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{ series[0].data[index] }}
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </div>
      <div class="col-sm-8">
        <apexchart
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
  components: {},
  data() {
    return {
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
          categories: ["Şakir", "Mehmet Ali", "Ahmet Veysel"],
        },
      },
      series: [
        {
          name: "Ziyaret sayısı",
          data: [2, 1, 3],
        },
      ],
    };
  },
  methods: {
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
  },
};
</script>
