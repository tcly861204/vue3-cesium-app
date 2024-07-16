export default [
  {
    path: '/home',
    key: 'home',
    icon: 'icon-apps',
    title: '首页',
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
        title: '飞机模型'
      }
    ]
  }
]