<template>
  <v-app>
    <v-card height="100vh" elevation="0">
      <Drawer />
      <v-main>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer.vue";

export default {
  name: "App",
  components: {
    Drawer,
  },
  mounted() {
    if (localStorage.getItem("token") != null) {
      this.$func.getPeople();
      this.$func.getSectors();
      this.$func.getPersonnels();
      this.$func.getRoles();
      this.$func.getUserPeople();
      this.$func.dailyVisits();
      this.$func.getPersonnelVisits();
      this.$func.getAllPersonnelsVisits();
      if (this.$helpers.returnDecryptedLocalStorage("role") === "true") {
        this.$func.getAllVisits();
      }
    }
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  border-radius: 20;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

body {
  font-family: "Readex Pro";
}

.scroll {
  overflow-y: scroll;
}

.center {
  display: grid;
  place-items: center;
}
</style>
