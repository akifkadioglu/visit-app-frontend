<template>
  <div class="col-sm-6">
    <v-card max-height="85vh" class="scroll">
      <v-card-title primary-title>
        <div>{{ header }}</div>
      </v-card-title>
      <v-card-subtitle>
        {{ countText }}
        {{ people.length }}
      </v-card-subtitle>
      <v-list-item
        two-line
        v-for="(item, index) in people"
        :key="index"
        @click="$emit('selectSomeone', item.ID)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ item.Name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.Information }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: "",
    },
    countText: {
      type: String,
      default: "",
    },
    people: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style></style>
