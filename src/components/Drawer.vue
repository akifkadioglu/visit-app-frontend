<template>
  <div>
    <div v-if="currentRouteName != 'Login'">
      <v-app-bar color="primary" dark height="62px">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title class="title"> Takip Uygulaması</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" color="primary">
            <v-list-item :to="{ name: 'Account' }" exact two-line>
              <v-list-item-avatar>
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <h6>{{ name }}</h6>
                <v-list-item-subtitle>
                  <div v-if="$store.state.isAdmin">Yönetici</div>
                  <div v-else>Normal</div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="(item, index) in filteredRoutes"
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
            <v-btn @click="logout" color="error" block dark elevation="0">
              Çıkış yap
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    filteredRoutes() {
      return this.$store.state.isAdmin
        ? this.routes
        : this.routes.filter((x) => x.isAdminRoleRequired == false);
    },
  },
  mounted() {
    this.$store.state.isAdmin =
      this.$helpers.returnDecryptedLocalStorage("role") === "true";
  },
  data() {
    return {
      drawer: false,
      group: null,
      isLoginning: false,
      name: this.$helpers.returnDecryptedLocalStorage("name"),
      routes: [
        {
          name: "Ana sayfa",
          icon: "mdi-home",
          route: "Home",
          isAdminRoleRequired: false,
        },
        {
          name: "Haritalar",
          icon: "mdi-google-maps",
          route: "Maps",
          isAdminRoleRequired: false,
        },
        {
          name: "Takvim",
          icon: "mdi-calendar",
          route: "Calendar",
          isAdminRoleRequired: false,
        },
        {
          name: "Ziyaretler",
          icon: "mdi-walk",
          route: "Visits",
          isAdminRoleRequired: true,
        },
        {
          name: "Sektörler",
          icon: "mdi-briefcase",
          route: "Sectors",
          isAdminRoleRequired: true,
        },
        {
          name: "Kişiler",
          icon: "mdi-account-group",
          route: "People",
          isAdminRoleRequired: false,
        },
        {
          name: "Personeller",
          icon: "mdi-account-multiple",
          route: "Personnels",
          isAdminRoleRequired: true,
        },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  width: 100%;
}
</style>
