<template>
  <div>
    <GmapMap
      :center="{ lat: 37.783333, lng: 29.094715 }"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 93vh"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="
          google && new google.maps.LatLng(item.latitude, item.longitude)
        "
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [],
    };
  },
};
</script>

<style></style>
