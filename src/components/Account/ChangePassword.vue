<template>
  <div>
    <v-card-subtitle> Şifre Değiştir </v-card-subtitle>

    <v-text-field placeholder="Mevcut Şifreyi giriniz" rounded filled />
    <v-text-field placeholder="Yeni Şifreyi giriniz" rounded filled />
    <v-text-field placeholder="Yeni Şifreyi Yeniden giriniz" rounded filled />
    <v-btn color="primary" x-large class="save-button mt-2 mb-5">Kaydet</v-btn>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.save-button {
  width: 100%;
}
</style>
