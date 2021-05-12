import { Modal, Button } from 'antd'
import React from 'react'
import SelectCommit from '../select/SelectCommit'
import { emitCommit } from '../../lib/socket'

export default class CommitModal extends React.Component {
  state = {
    loading: false,
    visible: false,
    commitTypeValue: 'feat'
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const commitValue = this.commitRichtext.innerText.trim()

    emitCommit(this.props.pwd, commitValue)
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <style>{style}</style>
        <Modal
          visible={visible}
          title="提交 commit"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              关闭
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              提交
            </Button>
          ]}
        >
          <SelectCommit onChange={(value) => this.setState({
            commitTypeValue: value
          })}></SelectCommit>
          <div 
            ref={(ins) => {this.commitRichtext = ins}} 
            contenteditable="true"
            className="richtext">
              {`\n${this.state.commitTypeValue}：\n描述（需求点 or 原因）：\n修改内容：\n影响范围：\n是否历史问题：\nfix #ID`}
          </div>
        </Modal>
        </>
    );
  }
}

const style = `
.richtext {
  width: 100%;
}
`