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
const base64url = require("base64url");

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
    parseJwt(token) {
      try {
        return JSON.parse(base64url.decode(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    },
    async login() {
      this.isLoading = true;
      await this.axios
        .post("login", this.loginForm)
        .then((result) => {
          this.axios.defaults.headers.common["Authorization"] =
            `Bearer ` + result.data.token;

          var token = this.CryptoJS.AES.encrypt(
            result.data.token,
            process.env.VUE_APP_APP_KEY
          );

          var decode = this.parseJwt(result.data.token);
           //akifkadioglu@gmail.com
          localStorage.setItem("token", token);
          localStorage.setItem("name", decode.Name);
          localStorage.setItem("role", decode.Role);
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
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
