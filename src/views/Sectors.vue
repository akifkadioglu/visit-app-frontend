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
        <v-card-subtitle>
          Sektör sayısı: {{ $store.state.sectors.length }}</v-card-subtitle
        >
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              name="name"
              placeholder="Sektörlerde Ara.."
              outlined
              v-model="search"
              single-line
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          two-line
          v-for="(item, index) in filteredSector"
          :key="index"
          @click="
            (selectedSector = item),
              (selectedSectorIndex = index),
              (isUpdateSectorDialogOpen = true)
          "
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.Name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    <AddSector
      :isDialogOpen="isAddSectorDialogOpen"
      @closeDialog="closeDialog()"
      @addedSector="addedSector"
    />

    <UpdateSector
      :sector="selectedSector"
      :isDialogOpen="isUpdateSectorDialogOpen"
      :index="selectedSectorIndex"
      @closeDialog="closeDialog()"
    />
  </div>
</template>

<script>
import AddSector from "../components/Sector/AddSector.vue";
import UpdateSector from "../components/Sector/UpdateSector.vue";

export default {
  components: {
    AddSector,
    UpdateSector,
  },
  data() {
    return {
      search: "",
      selectedSector: {},
      selectedSectorIndex: 0,
      isAddSectorDialogOpen: false,
      isUpdateSectorDialogOpen: false,
    };
  },
  computed: {
    filteredSector() {
      return this.$store.state.sectors.filter(
        (x) => x.Name.toLowerCase().indexOf(this.search) != -1
      );
    },
  },

  methods: {
    closeDialog() {
      this.isAddSectorDialogOpen = false;
      this.isUpdateSectorDialogOpen = false;
    },
    addedSector(value) {
      this.$store.state.sectors.unshift(value);
    },
  },
};
</script>
