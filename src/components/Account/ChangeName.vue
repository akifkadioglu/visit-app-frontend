<template>
  <div>
    <v-card-subtitle> İsim Değiştir </v-card-subtitle>
    <v-text-field
      v-model="name"
      :counter="30"
      label="Yeni isminizi giriniz"
      rounded
      filled
    />
    <v-text-field
      v-model="phone"
      label="Yeni telefon numaranızı"
      :counter="30"
      rounded
      filled
    />

    <v-btn
      @click="changeName"
      color="primary"
      x-large
      :disabled="isLoading"
      class="save-button mt-2 mb-5"
    >
      <v-progress-circular
        class="text-center"
        v-if="isLoading"
        indeterminate
        color="primary"
      />
      <div v-else>Kaydet</div>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$helpers.returnDecryptedLocalStorage("name"),
      phone: this.$helpers.returnDecryptedLocalStorage("phone")
        ? this.$helpers.returnDecryptedLocalStorage("phone")
        : null,
      isLoading: false,
    };
  },
  methods: {
    async changeName() {
      this.isLoading = true;
      if (this.name == "" || this.name == null) {
        alert("İsim alanı boş olamaz");
        this.isLoading = false;
        return;
      }
      await this.axios
        .post("/change-name", {
          name: this.name,
          phone: this.phone,
        })
        .then(() => {
          localStorage.setItem(
            "name",
            this.$helpers.returnEncryptItem(this.name)
          );
          localStorage.setItem(
            "phone",
            this.$helpers.returnEncryptItem(this.phone ?? "")
          );
          alert("İsminiz '" + this.name + "' olarak değiştirildi");
          this.$router.go(0);
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
  height: 50px;
}
</style>
