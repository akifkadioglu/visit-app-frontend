<template>
  <v-app>
    <v-card height="100vh">
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
    this.getPeople();
    this.getSectors();
    this.getPersonnels();
    this.getRoles();
  },

  methods: {
    getPeople() {
      this.axios
        .get("/people")
        .then((result) => {
          this.$store.state.people = result.data.people;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSectors() {
      this.axios
        .get("/sectors")
        .then((result) => {
          this.$store.state.sectors = result.data.sectors;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPersonnels() {
      this.axios
        .get("/personnels")
        .then((result) => {
          this.$store.state.personnels = result.data.personnels;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRoles() {
      this.$store.state.roles = [
        {
          Name: "Ihvan",
          Role: true,
        },
        {
          Name: "Esnaf",
          Role: false,
        },
      ];
    },
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
