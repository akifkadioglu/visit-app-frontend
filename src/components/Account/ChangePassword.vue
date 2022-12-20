<template>
  <div>
    <v-card-subtitle> Şifre Değiştir </v-card-subtitle>

    <v-text-field
      v-model="form.CurrentPassword"
      placeholder="Mevcut Şifreyi giriniz"
      :type="isCurrentPasswordDisplay ? 'text' : 'password'"
      :append-icon="isCurrentPasswordDisplay ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="isCurrentPasswordDisplay = !isCurrentPasswordDisplay"
      rounded
      filled
    />
    <v-text-field
      v-model="form.Password"
      placeholder="Yeni Şifreyi giriniz"
      :type="isPasswordDisplay ? 'text' : 'password'"
      :append-icon="isPasswordDisplay ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="isPasswordDisplay = !isPasswordDisplay"
      rounded
      filled
    />
    <v-text-field
      v-model="form.PasswordConfirmation"
      placeholder="Yeni Şifreyi Yeniden giriniz"
      :type="isPasswordConfirmationDisplay ? 'text' : 'password'"
      :append-icon="isPasswordConfirmationDisplay ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="
        isPasswordConfirmationDisplay = !isPasswordConfirmationDisplay
      "
      rounded
      filled
    />
    <div class="text-center" v-if="isLoading">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <v-btn
      @click="changePassword"
      v-else
      color="primary"
      x-large
      class="save-button mt-2 mb-5"
    >
      Kaydet
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCurrentPasswordDisplay: false,
      isPasswordDisplay: false,
      isPasswordConfirmationDisplay: false,
      form: {
        CurrentPassword: "",
        Password: "",
        PasswordConfirmation: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async changePassword() {
      this.isLoading = true;
      if (
        this.form.CurrentPassword == "" ||
        this.form.CurrentPassword == null
      ) {
        alert("Mevcut şifre boş olamaz");
        this.isLoading = false;
        return;
      }
      await this.axios
        .post("/change-password", this.form)
        .then(() => {
          alert("Şifreniz değiştirildi");
          this.form = {
            CurrentPassword: "",
            Password: "",
            PasswordConfirmation: "",
          };
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
.save-button {
  width: 100%;
}
</style>
