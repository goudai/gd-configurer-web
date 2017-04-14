import React, {PropTypes} from "react";
import {connect} from "dva";
import {Layout, Menu, Icon, Switch, Row, Popover, BackTop} from "antd";
import {config, classnames} from "../../utils";
import {Link} from "dva/router";
import Menus from "./Menus";
import styles from "./App.less";

const {Header, Sider, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu

class App extends React.Component {

  render() {

    let {children, location, dispatch, user, isSiderFolded, isDarkTheme, isMobile, isPopoverMenuVisible} = this.props

    const handleChangeTheme = () => dispatch({type: 'app/changeTheme'})

    const handleClickMenu = e => e.key === 'logout' && dispatch({type: 'app/logout'})

    const handleFoldSider = () => dispatch({type: 'app/foldSider'})

    const handlePopoverSwitch = () => dispatch({type: 'app/switchMenuPopover'})

    const siderMenusProps = {
      isSiderFolded,
      isDarkTheme,
      location
    }

    const headerMenusProps = {
      isSiderFolded: false,
      isDarkTheme: false,
      isMobile,
      dispatch,
      location
    }

    return (
      <div className={styles.app}>
        <Layout className={classnames(styles.layout)}>
          {
            !isMobile &&
            <Sider
              trigger={null}
              collapsible
              collapsed={isSiderFolded}
              className={classnames(styles.sider, {
                [styles['sider-light']]: !isDarkTheme,
                [styles['sider-dark']]: isDarkTheme
              })}
            >
              <Layout>
                <Header>
                  <Link to='/'>
                    <div className={styles.logo}>
                      <img src={config.logoSrc}/>
                      {isSiderFolded ? '' : <span>{config.logoText}</span>}
                    </div>
                  </Link>
                </Header>
                <Content>
                  <Menus {...siderMenusProps} className={styles.menus}/>
                </Content>
                <Footer>
                  {!isSiderFolded &&
                  <div className={styles.theme}>
                    <span><Icon type='bulb'/>切换主题</span>
                    <Switch onChange={handleChangeTheme} defaultChecked={isDarkTheme} checkedChildren='黑' unCheckedChildren='白'/>
                  </div>
                  }
                </Footer>
              </Layout>
            </Sider>
          }
          <Layout>
            <Header className={styles.header}>
              <Row type="flex" justify="space-between">
                {isMobile ?
                  <Popover
                    placement='bottomLeft' onVisibleChange={handlePopoverSwitch}
                    overlayClassName={styles.popover}
                    visible={isPopoverMenuVisible} trigger='click'
                    content={<Menus {...headerMenusProps} />}
                  >
                    <div>
                      <Icon type='bars'/>
                    </div>
                  </Popover>
                  :
                  <div className={styles.trigger} onClick={handleFoldSider}>
                    <Icon type={isSiderFolded ? 'menu-unfold' : 'menu-fold'}/>
                  </div>
                }
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

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  isSiderFolded: PropTypes.bool,
  isDarkTheme: PropTypes.bool,
  isPopoverMenuVisible: PropTypes.bool
}

export default connect(state => {
  return {
    ...state.app
  }
})(App)
