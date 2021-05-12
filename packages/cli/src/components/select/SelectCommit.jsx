import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function ({onChange}) {
  return <div>
    <span>选择类型：</span>
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      defaultValue="feat"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="feat">1. feat: 新增feature</Option>
      <Option value="fix">2. fix: 修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG</Option>
      <Option value="docs">3. docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等</Option>
      <Option value="style">4. style: 仅仅修改了空格、格式缩进、变量名等等，不改变代码逻辑</Option>
      <Option value="refactor">5. refactor: 代码重构，没有加新功能或者修复bug</Option>
      <Option value="perf">6. perf: 优化相关，比如提升性能、体验</Option>
      <Option value="test">7. test: 测试用例，包括单元测试、集成测试等</Option>
      <Option value="chore">8. chore: 改变构建流程、或者增加依赖库、工具等</Option>
      <Option value="revert">9. revert: 回滚到上一个版本</Option>
      <Option value="merge">10. merge: 代码合并</Option>
      <Option value="sync">11. sync: 同步主线或分支的Bug </Option>
    </Select>
  </div>
}