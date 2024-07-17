<template>
  <section class="w-full h-full" ref="container" />
</template>
<script setup>
import * as Cesium from 'cesium'
import { ref, onMounted, onUnmounted } from 'vue'
import { defaultAccessToken, PUBLIC_PATH } from '@/libs/const'
Cesium.Ion.defaultAccessToken = defaultAccessToken
const container = ref(null)
const viewer = ref(null)
const createModel = (url, height) => {
  viewer.value.entities.removeAll()
  const position = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706,
    height
  )
  const heading = Cesium.Math.toRadians(135)
  const pitch = 0
  const roll = 0
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  )
  const entity = viewer.value.entities.add({
    name: url,
    position: position,
    orientation: orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000
    }
  })
  viewer.value.trackedEntity = entity
}
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
