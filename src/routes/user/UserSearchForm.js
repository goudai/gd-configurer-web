import React from "react";
import {Form, Input, Button, DatePicker, Select, Icon} from "antd";
import moment from "moment";

const FormItem = Form.Item;
const Option = Select.Option;

function UserSearchForm({dispatch, form}) {

  const {getFieldDecorator, validateFields} = form

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((errors, values) => {
      if (!errors) {
        const payload = {
          ...values,
          'registerTimeGTE': values.registerTimeGTE && values.registerTimeGTE.format('YYYY-MM-DD HH:mm:ss'),
          'registerTimeLT': values.registerTimeLT && values.registerTimeLT.format('YYYY-MM-DD HH:mm:ss'),
          pageNumber: 1
        }

        dispatch({
          type: 'user/query',
          payload
        })
      }
    });
  }

  return (
    <Form inline className="ant-advanced-search-form" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('nicknameLK')(<Input placeholder="昵称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('phoneEQ')(<Input placeholder="手机号"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('userRankEQ')(
          <Select
            placeholder="代理等级"
            allowClear
            style={{width: 200}}
            size="default"
          >
            <Option value="0">普通代理</Option>
            <Option value="1">三级代理</Option>
            <Option value="2">二级代理</Option>
            <Option value="3">一级代理</Option>
            <Option value="4">总代理</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('registerTimeGTE')(
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="注册时间起"/>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('registerTimeLT')(
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="注册时间止"/>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('parentNickname')(<Input placeholder="上级昵称"/>)}
      </FormItem>

      <FormItem>
        {getFieldDecorator('isFrozenEQ')(
          <Select
            placeholder="是否冻结"
            allowClear
            style={{width: 200}}
            size="default">
            <Option value="1">是</Option>
            <Option value="0">否</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          icon="search"
          size="default"
        >查询</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(UserSearchForm);
