import commonProps from './common/props.js'
import { white } from 'ansi-colors'

export default {
  name: 'lbp-form-group',
  render (h) {
    const {
      userName,
      phoneNum,
      btnName,
      letterSpacing,
      backgroundColorBtn,
      backgroundColorInput
    } = this
    const style = {
      color: this.color,
      textAlign: this.textAlign,
      backgroundColor: backgroundColorInput,
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
      backgroundColor: backgroundColorBtn,
      border: 'none',
      outline: 'none',
      width: '100%',
      borderRadius: '2px',
      marginTop: '20px',
      padding: '4px',
      letterSpacing:letterSpacing +'px',
      paddingLeft:letterSpacing + 4 +'px',
      lineHeight: this.lineHeight + 'em',
    }
    return (
      <p class="input_group"><label for="name" style={{'paddingLeft':'5px'}}>{userName}</label><br></br>
      <input disabled={this.disabled} type={this.type}
        style={style}
        name={this.name}
        class="name"
        placeholder={this.placeholder1}
        autocomplete="off"
        data-type="lbp-form-input" // 点击[表单提交]按钮的时候,找到data-type为:lbp-form-input 的输入框，并将其值添加到formData,提交到后台
      /><br></br><label for="phone" style={{'paddingLeft':'5px'}}>{phoneNum}</label><br></br>
      <input disabled={this.disabled} type={this.type}
        style={style}
        name={this.name}
        class="phone"
        placeholder={this.placeholder2}
        autocomplete="off"
        data-type="lbp-form-input" // 点击[表单提交]按钮的时候,找到data-type为:lbp-form-input 的输入框，并将其值添加到formData,提交到后台
    /><br></br><button class="submit" style={styleBtn}  onClick={this.handleClick}>{btnName}</button>
      </p>
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
    backgroundColorBtn:commonProps.backgroundColorBtn,
    borderColor: commonProps.borderColor,
    borderWidth: commonProps.borderWidth,
    borderRadius: commonProps.borderRadius,
    lineHeight: commonProps.lineHeight,
    letterSpacing:commonProps.letterSpacing,
    textAlign: commonProps.textAlign({ defaultValue: 'left' })
  },
  methods: {
    handleClick () {
       // if (this.disabled) return
       let uuid = Object.values($(this)[0].$attrs)[0];
       let val1,val2;
       for(let i=0;i<$('.input_group').length;i++){
         if($('.input_group').eq(i).attr('data-uuid') == uuid){
           val1 =$('.input_group').eq(i).find('.name').val()
           val2 =$('.input_group').eq(i).find('.phone').val()
         }
       }
 
       if ($('.edit-mode').length > 0) {
         //编辑状态点击无效
         return;
       } else {
         if (val1 && val2) {
           var datas=[val1,val2];
           var cur_uuid = document.getElementsByClassName('input_group')[0].getAttribute('data-uuid');
           var formData = new FormData();
           // var inputs = document.querySelectorAll("[data-type^='lbp-form-input']");
           // inputs.forEach(function (input) {
           //   return formData.append(cur_uuid, input.value);
           // });
           formData.append( uuid, datas);
           var req = new XMLHttpRequest();
 
           req.onreadystatechange = function () {
             if (req.readyState === 4) {
               var message = req.status === 200 ? '提交成功' : '提交失败'; // self.$message.info(message)
               // confirm(message)
 
               layer.msg(message);
             }
           };
 
           var workId = window.__work.id; // TODO #!zh: 可以动态配置表单提交地址
 
           req.open('post', "/works/form/submit/".concat(workId), true);
           req.send(formData);
         } else {
           layer.msg('必填项不能为空');
         }
       } // #!zh: data-type=lbp-form-input 在 lbp-form-input 组件中定义
       // let inputs = document.querySelectorAll("[data-type^='lbp-form-input']")
       // #!zh: vuex.module.editor.setWork 中定义
      
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
