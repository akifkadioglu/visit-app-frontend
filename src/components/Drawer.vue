<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="title"> Takip Uygulaması </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" color="primary">
          <v-list-item :to="{ name: 'Account' }" exact two-line>
            <v-list-item-avatar>
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <h6>Kullanıcı adı</h6>
              <v-list-item-subtitle>Rol</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="(item, index) in routes"
            :key="index"
            :to="{ name: item.route }"
            exact
          >
            <v-list-item-avatar>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="error" block dark elevation="0"> Çıkış yap </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
      routes: [
        {
          name: "Ana sayfa",
          icon: "mdi-home",
          route: "Home",
        },
        {
          name: "Haritalar",
          icon: "mdi-google-maps",
          route: "Maps",
        },
        {
          name: "Takvim",
          icon: "mdi-calendar",
          route: "Calendar",
        },
        {
          name: "Ziyaretler",
          icon: "mdi-walk",
          route: "Visits",
        },
        {
          name: "Kişiler",
          icon: "mdi-account-group",
          route: "People",
        },
        {
          name: "Personeller",
          icon: "mdi-account-multiple",
          route: "Personnels",
        },
      ],
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
