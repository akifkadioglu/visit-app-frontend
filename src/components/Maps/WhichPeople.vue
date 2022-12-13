<template>
  <v-tooltip left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="action-button"
        fab
        dark
        depressed
        v-bind="attrs"
        v-on="on"
        @click="$emit('changePeople')"
      >
        <v-icon dark v-if="hasUserPeople">mdi-account-switch-outline</v-icon>
        <v-icon dark v-else>mdi-account-network-outline</v-icon>
      </v-btn>
    </template>
    <span v-if="hasUserPeople">Tüm kişileri getir</span>
    <span v-else>Sadece benim kişilerimi getir</span>
  </v-tooltip>
</template>
<script>
export default {
  props: {
    hasUserPeople: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.action-button {
  position: fixed;
  top: 65px;
  right: 2px;
}
</style>
