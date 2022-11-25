<template>
  <div class="loginPage">
    <v-card width="400px">
      <v-card-title primary-title> Giriş yap </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="loginForm.email"
          placeholder="E-posta"
          filled
          rounded
          dense
        />
        <v-text-field
          placeholder="Şifre"
          v-model="loginForm.password"
          :append-icon="isPasswordDisplay ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="isPasswordDisplay = !isPasswordDisplay"
          :type="isPasswordDisplay ? 'text' : 'password'"
          filled
          rounded
          dense
        />
        <div class="text-center">
          <v-progress-circular v-if="isLoading" indeterminate color="primary" />
          <v-btn
            v-else
            color="primary"
            @click="login"
            class="loginPageButtons"
            elevation="0"
          >
            Giriş yap
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      isPasswordDisplay: false,
      loginForm: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      await this.axios
        .post("login", this.loginForm)
        .then((result) => {
          this.axios.defaults.headers.common["Authorization"] =
            `Bearer ` + result.data.token;
          var decode = VueJwtDecode.decode(result.data.token);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("name", decode.name);
          localStorage.setItem("email", decode.email);
          this.$router.push({ name: "Home" });
        })
        .catch(() => {
          alert(
            "Something went wrong\n-check your password\n-check are you active user"
          );
        });
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.loginPageButtons {
  width: 100%;
}
.loginPage {
  height: 85vh;
  display: grid;
  place-items: center;
}
</style>
