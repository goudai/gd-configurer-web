import React, {PropTypes} from "react";
import {connect} from "dva";
import {Button, Row, Form, Input, Icon, Alert} from "antd";
import {config} from "../utils";
import styles from "./Login.less";

const FormItem = Form.Item

function Login({form, dispatch, login, location, loading}) {

  const {getFieldDecorator, validateFieldsAndScroll} = form

  function loginHandler() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'login/login', payload: values})
    })
  }

  document.onkeyup = e => e.keyCode === 13 && loginHandler()

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img src={config.logoSrc}/>
        <span>{config.logoText}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请填写用户名'
              }
            ]
          })(<Input size='large' addonBefore={<Icon type="user"/>} placeholder='用户名'/>)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码'
              }
            ]
          })(<Input size='large' type='password' addonBefore={<Icon type="lock"/>} placeholder='密码'/>)}
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={loginHandler} loading={loading}>
            登录
          </Button>
        </Row>
        <p>
          <span>账号：admin</span>
          <span>密码：admin</span>
        </p>
      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool
}

export default connect(state => {
  return {
    ...state.login,
    loading: state.loading.models.login,
  }
})(Form.create()(Login))
