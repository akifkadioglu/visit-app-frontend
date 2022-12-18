<template>
  <div class="col-sm-3">
    <v-card
      class="mx-auto scroll rounded-lg"
      max-width="400"
      max-height="90vh"
      tile
      outlined 
    >
      <v-card-title>{{ header.toUpperCase() }}</v-card-title>
      <v-list-item
        @click="$emit('openSheet', item)"
        three-line
        v-for="(item, index) in items"
        :key="index"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.Name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.Information }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ item.Phone }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    header: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
