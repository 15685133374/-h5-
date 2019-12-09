import commonProps from './common/props.js'
import { white } from 'ansi-colors'

export default {
  name: 'lbp-form-group',
  render (h) {
    const {
      userName,
      phoneNum,
      btnName
    } = this
    const style = {
      color: this.color,
      textAlign: this.textAlign,
      backgroundColor: this.backgroundColor,
      fontSize: this.fontSize + 'px',
      lineHeight: this.lineHeight + 'em',
      borderColor: this.borderColor,
      borderRadius: this.borderRadius + 'px',
      borderWidth: this.borderWidth + 'px',
      padding: '0 5px',
      borderBottom: '1px solid #DCDCDC',
      width: '100%'
    }
    const styleBtn = {
      color: 'white',
      backgroundColor: '#4E90FF',
      border: 'none',
      outline: 'none',
      width: '100%',
      borderRadius: '2px',
      marginTop: '20px',
      padding: '4px'
    }
    return (
      <div><label for="name">{userName}</label><br></br><input disabled={this.disabled} type={this.type}
        style={style}
        name={this.name}
        id="name"
        placeholder={this.placeholder1}
        autocomplete="off"
        data-type="lbp-form-input" // 点击[表单提交]按钮的时候,找到data-type为:lbp-form-input 的输入框，并将其值添加到formData,提交到后台
      /><br></br><label for="phone">{phoneNum}</label><br></br><input disabled={this.disabled} type={this.type}
        style={style}
        name={this.name}
        id="phone"
        placeholder={this.placeholder2}
        autocomplete="off"
        data-type="lbp-form-input" // 点击[表单提交]按钮的时候,找到data-type为:lbp-form-input 的输入框，并将其值添加到formData,提交到后台
    /><br></br><button style={styleBtn}  onClick={this.handleClick}>{btnName}</button>
      </div>
    )
  },
  props: {
    name: {
      type: String,
      default () {
        return 'name'
      }
    },
    type: {
      type: String,
      default: 'text',
      editor: {
        type: 'lbs-select-input-type',
        label: '类型'
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // type: commonProps.type,
    userName: commonProps.userName(),
    phoneNum: commonProps.phoneNum(),
    btnName: commonProps.btnName(),
    placeholder1: commonProps.placeholder1('姓名'),
    placeholder2: commonProps.placeholder2('电话'),
    fontSize: commonProps.fontSize,
    color: commonProps.color,
    backgroundColor: commonProps.backgroundColor,
    borderColor: commonProps.borderColor,
    borderWidth: commonProps.borderWidth,
    borderRadius: commonProps.borderRadius,
    lineHeight: commonProps.lineHeight,
    textAlign: commonProps.textAlign({ defaultValue: 'left' })
  },
  methods: {
    handleClick () {
      if (this.disabled) return

      // #!zh: data-type=lbp-form-input 在 lbp-form-input 组件中定义
      let inputs = document.querySelectorAll("[data-type^='lbp-form-input']")
      if (!inputs.length) return
      const self = this
      let formData = new FormData()
      inputs.forEach(input => formData.append(input.dataset.uuid, input.value))
      const req = new XMLHttpRequest()
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          const message = req.status === 200 ? '提交成功' : '提交失败'
          self.$message.info(message)
        }
      }

      // #!zh: vuex.module.editor.setWork 中定义
      const workId = window.__work.id
      // TODO #!zh: 可以动态配置表单提交地址
      req.open('post', `/works/form/submit/${workId}`, true)
      req.send(formData)
    }
  },
  editorConfig: {
    components: {
      'lbs-select-input-type': {
        props: ['value'],
        computed: {
          value_: {
            get () {
              return this.value
            },
            set (val) {
              this.$emit('input', val)
            }
          }
        },
        render (h) {
          return (
            <a-select
              placeholder="类型"
              value={this.value}
              onChange={(value) => {
                this.$emit('input', value)
                this.$emit('change', value)
              }}
            >
              {
                this.options.map(option => (
                  <a-select-option
                    key={option.value}
                    value={option.value}
                  >{option.label}</a-select-option>
                ))
              }
            </a-select>
          )
        },
        data: () => ({
          options: [
            {
              label: '文字',
              value: 'text'
            },
            {
              label: '密码',
              value: 'password'
            },
            {
              label: '日期',
              value: 'date'
            },
            {
              label: '邮箱',
              value: 'email'
            },
            {
              label: '手机号',
              value: 'tel'
            }
          ]
        })
      }
    }
  }
}

// .lb-plugin__input {
//   display: block;
//   margin: 0;
//   padding: 0 5px;
//   box-sizing: border-box;
//   overflow: visible;
//   border: 1px solid #ced4da;
//   &:focus {
//     outline: none;
//   }
// }
