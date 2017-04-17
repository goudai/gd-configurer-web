import React from "react";
import {Table, Card, Row, Col, Icon} from "antd";
import {connect} from "dva";
import AppModal from "./AppModal";
import styles from "./AppList.css";
const Column = Table.Column

function AppList({dispatch, viewType = 'list', list, loading, record}) {

  const createHandler = () => {
    dispatch({
      type: 'app/toCreate'
    })
  }

  const modifyHandler = (record) => {
    dispatch({
      type: 'app/toModify',
      payload: record
    })
  }

  return (
    <div>
      <AppModal
        dispatch={dispatch}
        visible={viewType === 'create' || viewType === 'modify'}
        viewType={viewType}
        record={record}
        loading={loading}
      />
      <Row gutter={16}>
        {
          list.map(record =>
            <Col key={record.name} span={4}>
              <Card className={styles.card} onClick={modifyHandler.bind(null, record)}>
                <div className={styles.content}>
                  <div className={styles.icon}><Icon type="home"/></div>
                  <span>{record.name}</span>
                </div>
              </Card>
            </Col>
          )
        }
        <Col span={4}>
          <Card className={styles.card} onClick={createHandler}>
            <div className={styles.content}>
              <div className={styles.icon}><Icon type="plus"/></div>
              <span>新增</span>
            </div>
          </Card>
        </Col>


      </Row>

    </div>
  )

}

export default connect(state => {
  return {
    loading: state.loading.models.app,
    ...state.app
  }
})(AppList);
