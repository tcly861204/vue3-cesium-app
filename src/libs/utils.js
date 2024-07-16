export const findMenuItem = (menu, key) => {
  let find = null
  menu.map(item => {
    if (item.key === key) {
      find = item
    }
    if (find === null &&item.children && item.children.length) {
      find = findMenuItem(item.children, key)
    }
    return item
  })
  return find
}