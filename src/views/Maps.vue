<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 93vh"
    >
      <GmapMarker
        :key="index"
        v-for="(item, index) in hasUserPeople
          ? $store.state.userPeople
          : $store.state.people"
        :position="
          google && new google.maps.LatLng(item.Latitude, item.Longitude)
        "
        content="Marker Başlığı"
        :clickable="true"
        :draggable="true"
        @click="seeLocation(item)"
        @mouseover="currentLocation = index"
        @mouseout="currentLocation = null"
      >
        <gmap-info-window :opened="currentLocation === index">
          <div>{{ item.Name }}</div>
          <div>{{ item.Phone }}</div>
        </gmap-info-window>
      </GmapMarker>
    </GmapMap>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="action-button"
          fab
          dark
          depressed
          v-bind="attrs"
          v-on="on"
          @click="changePeople"
        >
          <v-icon dark v-if="hasUserPeople">mdi-account-switch-outline</v-icon>
          <v-icon dark v-else>mdi-account-network-outline</v-icon>
        </v-btn>
      </template>
      <span v-if="hasUserPeople">Tüm kişileri getir</span>
      <span v-else>Sadece benim kişilerimi getir</span>
    </v-tooltip>
    <div class="filter-button">
      <v-btn fab depressed dark @click="scale">
        <v-icon dark>mdi-filter</v-icon>
      </v-btn>
    </div>
    <transition name="fade" mode="in-out">
      <div class="filter" v-if="height > 0">
        <v-card :height="height" width="300">
          <v-card-title primary-title>
            <div>Sektörleri Filtrele</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="primary" @click="scale">Kapat</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </transition>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  computed: {
    google: gmapApi,
  },
  data() {
    return {
      currentLocation: null,
      center: { lat: 37.783333, lng: 29.094715 },
      hasUserPeople: true,
      height: 0,
    };
  },

  methods: {
    scale() {
      this.height = this.height > 0 ? 0 : 500;
    },
    changePeople() {
      this.hasUserPeople = !this.hasUserPeople;
    },
    seeLocation(item) {
      window.open(
        "https://www.google.com/maps/dir/" +
          item.Latitude +
          "," +
          item.Longitude,
        "_blank"
      );
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
</style>
