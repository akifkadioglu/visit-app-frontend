<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isDialogOpen" persistent width="600">
        <v-card>
          <v-card-title class="headline">Yeni Kişi Ekle</v-card-title>
          <v-card-subtitle class="mt-2">Kişinin bilgileri;</v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model="form.Name"
              placeholder="İsim"
              filled
              rounded
              dense
            />
            <v-text-field
              v-model="form.Address"
              placeholder="Açık Adres"
              filled
              rounded
              dense
            />
            <v-text-field
              v-model="form.Phone"
              placeholder="Telefon"
              filled
              rounded
              dense
            />
            <div class="navbar">
              <v-text-field
                class="select"
                v-model="form.Latitude"
                placeholder="Enlem"
                prepend-icon="mdi-latitude"
                filled
                rounded
                dense
              />
              <v-text-field
                class="select"
                v-model="form.Longitude"
                placeholder="Boylam"
                prepend-icon="mdi-longitude"
                filled
                rounded
                dense
              />
            </div>
            <div class="navbar">
              <v-select
                class="select"
                filled
                rounded
                dense
                v-model="form.SectorID"
                :items="this.$store.state.sectors"
                item-value="ID"
                item-text="Name"
                menu-props="auto"
                label="Sektör"
                hide-details
                prepend-icon="mdi-briefcase-outline"
                single-line
              >
                <template v-slot:no-data>
                  <small class="m-3">
                    <b>Kullanılabilecek hiç sektör yok!</b>
                  </small>
                </template>
              </v-select>
              <v-select
                class="select"
                filled
                rounded
                dense
                v-model="form.Role"
                :items="this.$store.state.roles"
                item-value="Role"
                item-text="Name"
                menu-props="auto"
                label="Rol"
                hide-details
                prepend-icon="mdi-script-text-outline"
                single-line
              >
                <template v-slot:no-data>
                  <small class="m-3">
                    <b>Kullanılabilecek hiç Rol yok!</b>
                  </small>
                </template>
              </v-select>
            </div>
            <v-textarea
              name="input-7-1"
              filled
              v-model="form.Information"
              rounded
              class="mt-5"
              auto-grow
              placeholder="Kişi hakkında bilgi girin"
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
        Phone: "",
        SectorID: "",
        Latitude: "",
        Longitude: "",
        Address: "",
        Role: "",
        Information: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async save() {
      this.isLoading = true;
      await this.axios
        .post("/add-people", this.form)
        .then((result) => {
          this.$emit("addedPeople", result.data.people);
          this.form = {
            Name: "",
            Phone: "",
            SectorID: "",
            Latitude: "",
            Longitude: "",
            Address: "",
            Role: "",
            Information: "",
          };
          this.$emit("closeDialog");
        })
        .catch((err) => {
          console.log(err);
        });
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.select {
  max-width: 48%;
}
</style>
