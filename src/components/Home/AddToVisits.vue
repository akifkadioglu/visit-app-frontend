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
              Esnaf adı
            </v-card-title>
            <v-card-subtitle class="title-overflow" primary-title>
              Hakkında açıklama Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Neque quaerat delectus, ipsa reprehenderit,
              quidem impedit libero sed veniam quam quae sunt illum corrupti
              error pariatur ea molestias qui aut ratione nisi asperiores
              incidunt vero ipsum provident minima? Mollitia cumque numquam
              illum repudiandae fugiat consequatur atque dolorum fuga
              perspiciatis. Sapiente, illum.
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
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 3">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-if="index === 3" class="grey--text text-caption">
                      (+{{ value.length - 3 }} kişi daha)
                    </span>
                  </template>
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
  },
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      form: {
        with: [],
        description: "",
        date: "",
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