import React from "react";
import {connect} from 'dva';

class ShiroProvider extends React.Component {

  constructor(props) {
    super(props)
  }

  getChildContext() {
    let shiro = this.props.shiro || {permissions: []}
    return {
      shiro
    }
  }

  render() {
   return React.Children.only(this.props.children)
  }
}

ShiroProvider.childContextTypes = {
  shiro: React.PropTypes.object
}

ShiroProvider.propTypes = {
  shiro: React.PropTypes.object
}

//export default ShiroProvider


export default connect(state => {
  return {
    shiro: state.app && state.app.shiro
  }
})(ShiroProvider);
