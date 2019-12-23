import commonProps from './common/props.js'

export default {
  render() {
    const {
      color,
      textAlign,
      backgroundColor,
      fontSize,
      lineHeight,
      borderColor,
      borderRadius,
      borderWidth,
      text,
      letterSpacing,
      disabled
    } = this

    const style = {
      color,
      textAlign,
      backgroundColor,
      fontSize: fontSize,
      lineHeight: lineHeight + 'em',
      borderColor,
      borderRadius: borderRadius + 'px',
      borderWidth: borderWidth + 'px',
      textDecoration: 'none',
      letterSpacing: letterSpacing + 'px',
      paddingLeft: letterSpacing + 6 + 'px',
      height: '100%',
      disabled
    }
    return (
      <button
        type="submit"
        style={style}
        onClick={this.handleClick}
      >{text}</button>)
  },
  name: 'lbp-form-button',
  props: {
    text: commonProps.text(),
    vertical: commonProps.vertical,
    backgroundColor: commonProps.backgroundColor,
    color: commonProps.color,
    fontSize: commonProps.fontSize,
    lineHeight: commonProps.lineHeight,
    borderWidth: commonProps.borderWidth,
    borderRadius: commonProps.borderRadius,
    borderColor: commonProps.borderColor,
    letterSpacing: commonProps.letterSpacing,
    textAlign: commonProps.textAlign()
  },
  methods: {
    handleClick() {
      let input_num = $('.int').length;
      let stat = 1;
      if ($('.edit-mode').length > 0) {
        //编辑状态点击无效
        return
      } else {
        for (let x = 0; x < input_num; x++) {
          if ($('.int').eq(x).val() == '') {
            stat = 0;
            break;
          }
        }
        console.log('状态', stat)
        if (stat == 1) {
          //  let cur_uuid = document.getElementsByClassName('input_group')[0].getAttribute('data-uuid')
          let formData = new FormData()
          for(let i=0;i<$('.int').length;i++){
            formData.append($('.int').eq(i).attr('data-uuid'),$('.int').eq(i).val())
          }
          // let inputs = $('.int');
          // inputs.forEach(input => formData.append(input.dataset.uuid, input.value))
          const req = new XMLHttpRequest()
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              const message = req.status === 200 ? '提交成功' : '提交失败'
              layer.msg(message)
            }
          }
          const workId = window.__work.id
          req.open('post', `/works/form/submit/${workId}`, true)
          req.send(formData)
        } else {
          layer.msg('必填项不能为空')
        }
      }
    }
  },
  editorConfig: {
    components: {
      'lbs-select-input-type': {
        props: ['value'],
        computed: {
          value_: {
            get() {
              return this.value
            },
            set(val) {
              this.$emit('input', val)
            }
          }
        },
        template: `
          <a-select v-model="value_" placeholder="类型">
            <a-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </a-option>
          </a-select>
        `,
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
