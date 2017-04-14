import React from "react";
import {connect} from "dva";
import {Layout, Menu, Icon, Row, BackTop} from "antd";
import {config, classnames} from "../../utils";
import {Link} from "dva/router";
import Menus from "./Menus";
import styles from "./AppLayout.css";

const {Header, Sider, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu

class AppLayout extends React.Component {

  state = {
    collapsed: false,
    mode: 'inline',
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  render() {

    let {children, location, dispatch, user} = this.props

    const handleClickMenu = e => e.key === 'logout' && dispatch({type: 'app/logout'})

    return (
      <div className={styles.root}>
        <Layout className={classnames(styles.layout)}>

          <Sider
            className={styles.sider}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Link to='/'>
              <div className={styles.logo}>
                <img src={config.logoSrc}/>
                {this.state.collapsed ? '' : <span>{config.logoText}</span>}
              </div>
            </Link>
            <Menus location={location} className={styles.menu}/>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <Row type="flex" justify="space-between">
                <Menu className='header-menu' mode='horizontal' onClick={handleClickMenu}>
                  <SubMenu title={<span> <Icon type='user'/>{user && user.nickname} </span>}>
                    <Menu.Item key='logout'>
                      <Icon type='logout'/> 注销
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Row>
            </Header>
            <Content className={styles.content}>
              {children}
            </Content>
            <Footer className={styles.footer}>
              {config.footerText}
            </Footer>
          </Layout>
        </Layout>
        <BackTop />
      </div>
    )
  }
}

export default connect(state => {
  return {
    ...state.layout
  }
})(AppLayout)
