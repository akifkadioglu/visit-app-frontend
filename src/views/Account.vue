<template>
  <div class="container">
    <div class="center person-information-page">
      <v-card class="person-information-card">
        <v-card-title primary-title> Kullanıcı Adı </v-card-title>
        <v-card-text>
          <Transition name="fade" mode="out-in">
            <ChangeName v-if="isNameChanging" />
            <ChangePassword v-else />
          </Transition>
          <div class="text-end">
            <v-btn color="primary" icon @click="changeMod">
              <v-icon v-if="!isNameChanging">mdi-keyboard</v-icon>
              <v-icon v-else>mdi-shield-key-outline</v-icon>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import ChangeName from "../components/Account/ChangeName.vue";
import ChangePassword from "../components/Account/ChangePassword.vue";
export default {
  components: {
    ChangeName,
    ChangePassword,
  },
  data() {
    return {
      isNameChanging: true,
    };
  },
  methods: {
    changeMod() {
      this.isNameChanging = !this.isNameChanging;
    },
  },
};
</script>

<style scoped>
.person-information-card {
  width: 600px;
}
.person-information-page {
  height: 85vh;
}
</style>
