<template>
  <div class="container">
    <div class="text-center p-3">
      <v-progress-circular color="primary" indeterminate v-if="isLoading" />
      <v-btn @click="refresh" v-else depressed small color="primary" icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <div class="row">
      <PeopleList
        :header="'Esnaflar'"
        :items="$store.state.userPeople.filter((x) => !x.Role)"
        @openSheet="openSheet"
      />

      <div class="col-sm-6">
        <v-card
          class="mx-auto scroll rounded-lg"
          max-height="90vh"
          tile
          outlined
        >
          <v-subheader>BUGÜN ZİYARET EDİLENLER</v-subheader>

          <v-list-item
            two-line
            v-for="(item, index) in $store.state.dailyVisits"
            :key="index"
            @click="selectVisit(item, index)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.People.Name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.People.Information }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
      <PeopleList
        :header="'İhvanlar'"
        :items="$store.state.userPeople.filter((x) => x.Role)"
        @openSheet="openSheet"
      />
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
    <VisitInformation
      :selectedVisit="selectedVisit"
      :isDialogOpen="isVisitInformationDialogOpen"
      :index="selectedIndexForVisit"
      @deleteVisit="deleteVisit"
      @closeSheet="closeSheet"
    />
  </div>
</template>

<script>
import VisitInformation from "../components/Home/VisitInformation.vue";
import AddToVisits from "../components/Home/AddToVisits.vue";
import PeopleList from "../components/Home/PeopleList.vue";

export default {
  components: {
    AddToVisits,
    PeopleList,
    VisitInformation,
  },
  data() {
    return {
      selectedPerson: {
        id: 0,
        name: "",
        description: "",
      },
      selectedVisit: {
        id: 0,
        name: "",
        description: "",
      },
      selectedIndexForVisit: 0,
      isSheetOpen: false,
      userId: this.$helpers.returnDecryptItem(localStorage.getItem("user_id")),
      isVisitInformationDialogOpen: false,
      isLoading: false,
    };
  },
  methods: {
    closeSheet() {
      this.isSheetOpen = false;
      this.isVisitInformationDialogOpen = false;
    },
    selectVisit(item, index) {
      this.isVisitInformationDialogOpen = true;
      this.selectedVisit = item;
      this.selectedIndexForVisit = index;
    },
    async deleteVisit(item, index) {
      this.isLoading = true;
      if (confirm("Silmek istediğine emin misin?")) {
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
            this.$store.state.personnels[i].Visits =
              this.$store.state.personnels[i].Visits.filter(
                (x) => x.ID != item.ID
              );
            this.closeSheet();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.isLoading = false;
    },
    openSheet(item) {
      this.selectedPerson.id = item.ID;
      this.selectedPerson.name = item.Name;
      this.selectedPerson.description = item.Information;
      this.isSheetOpen = true;
    },
    addedVisit(item, personnels) {
      (item["Personnels"] = this.$store.state.personnels.filter(
        (x) => personnels.indexOf(x.ID) != -1
      )),
        this.$store.state.dailyVisits.unshift(item);
      this.$store.state.AllVisits.unshift(item);
      this.$store.state.personnelVisits.unshift(item);
      this.$func.getPersonnels();
    },
    async refresh() {
      this.isLoading = true;
      await this.$func.dailyVisits();
      this.isLoading = false;
    },
  },
};
</script>
