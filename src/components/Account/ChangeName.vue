<template>
  <div>
    <v-card-subtitle> İsim Değiştir </v-card-subtitle>
    <v-text-field placeholder="Yeni isminizi giriniz" rounded filled />
    <v-btn color="primary" x-large class="save-button mt-2 mb-5">Kaydet</v-btn>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.save-button {
  width: 100%;
  height: 50px;
}
</style>
