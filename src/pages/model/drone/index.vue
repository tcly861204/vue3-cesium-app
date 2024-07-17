<template>
  <section class="w-full h-full" ref="container" />
</template>
<script setup>
import * as Cesium from 'cesium'
import { ref, onMounted, onUnmounted } from 'vue'
import { defaultAccessToken, PUBLIC_PATH } from '@/libs/const'
import useModel from '@/hooks/useModel'
Cesium.Ion.defaultAccessToken = defaultAccessToken
const { createModel, viewer } = useModel()
const container = ref(null)
onMounted(() => {
  viewer.value = new Cesium.Viewer(container.value, {
    infoBox: false,
    selectionIndicator: false,
    shadows: true,
    shouldAnimate: true
  })
  viewer.value.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      -123.0744619,
      44.0503706,
      5000.0
    ),
    duration: 5.0,
    complete: function () {
      createModel(PUBLIC_PATH + 'public/models/CesiumDrone.glb', 150.0)
    }
  })
})
onUnmounted(() => {
  viewer.value && viewer.value.destroy()
})
</script>
