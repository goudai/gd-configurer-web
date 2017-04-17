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
            <Col key={record.name} md={6} lg={4}>
              <Card
                className={styles.card}

              >
                <div className={styles.content}>
                  <div className={styles.icon}><Icon type="home"/></div>
                  <span className={styles.text}>{record.name}</span>
                  <Row gutter={16} className={styles.action}>
                    <Icon type="eye-o" onClick={() => alert('查看')}/>
                    <Icon type="edit" onClick={modifyHandler.bind(null, record)}/>
                    <Icon type="delete" onClick={() => alert('删除')}/></Row>
                </div>
              </Card>
            </Col>
          )
        }
        <Col md={6} lg={4}>
          <Card className={styles.card} onClick={createHandler}>
            <div className={styles.content}>
              <div className={styles.icon}><Icon type="plus"/></div>
              <span className={styles.text}>新增</span>
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
