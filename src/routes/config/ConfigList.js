import React, {Component} from "react";
import {Pagination, Table, Dropdown, Menu, Popconfirm, Icon} from "antd";
import {connect} from "dva";
import ConfigSearchForm from "./ConfigSearchForm";
import ConfigModal from "./ConfigModal";
const Column = Table.Column

function ConfigList({dispatch, viewType = 'list', list, loading, total, query, record}) {

  const showModalHandler = (record) => {
    dispatch({
      type: 'config/showModal',
      payload: record
    })
  }

  return (

    <div>

      <ConfigModal
        dispatch={dispatch}
        visible={viewType === 'create' || viewType === 'modify'}
        viewType={viewType}
        record={record}
        loading={loading}
      />

      <ConfigSearchForm
        query={query}
        dispatch={dispatch}
      />

      <Table
        dataSource={list} l
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
        size="small"
      >
        <Column dataIndex="nickname" title="昵称"/>
        <Column dataIndex="phone" title="手机"/>
        <Column dataIndex="userRank" title="用户等级"/>
        <Column dataIndex="isFrozen" title="是否冻结"/>
        <Column dataIndex="registerTime" title="注册时间"/>
        <Column title="操作" render={(text, record) => (
          <span>
                <a href="javascript:;">查看</a>
                <span className="ant-divider"/>
                <a href="javascript:;" onClick={showModalHandler.bind(null, record)}>修改等级</a>
                <span className="ant-divider"/>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <Popconfirm
                          title="确认下架?"
                          onConfirm={() => dispatch({type: 'product/on', payload: {isOn: false, id: record.id}})}
                        >
                          <a href="javascript:;">下架</a>
                        </Popconfirm>
                      </Menu.Item>
                      <Menu.Item>
                        <Popconfirm
                          title="确认上架?"
                          onConfirm={() => dispatch({type: 'product/on', payload: {isOn: true, id: record.id}})}
                        >
                          <a href="javascript:;">上架</a>
                        </Popconfirm>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <a href="javascript:;" className="ant-dropdown-link">
                    更多操作 <Icon type="down"/>
                  </a>
                </Dropdown>
              </span>
        )}
        />
      </Table>

      <Pagination
        className="ant-table-pagination"
        total={total}
        current={query.pageNumber ? parseInt(query.pageNumber) : 1}
        pageSize={query.pageSize || 20}
        showSizeChanger={true}
        onShowSizeChange={(current, pageSize) => {
          dispatch({
            type: 'user/query',
            payload: {...query, pageSize: pageSize, pageNumber: 1}
          })
        }}
        onChange={page => {
          dispatch({
            type: 'user/query',
            payload: {...query, pageNumber: parseInt(page)}
          })
        }}
        showTotal={(total, range) => `共${total}条`}
      />

    </div>
  )

}

export default connect(state => {
  return {
    loading: state.loading.models.config,
    ...state.config
  }
})(ConfigList);
