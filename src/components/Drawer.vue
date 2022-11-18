<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="title"> Takip Uygulaması </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" color="primary">
          <v-list-item :to="{ name: 'Home' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ana sayfa</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Maps' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-google-maps</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Haritalar</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Calendar' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Takvim</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Visits' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-walk</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ziyaretler</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'AddSomeone' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Yeni Kişi Ekle</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Personels' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Personeller</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  width: 100%;
}
</style>
