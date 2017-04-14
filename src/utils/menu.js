module.exports = [
  {
    key: 'dashboard',
    name: '首页',
    icon: 'laptop'
  },
  {
    key: 'usr',
    name: '用户管理',
    icon: 'user',
    clickable: false,
    child: [
      {
        key: 'user',
        name: '用户列表',
        icon: 'user'
      },
      {
        key: 'userTree',
        name: '组织结构',
        icon: 'share-alt'
      }
    ]
  },
  {
    key: 'project',
    name: '项目管理',
    icon: 'appstore-o'
  },
  {
    key: 'mal',
    name: '项目管理',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'product',
        name: '商品管理',
        icon: 'tags-o'
      },
      {
        key: 'order',
        name: '订单管理',
         icon: 'shopping-cart'
      }
    ]
  },
  {
    key: 'ui',
    name: 'UI组件',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'ico',
        name: 'Ico 图标'
      },
      {
        key: 'search',
        name: 'Search 搜索'
      }
    ]
  },
  {
    key: 'navigation',
    name: '测试导航',
    icon: 'setting',
    child: [
      {
        key: 'navigation1',
        name: '二级导航1'
      },
      {
        key: 'navigation2',
        name: '二级导航2',
        child: [
          {
            key: 'navigation21',
            name: '三级导航1'
          },
          {
            key: 'navigation22',
            name: '三级导航2'
          }
        ]
      }
    ]
  }
]
