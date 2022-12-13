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
        >
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
      @closeDialog="closeDialog()"
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
    this.sectors = this.$store.state.sectors;
  },
  data() {
    return {
      search: "",
      sectors: [],
      isAddSectorDialogOpen: false,
    };
  },
  computed: {
    filteredSector() {
      return this.sectors.filter((x) => x.Name.toLowerCase().indexOf(this.search) != -1);
    },
  },
  watch: {
    "$store.state.sectors": {
      handler: function () {
        this.sectors = this.$store.state.sectors;
      },
    },
  },
  methods: {
    // EMIT ACTIONS
    closeDialog() {
      this.isAddSectorDialogOpen = false;
    },
    addedSector(value) {
      this.sectors.unshift(value);
    },

    // HTTP ACTIONS
    deleteSector(id, index) {
      if (
        confirm(
          this.sectors[index].Name +
            " adlı sektörün silinmesini gerçekten istiyor musun?"
        )
      ) {
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
      }
    },
  },
};
</script>
