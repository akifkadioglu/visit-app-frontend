<template>
  <div class="container center">
    <div style="width: 600px">
      <v-card max-height="85vh" class="scroll">
        <v-card-title primary-title class="navbar">
          <div>Personeller</div>
          <v-btn color="primary" icon>
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle> personel sayısı: 51</v-card-subtitle>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Personel adı</v-list-item-title>
            <v-list-item-subtitle>Telefon numarası</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
