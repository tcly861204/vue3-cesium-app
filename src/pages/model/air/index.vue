<template>
  <section class="w-full h-full" ref="container" />
</template>
<script setup>
import * as Cesium from 'cesium'
import { ref, onMounted } from 'vue'
import { defaultAccessToken, PUBLIC_PATH } from '@/libs/const'
Cesium.Ion.defaultAccessToken = defaultAccessToken
const container = ref(null);
onMounted(() => {
  const viewer = new Cesium.Viewer(container.value, {
    infoBox: false,
    selectionIndicator: false,
    shadows: true,
    shouldAnimate: true,
  })
  const createModel = (url, height) => {
    viewer.entities.removeAll();
    const position = Cesium.Cartesian3.fromDegrees(
      -123.0744619,
      44.0503706,
      height
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    );
    const entity = viewer.entities.add({
      name: url,
      position: position,
      orientation: orientation,
      model: {
        uri: url,
        minimumPixelSize: 128,
        maximumScale: 20000,
      },
    });
    viewer.trackedEntity = entity;
  }
  createModel(
    PUBLIC_PATH + "/public/models/Cesium_Air.glb",
    5000.0
  )
})
</script>