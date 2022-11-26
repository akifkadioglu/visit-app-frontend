<template>
  <div>
    <v-card-subtitle> İsim Değiştir </v-card-subtitle>
    <v-text-field
      v-model="name"
      placeholder="Yeni isminizi giriniz"
      rounded
      filled
    />
      <div class="text-center" v-if="isLoading">
        <v-progress-circular v-if="!isLoading" indeterminate color="primary" />
      </div>

      <v-btn
        @click="changeName"
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
      name: "",
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
        .post("/change-name", { name: this.name })
        .then(() => {
          localStorage.setItem("name", this.name);
          alert("İsminiz '" + this.name + "' olarak değiştirildi");
          this.name = null;
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
