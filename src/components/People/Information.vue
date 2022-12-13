<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isDialogOpen" persistent width="600">
        <v-card>
          <v-card-title class="headline">{{ person.Name }}</v-card-title>
          <v-card-subtitle class="mt-2">Kişinin bilgileri;</v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model="person.Name"
              @change="updatePeople"
              placeholder="İsim"
              filled
              rounded
              dense
            />
            <v-text-field
              v-model="person.Address"
              @change="updatePeople"
              placeholder="Açık Adres"
              filled
              rounded
              dense
            />
            <v-text-field
              v-model="person.Phone"
              @change="updatePeople"
              placeholder="Telefon"
              filled
              rounded
              dense
            />
            <a
              :href="
                'https://www.google.com/maps/dir/' +
                person.Latitude +
                ',' +
                person.Longitude
              "
              target="_blank"
              style="text-decoration: none"
            >
              Konumu gör
            </a>
            <div class="navbar">
              <v-text-field
                class="select"
                v-model="person.Latitude"
                @change="updatePeople"
                placeholder="Enlem"
                prepend-icon="mdi-latitude"
                filled
                rounded
                dense
              />
              <v-text-field
                class="select"
                v-model="person.Longitude"
                @change="updatePeople"
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
                v-model="person.SectorID"
                @change="updatePeople"
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
                v-model="person.Role"
                @change="updatePeople"
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
            <v-select
              class="mt-3"
              filled
              rounded
              v-if="isAuthUserAdmin"
              dense
              v-model="person.PersonnelID"
              @change="updatePeople"
              :items="this.$store.state.personnels"
              item-value="ID"
              item-text="Name"
              menu-props="auto"
              label="Personel"
              hide-details
              prepend-icon="mdi-account-outline"
              single-line
            >
              <template v-slot:no-data>
                <small class="m-3">
                  <b>Kullanılabilecek hiç Personel yok!</b>
                </small>
              </template>
            </v-select>
            <v-textarea
              name="input-7-1"
              filled
              v-model="person.Information"
              @change="updatePeople"
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
            <v-btn
              color="error"
              width="100px"
              class="ml-5"
              depressed
              @click="deletePeople"
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

    selectedPersonIndex: {
      type: Number,
      default: 0,
    },
    person: {
      type: Object,
      default() {
        return {
          ID: 0,
          Name: "",
          Phone: "",
          SectorID: "",
          Latitude: "",
          Longitude: "",
          Address: "",
          Role: false,
          PersonnelID: 0,
          Information: "",
        };
      },
    },
  },
  data() {
    return {
      isAuthUserAdmin: localStorage.getItem("role") === "true",
      isLoading: false,
    };
  },
  methods: {
    async deletePeople() {
      if (
        confirm(
          this.person.Name +
            " adlı kişinin silinmesini gerçekten istiyor musun?"
        )
      ) {
        this.isLoading = true;
        await this.axios
          .delete("/delete-people", {
            params: {
              PeopleID: this.person.ID,
            },
          })
          .then(() => {
            this.$emit("deletedPeople", this.person.ID);
            this.$emit("closeDialog");
          })
          .catch((err) => {
            console.log(err);
          });
        this.isLoading = false;
      }
    },
    async updatePeople() {
      this.isLoading = true;
      await this.axios
        .put("/update-people", {
          PeopleID: this.person.ID,
          Name: this.person.Name,
          PersonnelID: this.person.PersonnelID,
          Latitude: this.person.Latitude,
          Longitude: this.person.Longitude,
          SectorID: this.person.SectorID,
          Address: this.person.Address,
          Role: this.person.Role,
          Phone: this.person.Phone,
          Information: this.person.Information,
        })
        .then(() => {
          this.$emit("updatedPeople", this.person.ID, this.person);
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
