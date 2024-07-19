import * as Cesium from 'cesium'
export const findMenuItem = (menu, key) => {
  let find = null
  menu.map((item) => {
    if (item.key === key) {
      find = item
    }
    if (find === null && item.children && item.children.length) {
      find = findMenuItem(item.children, key)
    }
    return item
  })
  return find
}

export const addEvent = (viewer, callback) => {
  viewer.screenSpaceEventHandler.setInputAction(
    callback,
    Cesium.ScreenSpaceEventType.LEFT_CLICK
  )
}
export const removeEvent = (viewer) => {
  viewer.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_CLICK
  )
}
