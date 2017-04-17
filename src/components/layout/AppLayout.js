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

    const handleClickMenu = e => e.key === 'logout' && dispatch({type: 'login/logout'})

    return (
      <div className={styles.root}>
        <Layout className={styles.layout}>
          <Sider
            className={styles.sider}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >

            <Link to='/'>
              <Row className={styles.logo} type="flex" justify="center" align="middle" gutter={8}>
                <div className={styles.image}><img src={config.logoSrc}/></div>
                {this.state.collapsed ? '' : <span>{config.logoText}</span>}
              </Row>
            </Link>
            <Menus location={location}/>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <Row type="flex" justify="end">
                <Menu mode='horizontal' onClick={handleClickMenu}>
                  <SubMenu title={<span> <Icon type='user'/>{user && user.nickname} </span>}>
                    <Menu.Item key='logout'>
                      <Icon type='logout'/> 注销
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Row>
            </Header>
            <Content className={styles.content}>
              <div className={styles.inner}>
                {children}
              </div>
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
