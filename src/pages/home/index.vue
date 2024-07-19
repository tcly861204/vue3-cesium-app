<template>
  <section class="w-full h-full" ref="container" />
</template>
<script setup>
import * as Cesium from 'cesium'
import { ref, onMounted, onUnmounted } from 'vue'
import { defaultAccessToken } from '@/libs/const'
import { addEvent, removeEvent } from '@/libs/utils'
const container = ref(null)
const viewer = ref(null)
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
onMounted(() => {
  viewer.value = new Cesium.Viewer(container.value, {
    // 是否显示信息窗口
    infoBox: false,
    // 是否显示查询按钮
    geocoder: false,
    // 不显示home按钮
    homeButton: false,
    // 控制查看器的显示模式
    sceneModePicker: true,
    sceneMode: Cesium.SceneMode.SCENE3D,
    // 是否显示图层选择
    baseLayerPicker: true,
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
  viewer.value.cesiumWidget.creditContainer.style.display = 'none'

  // 监听点击事件
  addEvent(viewer.value, (click) => {
    // 获取点击位置的世界坐标
    const cartesian = viewer.value.scene.pickPosition(click.position)
    if (Cesium.defined(cartesian)) {
      // 转换为经纬度
      const cartographic =
        viewer.value.scene.globe.ellipsoid.cartesianToCartographic(cartesian)
      const longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
      const latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
      const height = viewer.value.scene.globe.getHeight(cartographic)
      // 输出点击的经纬度和高度
      console.log(
        `Longitude: ${longitudeString}, Latitude: ${latitudeString}, Height: ${height}`
      )
      console.log(Math.round(viewer.value.camera.positionCartographic.height))
      viewer.value.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          longitudeString,
          latitudeString,
          8000.0
        ),
        duration: 2.0
      })
    }
  })
})
onUnmounted(() => {
  removeEvent(viewer.value)
  viewer.value && viewer.value.destroy()
})
</script>
