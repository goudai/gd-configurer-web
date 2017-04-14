import React, {Component} from "react";
import {Modal, Form, Input, Select} from "antd";
const Option = Select.Option

const FormItem = Form.Item;

function UserModifyUserRankModal({dispatch, visible, user = {}, form, loading}) {

	const {validateFields, getFieldDecorator} = form

	const okHandler = () => {
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'user/modifyUserRank',
          payload: {...values, id: user.id}
        })
      }
    })
  }

  const cancelHandler = () => {
    dispatch({
      type: 'user/hideModal'
    })
  }

	return (
		<Modal
			title="用户编辑"
			visible={visible}
			onOk={okHandler}
			onCancel={cancelHandler}
      confirmLoading={loading}
		>

			<Form horizontal>
				<FormItem label="昵称">
					{getFieldDecorator('nickname', {})(<Input />)}
				</FormItem>
				<FormItem label="用户等级">
          {getFieldDecorator('userRank', {
          	rules: [{required:true, message: '必须选择一个用户等级'}]
          })(
	          <Select
		          placeholder="代理等级"
		          allowClear
		          style={{width: 200}}
		          size="default"
	          >
		          <Option value="V0">普通代理</Option>
		          <Option value="V1">三级代理</Option>
		          <Option value="V2">二级代理</Option>
		          <Option value="V3">一级代理</Option>
		          <Option value="V4">总代理</Option>
	          </Select>
          )}
				</FormItem>
			</Form>
		</Modal>
	)

}

export default Form.create({

  mapPropsToFields({user = {}}) {
    return {
      nickname: {
        value: user.nickname
      },
      userRank: {
      	value: user.userRank
      }
    };
  }


})(UserModifyUserRankModal)