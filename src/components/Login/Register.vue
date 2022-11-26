<template>
  <div class="registerPage">
    <v-card width="400px">
      <v-card-title primary-title> Kaydol </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="registerForm.email"
          placeholder="E-posta"
          filled
          rounded
          dense
        />
        <v-text-field
          v-model="registerForm.name"
          placeholder="İsim"
          filled
          rounded
          dense
        />
        <v-text-field
          v-model="registerForm.password"
          placeholder="Şifre"
          :append-icon="isPasswordDisplay ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="isPasswordDisplay = !isPasswordDisplay"
          :type="isPasswordDisplay ? 'text' : 'password'"
          filled
          rounded
          dense
        />
        <v-text-field
          v-model="registerForm.password_confirmation"
          :append-icon="
            isPasswordConfirmationDisplay ? 'mdi-eye' : 'mdi-eye-off'
          "
          @click:append="
            isPasswordConfirmationDisplay = !isPasswordConfirmationDisplay
          "
          :type="isPasswordConfirmationDisplay ? 'text' : 'password'"
          placeholder="Şifre Yeniden"
          filled
          rounded
          dense
        />
        <div class="text-center">
          <v-progress-circular v-if="isLoading" indeterminate color="primary" />
          <v-btn
            v-else
            @click="register"
            color="primary"
            class="registerPageButtons"
            elevation="0"
          >
            Kaydol
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPasswordDisplay: false,
      isPasswordConfirmationDisplay: false,
      registerForm: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async register() {
      this.isLoading = true;
      if (
        this.registerForm.password != this.registerForm.password_confirmation
      ) {
        alert("Şifreler uyuşmuyor!");
        this.isLoading = false;
        return;
      }
      await this.axios
        .post("register", this.registerForm)
        .then((response) => {
          alert(
            "Sistemimize hoş geldiniz " +
              response.data.personnel.Name +
              ", lütfen hesabınızın onaylanmasını bekleyin"
          );
          this.$emit("registered");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      this.isLoading = false;
    },
  },
};
</script>
<style scoped>
.registerPageButtons {
  width: 100%;
}
.registerPage {
  height: 85vh;
  display: grid;
  place-items: center;
}
</style>
