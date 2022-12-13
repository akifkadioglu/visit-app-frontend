<template>
  <div class="container center">
    <div style="width: 600px">
      <v-card max-height="85vh" class="scroll">
        <v-card-title primary-title class="navbar">
          <div>Personeller</div>
        </v-card-title>
        <v-card-subtitle>
          personel sayısı: {{ $store.state.personnels.length }}
        </v-card-subtitle>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              outlined
              placeholder="Personellerde Ara.."
              v-model="search"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          two-line
          v-for="(item, index) in filteredPersonnels"
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.Name }} </v-list-item-title>
            <v-list-item-subtitle>{{ item.Email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    filteredPersonnels() {
      return this.$store.state.personnels.filter(
        (x) => x.Name.toLowerCase().indexOf(this.search) != -1
      );
    },
  },
  data() {
    return {
      search: "",
    };
  },
};
</script>
