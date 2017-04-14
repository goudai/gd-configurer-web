import React from "react";
import { Upload, Icon, message } from 'antd';
import styles from './ImageUpload.less'
import {config, classnames} from "../utils";

class ImageUpload extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
    this.handleChange = this.handleChange.bind(this)
  }

  beforeUpload(file) {
    if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
      message.error('仅支持jpg,png,gif图片格式');
      return false;
    }
    if (file.size / 1024 / 1024 > 4) {
      message.error('图片不能大于4MB');
      return false;
    }
    return true;
  }

  handleChange = (info) => {
    let file = info.file
    if (file.status === 'done') {
      let value = file.response.files[0].url;
      this.setState({
        value
      })
      this.props.onChange(value)
    }
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  render() {
    const value = this.state.value
    const action = `${config.apiGateway}/image/upload`

    return (
      <Upload
        className={styles.uploader}
        name="file"
        showUploadList={false}
        action={action}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {
          value ?
            <img src={value} className={styles.image} /> :
            <Icon type="plus" className={styles.trigger} />
        }
      </Upload>
    );
  }
}

export default ImageUpload