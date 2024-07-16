export default [
  {
    path: '/home',
    key: 'home',
    icon: 'icon-apps',
    title: '首页'
  },
  {
    path: '/model',
    key: 'model',
    title: '模型',
    icon: 'icon-experiment',
    children: [
      {
        path: '/model/air',
        key: 'model_air',
        title: '飞机'
      },
      {
        path: '/model/drone',
        key: 'model_drone',
        title: '无人机'
      },
      {
        path: '/model/ground-vehicle',
        key: 'model_ground-vehicle',
        title: '地面车辆'
      },
      {
        path: '/model/hot-air-balloon',
        key: 'model_hot-air-balloon',
        title: '热气球'
      }
    ]
  }
]
