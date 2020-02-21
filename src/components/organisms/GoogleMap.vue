<template>
  <div>
    <div
      ref="map"
      class="map"
    />
  </div>
</template>

<story
  name="GoogleMap"
  group="Organisms"
  knobs="{}"
  >
  <google-map/>
</story>

<script>
import maps from '@/service/googleMaps';

export default {
  mounted () {
    const config = {
      minZoom: 5,
      zoom: 5,
      center: { lat: 51.133481, lng: 10.018343 }
    };
    maps.setup(this.$refs.map, config);
    maps.change.subscribe((e) => {
      console.log('aja', e);
    });
  }
};
</script>

<style lang="postcss" scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>
