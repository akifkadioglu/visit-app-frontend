<template>
  <div>
    <div class="filter-button">
      <v-btn fab depressed dark @click="$emit('scale')">
        <v-icon dark>mdi-filter</v-icon>
      </v-btn>
    </div>
    <transition name="fade" mode="in-out">
      <div class="filter" v-if="height > 0">
        <v-card :height="height" width="300" class="scroll">
          <v-card-title primary-title>
            <div>Sektörleri Filtrele</div>
          </v-card-title>
          <v-card-text>
            <v-list-item
              v-for="(item, index) in $store.state.sectors"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.Name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.Information }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox @click="$emit('filterSector', item.ID)" />
              </v-list-item-action>
            </v-list-item>
          </v-card-text>
          <v-card-actions class="filter-action">
            <v-btn text color="error" @click="$emit('scale')">Kapat</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.filter {
  position: fixed;
  right: 0;
  bottom: 0;
}
.filter-button {
  position: fixed;
  right: 2px;
  bottom: 200px;
}
.filter-action {
  position: fixed;
  width: 300px;
  right: 0;
  bottom: 0;
  background: white;
}
</style>
