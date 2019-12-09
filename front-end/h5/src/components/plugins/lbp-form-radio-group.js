/*
 * @Author: ly525
 * @Date: 2019-11-23 12:35:43
 * @LastEditors: ly525
 * @LastEditTime: 2019-11-23 19:50:57
 * @FilePath: /luban-h5/front-end/h5/src/components/plugins/lbp-form-radio-group.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: 表单单选组组件 #!en: radio group component
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

import LbpFormRadio from './lbp-form-radio.js'

function getDefaultItems () {
  // defaultItems.slice(0)[0] === defaultItems.slice(0)[0] -> true
  // Object.assign(defaultItems)[0] === Object.assign(defaultItems)[0] -> true
  // clone = (val) => JSON.parse(JSON.stringify(val))
  // clone(defaultItems)[0] === clone(defaultItems)[0] -> false
  const defaultItems = [
    {
      value: '选项A'
    },
    {
      value: '选项B'
    },
    {
      value: '选项C'
    }
  ]

  return defaultItems
}

export default {
  name: 'lbp-form-radio-group',
  props: {
    aliasName: {
      type: String,
      default: `标题演示`,
      editor: {
        type: 'a-input',
        label: '填写标题',
        require: true
      }
    },
    items: {
      type: Array,
      default: () => getDefaultItems(),
      editor: {
        type: 'lbs-prop-text-enum-editor',
        label: '选项列表',
        require: true
      }
    },
    type: {
      type: String,
      default: 'radio',
      editor: {
        type: 'a-radio-group',
        label: '选择模式',
        require: true,
        prop: {
          options: [
            { label: '单选', value: 'radio' },
            { label: '多选', value: 'checkbox' }
          ],
          name: 'mode'
        }
      }
    }
  },
  data () {
    return {
      value: this.type === 'radio' ? '' : [],
      uuid: undefined
    }
  },
  computed: {
    value_ () {
      if (this.type === 'radio') {
        return this.value
      } else {
        const value = (Array.isArray(this.value) && this.value) || []
        return value.join(',')
      }
    }
  },
  watch: {
    type (type) {
      this.value = type === 'radio' ? '' : []
    }
  },
  mounted () {
    this.uuid = this.$el.dataset.uuid
  },
  methods: {
    /**
     * @param {String, Number} val radioValue or checkboxValue
     */
    onChange (val) {
      switch (this.type) {
        case 'radio':
          this.toggleRadio(val)
          break
        case 'checkbox':
          this.toggleCheckbox(val)
          break
        default:
          break
      }
    },
    toggleCheckbox (val) {
      const index = this.value.indexOf(val)
      if (index === -1) {
        this.value.push(val)
      } else {
        this.value.splice(index, 1)
      }
    },
    toggleRadio (val) {
      this.value = val
    }
  },
  render () {
    return (
      <div>
        <h3>{this.aliasName}</h3>
        <input type="text" hidden value={this.value_} data-type="lbp-form-input" data-uuid={this.uuid} />
        {
          this.items.map(item => (
            <LbpFormRadio
              vertical
              value={item.value}
              checked={this.value === item.value}
              aliasName={this.uuid}
              type={this.type}
              onChange={this.onChange}
            >{item.value}
            </LbpFormRadio>
          ))
        }
      </div>
    )
  }
}
