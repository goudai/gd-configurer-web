import React from "react";
import {Modal, Form, Input, Select} from "antd";
import IconPicker from "../../components/IconPicker";
const Option = Select.Option

const FormItem = Form.Item;

function AppModal({dispatch, visible, record = {}, viewType, form, loading}) {

  const {validateFields, getFieldDecorator} = form

  const okHandler = () => {
    validateFields((err, values) => {
      if (!err) {
        if (viewType === 'modify') {
          dispatch({
            type: 'app/modify',
            payload: {...values, oldName: record.name}
          })
        } else { // create
          dispatch({
            type: 'app/create',
            payload: {...values}
          })
        }
      }
    })
  }

  const cancelHandler = () => {
    dispatch({
      type: 'app/hideModal'
    })
  }

  return (
    <Modal
      title={viewType === 'modify' ? '编辑' : '新增'}
      visible={visible}
      onOk={okHandler}
      onCancel={cancelHandler}
      confirmLoading={loading}
    >

      <Form horizontal>
        <FormItem label="应用名">
          {getFieldDecorator('name', {
            rules: [
              {required:true, message: '应用名必填'}
            ]
          })(<Input />)}
        </FormItem>

        <FormItem label="Icon">
          {getFieldDecorator('icon', {
            rules: [
              {required:true, message: '请选择一个Icon'}
            ]
          })(<IconPicker />)}
        </FormItem>
      </Form>
    </Modal>
  )

}

export default Form.create({

  mapPropsToFields({record = {}}) {
    return {
      name: {
        value: record.name
      },
      icon: {
        value: record.icon
      }
    };
  }

})(AppModal)