<template>
  <section class="w-full h-full" ref="container" />
</template>
<script setup>
import * as Cesium from 'cesium'
import { ref, onMounted } from 'vue'
import { defaultAccessToken } from '@/libs/const'
// 设置Token
Cesium.Ion.defaultAccessToken = defaultAccessToken
// 设置默认视角(中国)， 通过经纬度设置
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  // 西边的经度
  89.5,
  // 南边维度
  20.4,
  // 东边经度
  110.4,
  // 北边维度
  61.2
)
const container = ref(null)
onMounted(() => {
  const viewer = new Cesium.Viewer(container.value, {
    // 是否显示信息窗口
    infoBox: false,
    // 是否显示查询按钮
    geocoder: false,
    // 不显示home按钮
    homeButton: false,
    // 控制查看器的显示模式
    sceneModePicker: false,
    sceneMode: Cesium.SceneMode.SCENE3D,
    // 是否显示图层选择
    baseLayerPicker: false,
    // 是否显示帮助按钮
    navigationHelpButton: false,
    // 是否播放动画
    animation: false,
    // 是否显示时间轴
    timeline: false,
    // 是否显示全屏按钮
    fullscreenButton: false
  })
  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = 'none'
})
</script>
