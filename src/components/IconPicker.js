import React from "react";
import {Row, Col, Icon, Modal} from "antd";
import styles from "./IconPicker.css";

const iconTypes = [
  'paper-clip',
  'user',
  'tablet',
  'appstore-o',
  'cloud-o',
  'tag-o',
  'star-o',
  'heart-o',
  'message',
  'pay-circle-o',
  'coffee',
  'safety',
  'wallet',
  'check-circle-o'
]

class IconPicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showPickerModal: false
    }
  }

  changeHandler = record => {
    this.setState({showPickerModal: false});
    this.props.onChange(record)
  }

  pickHandler = () => {
    this.setState({showPickerModal: true});
  }

  cancelHandler = () => {
    this.setState({showPickerModal: false});
  }

  render() {
    const value = this.props.value

    return (
      <div>
        <Modal visible={this.state.showPickerModal} footer={null} title="请为您的应用选择一个Icon" onCancel={this.cancelHandler}>
          <Row gutter={16}>
            {iconTypes.map(record =>
              <Col className={styles.content} md={6} lg={4} onClick={() => this.changeHandler(record)}>
                <div className={styles.icon}>
                  <Icon type={record}/>
                </div>
                <span className={styles.text}>{record}</span>
              </Col>
            )}
          </Row>
        </Modal>
        <div>{value && <Icon type={value}/>} <a onClick={this.pickHandler}>点击选择</a></div>

      </div>
    )
  }

}

export default IconPicker
