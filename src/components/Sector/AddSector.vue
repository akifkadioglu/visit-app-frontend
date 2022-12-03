<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isDialogOpen" persistent width="600">
        <v-card>
          <v-card-title class="headline">Yeni Kişi Ekle</v-card-title>
          <v-card-subtitle class="mt-2">Sektörün bilgileri;</v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model="form.Name"
              placeholder="İsim"
              filled
              rounded
              dense
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="secondary"
              depressed
              @click.native="$emit('closeDialog')"
            >
              Kapat
            </v-btn>
            <div class="ml-5">
              <v-btn
                color="primary"
                depressed
                :disabled="isLoading"
                width="100px"
                @click="save"
              >
                <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  color="primary"
                />
                <div v-else>Kaydet</div>
              </v-btn>
            </div>
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
    return {
      form: {
        Name: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async save() {
      this.isLoading = true;
      await this.axios
        .post("/add-sector", this.form)
        .then((result) => {
          this.form.Name = "";
          this.$emit("addedSector", result.data.sector);
          this.$emit("closeDialog");
        })
        .catch((err) => {
          console.log(err);
        });
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.select {
  max-width: 48%;
}
</style>
