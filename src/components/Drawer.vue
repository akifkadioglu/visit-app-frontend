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
                  <div v-if="role">Yönetici</div>
                  <div v-else>Normal</div>
                </v-list-item-subtitle>
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
  },
  mounted() {
    this.role = this.$helpers.returnDecryptedLocalStorage("role") === "true";
    this.$store.state.isAdmin =
      this.$helpers.returnDecryptedLocalStorage("role") === "true";
  },
  data() {
    return {
      drawer: false,
      group: null,
      isLoginning: false,
      role: false,
      name: this.$helpers.returnDecryptedLocalStorage("name"),
      routes: [
        {
          name: "Ana sayfa",
          icon: "mdi-home",
          route: "Home",
          required: true,
        },
        {
          name: "Haritalar",
          icon: "mdi-google-maps",
          route: "Maps",
          required: true,
        },
        {
          name: "Takvim",
          icon: "mdi-calendar",
          route: "Calendar",
          required: true,
        },
        {
          name: "Ziyaretler",
          icon: "mdi-walk",
          route: "Visits",
          required: true,
        },
        {
          name: "Sektörler",
          icon: "mdi-briefcase",
          route: "Sectors",
          required: true,
        },
        {
          name: "Kişiler",
          icon: "mdi-account-group",
          route: "People",
          required: true,
        },
        {
          name: "Personeller",
          icon: "mdi-account-multiple",
          route: "Personnels",
          required: true,
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
