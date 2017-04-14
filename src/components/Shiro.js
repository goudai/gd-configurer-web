import React from "react";
import { Upload, Icon, message } from 'antd';
import styles from './ImageUpload.less'
import {config, classnames} from "../utils";

class Shiro extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {hasPermission} = this.props
    let renderable = true
    let shiro = this.context.shiro

    if (hasPermission) {
      if (shiro.permissions.indexOf(hasPermission) === -1) {
        renderable = false
      }
    }

    if (renderable) {
      return React.Children.only(this.props.children)
    } else {
      return null
    }

  }
}

Shiro.contextTypes = {
  shiro: React.PropTypes.object
}

Shiro.propTypes = {
  hasPermission: React.PropTypes.string
}

export default Shiro

