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
          <v-card-title primary-title> Ziyaret Edilenlere Ekle </v-card-title>
          <div></div>
        </div>

        <div class="add-visit-form">
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
                  v-model="form.with"
                  :items="items"
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
                  v-model="form.date"
                  class="form-control mt-3"
                  type="date"
                />
                <input
                  v-model="form.time"
                  class="form-control mt-3"
                  type="time"
                />
                <div class="mt-3" style="text-align: end">
                  <v-btn color="primary" elevation="0">Gönder</v-btn>
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
          name: "title",
          description: "description",
        };
      },
    },
  },
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      form: {
        with: [],
        description: "",
        date: "",
        time: "",
      },
    };
  },
};
</script>

<style scoped>
.add-visit-form {
  display: grid;
  place-items: center;
}
.title-overflow {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
