<template>
  <div class="container">
    <div class="text-center p-3">
      <v-progress-circular color="primary" indeterminate v-if="isLoading" />
      <v-btn @click="refresh" v-else depressed small color="primary" icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <v-card class="mx-auto scroll" max-width="400" max-height="90vh" tile>
          <v-subheader>ESNAFLAR</v-subheader>
          <v-list-item
            two-line
            v-for="(item, index) in $store.state.userPeople.filter(
              (x) => !x.Role
            )"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.Name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.Information }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="openSheet(item)">
                <v-icon color="primary">mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </div>
      <div class="col-sm-6">
        <v-card class="mx-auto scroll" max-height="90vh" tile>
          <v-subheader>BUGÜN ZİYARET EDİLENLER</v-subheader>

          <v-list-item
            two-line
            v-for="(item, index) in $store.state.dailyVisits"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.People.Name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.People.Information }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="primary"
              />
              <v-btn v-else icon @click="deleteVisit(item, index)">
                <v-icon color="error">mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </div>
      <div class="col-sm-3">
        <v-card class="mx-auto scroll" max-width="400" max-height="90vh" tile>
          <v-subheader>İHVANLAR</v-subheader>
          <v-list-item
            two-line
            v-for="(item, index) in $store.state.userPeople.filter(
              (x) => x.Role
            )"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title> {{ item.Name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.Information }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="openSheet(item)">
                <v-icon color="primary">mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </div>
    </div>
    <AddToVisits
      :addToVisits="isSheetOpen"
      @closeSheet="closeSheet"
      @addedVisit="addedVisit"
      :user="{
        id: selectedPerson.id,
        name: selectedPerson.name,
        description: selectedPerson.description,
      }"
    />
  </div>
</template>

<script>
import AddToVisits from "../components/Home/AddToVisits.vue";

export default {
  components: { AddToVisits },
  data() {
    return {
      selectedPerson: {
        id: 0,
        name: "",
        description: "",
      },
      isSheetOpen: false,
      userId: this.$helpers.returnDecryptItem(localStorage.getItem("user_id")),

      isLoading: false,
    };
  },
  methods: {
    closeSheet() {
      this.isSheetOpen = false;
    },
    async deleteVisit(item, index) {
      this.isLoading = true;
      await this.axios
        .delete("delete-visit", { params: { VisitID: item.ID } })
        .then(() => {
          this.$store.state.dailyVisits.splice(index, 1);
          this.$store.state.AllVisits = this.$store.state.AllVisits.filter(
            (x) => x.ID != item.ID
          );
          this.$store.state.personnelVisits =
            this.$store.state.personnelVisits.filter((x) => x.ID != item.ID);
          var i = this.$store.state.personnels
            .map((e) => e.ID)
            .indexOf(parseInt(this.userId));
          this.$store.state.personnels[i].Visits = this.$store.state.personnels[
            i
          ].Visits.filter((x) => x.ID != item.ID);
        })
        .catch((err) => {
          console.log(err);
        });
      this.isLoading = false;
    },
    openSheet(item) {
      this.selectedPerson.id = item.ID;
      this.selectedPerson.name = item.Name;
      this.selectedPerson.description = item.Information;
      this.isSheetOpen = true;
    },
    addedVisit(item, personnels) {
      this.$store.state.dailyVisits.unshift(item);
      this.$store.state.AllVisits.unshift(item);
      this.$store.state.personnelVisits.unshift(item);
      let index = this.$store.state.personnels
        .map((e) => e.ID)
        .indexOf(parseInt(this.userId));
      this.$store.state.personnels[index].Visits.unshift(item);
      for (let index = 0; index < personnels.length; index++) {
        console.log(personnels[index]);
        this.$store.state.personnels
          .map((e) => e.ID)
          .indexOf(parseInt(personnels[index]));
        this.$store.state.personnels[personnels[index]].Visits.unshift(item);
      }
    },
    async refresh() {
      this.isLoading = true;
      await this.$func.dailyVisits();
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
