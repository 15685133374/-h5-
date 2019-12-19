export default {
  text: ({ defaultValue = '立即提交', label = '按钮文字' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label,
      require: true
    }
  }),
  text1: ({ defaultValue = '微信', label = '按钮文字' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label,
      require: true
    }
  }),
  text2: ({ defaultValue = '电话', label = '按钮文字' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label,
      require: true
    }
  }),
  userName: ({ defaultValue = '姓名', label = '标题文字' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label,
      require: true
    }
  }),
  phoneNum: ({ defaultValue = '电话', label = '标题文字' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label,
      require: true
    }
  }),
  btnName: ({ defaultValue = '立即提交', label = '按钮文字' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label,
      require: true
    }
  }),
  type: {
    type: String,
    default: 'text'
  },
  placeholder: ({ defaultValue = '请填写提示文字' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label: '提示文字',
      require: true
    }
  }),
  placeholder1: ({ defaultValue = '请输入姓名' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label: '提示文字',
      require: true
    }
  }),
  placeholder2: ({ defaultValue = '请输入电话' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label: '提示文字',
      require: true
    }
  }),
  required: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: '#ffffff',
    editor: {
      type: 'a-input', // lbs-color-picker
      label: '背景颜色',
      prop: {
        type: 'color'
      },
      require: true
    }
  },
  backgroundColorInput: {
    type: String,
    default: '#ffffff',
    editor: {
      type: 'a-input', // lbs-color-picker
      label: '输入框背景色',
      prop: {
        type: 'color'
      },
      require: true
    }
  },
  backgroundColorBtn: {
    type: String,
    default: '#4E90FF',
    editor: {
      type: 'a-input', // lbs-color-picker
      label: '按钮背景色',
      prop: {
        type: 'color'
      },
      require: true
    }
  },
  color: {
    type: String,
    // 注意，根据 MDN 文档，颜色选择器的 value 只能是：# + 6个16进制字符串
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Value
    // The value of an <input> element of type color is always a DOMString which contains a 7-character string specifying an RGB color in hexadecimal format.
    default: '#000000',
    editor: {
      type: 'a-input',
      label: '文字颜色',
      // !#zh 为编辑组件指定 prop
      prop: {
        type: 'color'
      },
      require: true
    }
  },
  fontSize: {
    type: Number,
    default: 14,
    editor: {
      type: 'a-input-number',
      label: '字号(px)',
      require: true,
      prop: {
        step: 1,
        min: 12,
        max: 144
      }
    }
  },
  letterSpacing: {
    type: Number,
    default: 0,
    editor: {
      type: 'a-input-number',
      label: '字间距',
      require: true,
      prop: {
        step: 1,
        min:0,
        xax:99
      }
    }
  },
  lineHeight: {
    type: Number,
    default: 1,
    editor: {
      type: 'a-input-number',
      label: '行高',
      require: true,
      prop: {
        step: 0.1,
        min: 0.1,
        max: 10
      }
    }
  },
  borderWidth: {
    type: Number,
    default: 0,
    editor: {
      type: 'a-input-number',
      label: '边框宽度',
      require: true,
      prop: {
        step: 1,
        min: 0,
        max: 10
      }
    }
  },
  borderRadius: {
    type: Number,
    default: 0,
    editor: {
      type: 'a-input-number',
      label: '圆角(px)',
      require: true,
      prop: {
        step: 1,
        min: 0,
        max: 200
      }
    }
  },
  borderColor: {
    type: String,
    default: '#ced4da',
    editor: {
      type: 'a-input', // lbs-color-picker
      label: '边框颜色',
      prop: {
        type: 'color'
      },
      require: true
    }
  },
  textAlign: ({ defaultValue = 'center' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'lbs-text-align',
      label: '文字对齐',
      require: true
    }
  })
}
