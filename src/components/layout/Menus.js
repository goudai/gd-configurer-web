import React from "react";
import {Menu, Icon} from "antd";
import {Link} from "dva/router";
import {menu} from "../../utils";

function Menus({location, mode, className, dispatch}) {

  let defaultSelectedKeys = [location.pathname.split('/')[location.pathname.split('/').length - 1] || 'dashboard']

  return (
    <Menu
      className={className}
      mode={mode}
      theme="light"
      defaultSelectedKeys={defaultSelectedKeys}>
      {
        menu.map(item => {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon}/>
                <span className="nav-text">{item.name}</span>
              </Link>
            </Menu.Item>
          )

        })
      }
    </Menu>
  )
}

export default Menus
