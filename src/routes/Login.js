import React, {PropTypes} from "react";
import {connect} from "dva";
import {Button, Row, Form, Input, Spin, Icon, Alert} from "antd";
import {config} from "../utils";
import styles from "./Login.less";

const FormItem = Form.Item

function Login({form, dispatch, app, location}) {

	const {getFieldDecorator, validateFieldsAndScroll} = form

	const {login, loading, loginButtonLoading, loginMessage, user, isSiderFolded, isDarkTheme, isMobile, isPopoverMenuVisible} = app

	function loginHandler() {
		validateFieldsAndScroll((errors, values) => {
			if (errors) {
				return
			}
			dispatch({type: 'app/login', payload: values})
		})
	}

	document.onkeyup = e => e.keyCode === 13 && loginHandler()

	return (
		<div className={styles.spin}>
			<Spin tip='加载用户信息...' spinning={loading} size='large'>
				<div className={styles.form}>
					<div className={styles.logo}>
						<img src={config.logoSrc}/>
						<span>{config.logoText}</span>
					</div>
					{loginMessage && <Alert message={loginMessage} type="error" />}
					<form>
						<FormItem hasFeedback>
							{getFieldDecorator('phone', {
								rules: [
									{
										required: true,
										message: '请填写登陆手机'
									}
								]
							})(<Input size='large' addonBefore={<Icon type="user" />} placeholder='用户名'/>)}
						</FormItem>
						<FormItem hasFeedback>
							{getFieldDecorator('password', {
								rules: [
									{
										required: true,
										message: '请填写密码'
									}
								]
							})(<Input size='large' type='password' addonBefore={<Icon type="lock" />} placeholder='密码'/>)}
						</FormItem>
						<Row>
							<Button type='primary' size='large' onClick={loginHandler} loading={loginButtonLoading}>
								登录
							</Button>
						</Row>
						<p>
							<span>账号：11122223333</span>
							<span>密码：1</span>
						</p>
					</form>
				</div>
			</Spin>
		</div>
	)
}

Login.propTypes = {
	form: PropTypes.object,
	loginButtonLoading: PropTypes.bool
}

export default connect(({app}) => ({app}))(Form.create()(Login))
