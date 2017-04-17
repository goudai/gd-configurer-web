import React, {Component} from 'react';
import {Row, Col, Card, Icon, Table} from "antd";
import {connect} from 'dva';
import ReactEcharts from 'echarts-for-react';
const Column = Table.Column;

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let {dispatch, userChart} = this.props

    let userChartOption = {
      tooltip: {},
      legend: {
        data: ['注册人数']
      },
      xAxis: {
        data: userChart ? userChart.chartLabel : []
      },
      yAxis: {},
      series: [
        {
          name: '注册人数',
          type: 'line',
          data: userChart ? userChart.userCount : []
        }]
    };

    const dataSource = [{
      type: '总人数',
      count: 12567
    }, {
      type: '特级代理数',
      count: 232,
    }, {
      type: '一级代理数',
      count: 647,
    }, {
      type: '二级代理数',
      count: 2268,
    }, {
      type: '三级代理数',
      count: 8900,
    }];

    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              style={{height: 400}}
              title={<span><Icon type="user"/> 团队概况</span>}
            >
              <Table
                dataSource={dataSource}
                rowKey={(record) => record.type}
                pagination={false}
                size="small"
              >
                <Column dataIndex="type" title="成员类型"/>
                <Column dataIndex="count" title="数量"/>
              </Table>
            </Card>
          </Col>
          <Col span={8} style={{height: 400}}>
            <Card
              style={{height: 400}}
              title={<span><Icon type="rocket"/> 营收概况</span>}
            >
              Card content
            </Card>
          </Col>
          <Col span={8} style={{height: 400}}>
            <Card
              style={{height: 400}}
              title={<span><Icon type="edit"/> 待处理</span>}
            >
              Card content
            </Card>
          </Col>
        </Row>

        <Row style={{marginTop: 16}}>
          <Col span={24}>
            <Card title={<span><Icon type="line-chart"/> 注册人数</span>}>
              {/*<ReactEcharts
                option={userChartOption}
                onChartReady={() => {
                  dispatch({
                    type: 'dashboard/userChart'
                  })
                }}
              />*/}
            </Card>
          </Col>
        </Row>

      </div>
    )
  }

}

export default connect(state => {
  return {
    loading: state.loading.models.user,
    ...state.dashboard
  }
})(Dashboard);
