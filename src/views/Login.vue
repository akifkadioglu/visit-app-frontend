<template>
  <div class="loginPage">
    <div>
      <transition name="fade" mode="out-in">
        <LoginComponent v-if="isLoginning" />
        <RegisterComponent v-else @registered="isLoginning = true" />
      </transition>
      <v-divider />
      <div class="text-center">
        <div @click="changeMode" depressed small color="primary" class="point">
          <transition name="fade" mode="out-in">
            <div v-if="isLoginning">Hesabın yok mu? Kaydol!</div>
            <div v-else>Hesabın varsa Giriş yap</div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginComponent from "../components/Login/Login.vue";
import RegisterComponent from "../components/Login/Register.vue";
export default {
  components: {
    LoginComponent,
    RegisterComponent,
  },
  data() {
    return {
      isLoginning: true,
    };
  },
  methods: {
    changeMode() {
      this.isLoginning = !this.isLoginning;
    },
  },
};
</script>

<style scoped>
.point {
  cursor: pointer;
}
</style>
