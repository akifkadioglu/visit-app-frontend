<template>
  <div class="container center">
    <div style="width: 600px">
      <v-card max-height="85vh" class="scroll">
        <v-card-title primary-title class="navbar">
          <div>Sektörler</div>
          <v-btn color="primary" icon @click="isAddSectorDialogOpen = true">
            <v-icon>mdi-briefcase-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle> Sektör sayısı: {{ sectors.length }}</v-card-subtitle>
        <v-list-item two-line v-for="(item, index) in sectors" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.Name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              depressed
              small
              color="error"
              icon
              @click="deleteSector(item.ID, index)"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </div>
    <AddSector
      :isDialogOpen="isAddSectorDialogOpen"
      @closeDialog="closeDialog"
      @addedSector="addedSector"
    />
  </div>
</template>

<script>
import AddSector from "../components/Sector/AddSector.vue";

export default {
  components: {
    AddSector,
  },
  mounted() {
    this.getSectors();
  },
  data() {
    return {
      sectors: [],
      isAddSectorDialogOpen: false,
    };
  },
  methods: {
    closeDialog() {
      this.isAddSectorDialogOpen = false;
    },
    getSectors() {
      this.axios
        .get("/sectors")
        .then((result) => {
          this.sectors = result.data.sectors;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addedSector(value) {
      this.sectors.unshift(value);
    },
    deleteSector(id, index) {
      this.axios
        .delete("/delete-sector", {
          params: {
            SectorID: id,
          },
        })
        .then(() => {
          this.sectors.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
