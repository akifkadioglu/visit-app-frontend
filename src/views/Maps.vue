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
        v-for="(item, index) in people.filter((x) =>
          selectedSectors.length > 0
            ? selectedSectors.indexOf(x.SectorID) != -1
            : true
        )"
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
    <WhichPeople @changePeople="changePeople" :hasUserPeople="hasUserPeople" />
    <FilterBySector
      :height="height"
      @scale="scale"
      @filterSector="filterBySector"
    />
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import FilterBySector from "../components/Maps/FilterCard.vue";
import WhichPeople from "../components/Maps/WhichPeople.vue";

export default {
  components: { FilterBySector, WhichPeople },
  computed: {
    google: gmapApi,
    people() {
      return this.hasUserPeople
        ? this.$store.state.userPeople
        : this.$store.state.people;
    },
  },
  data() {
    return {
      currentLocation: null,
      center: { lat: 37.783333, lng: 29.094715 },
      hasUserPeople: true,
      selectedSectors: [],
      height: 0,
    };
  },

  methods: {
    filterBySector(id) {
      let index = this.selectedSectors.indexOf(id);
      if (index == -1) {
        this.selectedSectors.push(id);
      } else {
        this.selectedSectors.splice(index, 1);
      }
    },
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