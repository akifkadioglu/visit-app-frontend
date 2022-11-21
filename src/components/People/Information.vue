<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isDialogOpen" persistent width="600">
        <v-card>
          <v-card-title class="headline">Kişi adı</v-card-title>
          <v-card-text>Bilgiler</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              depressed
              @click.native="$emit('closeDialog')"
            >
              Kapat
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    isDialogOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
