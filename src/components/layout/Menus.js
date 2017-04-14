import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import { menu } from '../../utils'

const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray, isSiderFolded, parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon && <Icon type={item.icon} />}{isSiderFolded && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, isSiderFolded, parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {isSiderFolded && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Menus ({ isSiderFolded, isDarkTheme, location, isMobile, className, dispatch }) {
  const menuItems = getMenus(menu, isSiderFolded)

  const handlePopoverSwitch =  () => {
    if(isMobile) {
      dispatch({type: 'app/switchMenuPopover'})
    }
  }

  return (
    <Menu
      className={className}
      mode={isSiderFolded ? 'vertical' : 'inline'}
      theme={isDarkTheme ? 'dark' : 'light'}
      onClick={handlePopoverSwitch}
      defaultOpenKeys={isMobile ? menuItems.map(item => item.key) : []}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'dashboard']}>
      {menuItems}
    </Menu>
  )
}

export default Menus
