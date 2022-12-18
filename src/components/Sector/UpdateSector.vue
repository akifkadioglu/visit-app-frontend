<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isDialogOpen" persistent width="600">
        <v-card>
          <v-card-title v-if="sector" class="headline">
            {{ sector.Name }}
          </v-card-title>
          <v-card-subtitle class="mt-2">Kişinin bilgileri;</v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model="name"
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
            <v-btn
              class="ml-5"
              color="primary"
              :disabled="isLoading"
              depressed
              @click="updatePeople"
            >
              <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="primary"
              />
              <div v-else>Düzenle</div>
            </v-btn>
            <v-btn
              color="error"
              width="100px"
              class="ml-5"
              depressed
              @click="deleteSector"
              :disabled="isLoading"
            >
              <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="primary"
              />
              <div v-else>Sil</div>
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
    index: {
      type: Number,
      default: 0,
    },
    sector: {
      type: Object,
      default() {
        return {
          Name: "",
        };
      },
    },
  },
  data() {
    return {
      name: "",
      isLoading: false,
    };
  },
  methods: {
    async updatePeople() {
      this.isLoading = true;
      if (this.name == "") {
        alert("Isim Boş olamaz");
        this.isLoading = false;
        return;
      }
      await this.axios
        .put("update-sector", {
          SectorName: this.name,
          SectorId: this.sector.ID,
        })
        .then(() => {
          this.$store.state.sectors[this.index].Name = this.name;
          this.name = "";
        })
        .catch((err) => {
          console.log(err);
        });
      this.isLoading = false;
    },
    async deleteSector() {
      this.isLoading = true;
      if (
        confirm(
          this.$store.state.sectors[this.index].Name +
            " adlı sektörün silinmesini gerçekten istiyor musun?"
        )
      ) {
        await this.axios
          .delete("/delete-sector", {
            params: {
              SectorID: this.sector.ID,
            },
          })
          .then(() => {
            this.$store.state.sectors.splice(this.index, 1);
            this.$emit("closeDialog");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
