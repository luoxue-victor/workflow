import { Card, Button, message } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons';
import React from 'react';

const style = {
  width: 300, 
  display: 'inline-block',
  margin: '10px',
  float: 'left'
}

const run = () => {
  message.success('项目运行')
}

export default () => (
  <>
    <Card title="开发" extra={<a href="#">More</a>} style={style}>
      <CaretRightOutlined onClick={run} />
    </Card>
    <Card title="Mock" extra={<a href="#">More</a>} style={style}>
      <Button type="primary">开启</Button>
    </Card>
    <Card title="测试" extra={<a href="#">More</a>} style={style}>
      
    </Card>
    <Card title="Push" extra={<a href="#">More</a>} style={style}>
      
    </Card>
  </>
)