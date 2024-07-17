import * as Cesium from 'cesium'
import { ref } from 'vue'

const useModel = () => {
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
  return {
    viewer,
    createModel
  }
}

export default useModel
