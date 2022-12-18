<template>
  <div>
    <v-bottom-sheet v-model="addToVisits" inset persistent>
      <v-sheet height="100vh">
        <v-btn
          class="mt-3 ml-3"
          icon
          color="error"
          @click="$emit('closeSheet')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="navbar">
          <div></div>
          <v-card-title primary-title>Ziyaret Edilenlere Ekle </v-card-title>
          <div></div>
        </div>

        <div class="center">
          <v-card width="500px" elevation="0">
            <v-card-title class="title-overflow" primary-title>
              {{ user.name }}
            </v-card-title>
            <v-card-subtitle class="title-overflow" primary-title>
              {{ user.description }}
            </v-card-subtitle>
            <v-card-text>
              <v-form ref="form">
                <v-select
                  v-model="form.personnels"
                  item-value="ID"
                  item-text="Name"
                  :items="$store.state.personnels.filter((x) => x.ID != userId)"
                  attach
                  chips
                  placeholder="Kimlerle beraberdin"
                  multiple
                >
                </v-select>
                <v-textarea
                  v-model="form.description"
                  counter
                  maxlength="250"
                  placeholder="Ziyaret açıklaması"
                  hint="Ziyaretin nasıl geçtiğine dair açıklama yazınız"
                ></v-textarea>
                <input
                  v-model="form.VisitedAt"
                  class="form-control mt-3"
                  type="datetime-local"
                />
                <div class="mt-3" style="text-align: end">
                  <v-progress-circular
                    v-if="isLoading"
                    indeterminate
                    color="primary"
                  />
                  <v-btn
                    v-else
                    @click="postVisit"
                    color="primary"
                    elevation="0"
                  >
                    Gönder
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    addToVisits: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default() {
        return {
          id: 0,
          name: "title",
          description: "description",
        };
      },
    },
  },
  data() {
    return {
      form: {
        personnels: [],
        description: "",
        VisitedAt: this.returnDate(),
      },
      isLoading: false,
      userId: this.$helpers.returnDecryptItem(localStorage.getItem("user_id")),
    };
  },
  methods: {
    decreaseTime(vtime) {
      var date = new Date(vtime);
      return date.toISOString().substring(0, 16);
    },
    returnDate() {
      var date = new Date();
      date.setTime(date.getTime() + 3 * 60 * 1000 + 10800000);
      return date.toISOString().substring(0, 16);
    },
    async postVisit() {
      this.isLoading = true;
      await this.axios
        .post("visit-someone", {
          Personnels: this.form.personnels,
          Description: this.form.description,
          VisitedAt: this.form.VisitedAt,
          PeopleID: this.user.id,
        })
        .then((result) => {
          this.$emit("addedVisit", result.data.visits, this.form.personnels);
          this.form = {
            personnels: [],
            description: "",
            VisitedAt: this.decreaseTime(this.returnDate()),
          };

          this.$emit("closeSheet");
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
.title-overflow {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
