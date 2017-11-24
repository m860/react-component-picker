# react-component-picker

<!-- badge -->
[![npm version](https://img.shields.io/npm/v/react-component-picker.svg)](https://www.npmjs.com/package/react-component-picker)
[![npm license](https://img.shields.io/npm/l/react-component-picker.svg)](https://www.npmjs.com/package/react-component-picker)
[![npm download](https://img.shields.io/npm/dm/react-component-picker.svg)](https://www.npmjs.com/package/react-component-picker)
[![npm download](https://img.shields.io/npm/dt/react-component-picker.svg)](https://www.npmjs.com/package/react-component-picker)
<!-- endbadge -->

[Documentation & Examples](./API.md)

## Install & Usage

```bash
$ npm i react-component-picker --save
```

```javascript
import 'react-component-picker/css/picker.css'
import {HistoryTextInputPicker} from 'react-component-picker'
```

## picker

### HistoryTextInputPicker

- 当focus时,如果有history就展示history的内容供选择,实现快速输入;如果没有history就不展示
- 当blur时,将输入的值和history进行比较,如果存在就把输入值排在第一个,如果不存在就加入到history的第一个
- 可以配置history的个数
- 回车默认选中第一个历史数据

### AutoCompletePicker

- 根据用户输入自动带出匹配数据
- 可以配置展示匹配数据的展示个数
- 支持自定义样式
- 回车默认选中第一个匹配的数据

### DropDownPicker

- 支持复杂数据源
- 支持自定义样式
- 支持单选,多选

### DataTablePicker

- 支持DataTable(可分页)数据
- 支持自定义样式
- 支持单选,多选

### CascadePicker

- 支持级联数据
- 支持自定义样式
- 仅支持单选