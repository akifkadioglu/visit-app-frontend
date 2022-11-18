<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <v-card class="mx-auto scroll" max-width="400" max-height="90vh" tile>
          <v-subheader>ESNAFLAR</v-subheader>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Esnaf adı</v-list-item-title>
              <v-list-item-subtitle>Hakkında açıklama</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="openSheet">
                <v-icon color="primary">mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </div>
      <div class="col-sm-6">
        <v-card class="mx-auto scroll" max-height="90vh" tile>
          <v-subheader>BUGÜN ZİYARET EDİLENLER</v-subheader>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Esnaf adı</v-list-item-title>
              <v-list-item-subtitle>Hakkında açıklama</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="error">mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Esnaf adı</v-list-item-title>
              <v-list-item-subtitle>Hakkında açıklama</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="error">mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </div>
      <div class="col-sm-3">
        <v-card class="mx-auto scroll" max-width="400" max-height="90vh" tile>
          <v-subheader>İHVANLAR</v-subheader>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>İhvan adı</v-list-item-title>
              <v-list-item-subtitle>Hakkında açıklama</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="openSheet">
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
      :user="{
        name: 'Başlık',
        description:
          'çok çokçok çokçok çokçok çokçok çokçok çokçok çokçok çok uzun açıklama',
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
      isSheetOpen: false,
    };
  },
  methods: {
    closeSheet() {
      this.isSheetOpen = false;
    },
    openSheet() {
      this.isSheetOpen = true;
    },
  },
};
</script>

<style></style>
