import { parsePx } from '../../../utils/element.js'

// #! 编辑状态，不可以点击的按钮，因为点击按钮会触发一些默认行为，比如表单提交等
const disabledPluginsForEditMode = ['lbp-form-input', 'lbp-form-button', 'lbp-video']
const cloneObj = (value) => JSON.parse(JSON.stringify(value))
// const scrW = document.getElementsByClassName('edit-mode')[0].clientWidth

const defaultStyle = {
  top: 200,
  bottom: 100,
  left: 0,
  width: 400,
  height: 240,
  zindex: 1,
  textAlign: 'center',
  color: '#000000',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: 14
}

class Element {
  constructor(ele) {
    this.name = ele.name
    this.uuid = ele.uuid || +new Date()

    /**
     * #!zh:
     * 之前版本代码：https://github.com/ly525/luban-h5/blob/a7875cbc73c0d18bc2459985ca3ce1d4dc44f141/front-end/h5/src/components/core/models/element.js#L21
     * 1.之前的版本为：this.pluginProps = {}, 改为下面的版本
     * 是因为要支持[复制画布上的元素]，所以需要先使用 ele.pluginProps 进行初始化（也就是拷贝之前的元素的值）
     *
     * 2. 移除 this.init() 原因是：如果是 复制元素，则 init 会把 copy 的值重新覆盖为初始值，copy 无效
     *
     * 3. 为何需要 clone，因为会有 element.clone() 以及 page.clone()，
     *    element.pluginProps 和 elementcommonStyle 是引用类型，如果不做 deep_clone 可能会出现意外错误
     */
    this.pluginProps = (typeof ele.pluginProps === 'object' && cloneObj({ ...ele.pluginProps, uuid: this.uuid })) || this.getDefaultPluginProps(ele.editorConfig || {})
    this.commonStyle = (typeof ele.commonStyle === 'object' && cloneObj(ele.commonStyle)) || { ...defaultStyle, zindex: ele.zindex }

    if (this.name == 'lbp-form-input' || this.name == 'lbp-button' || this.name == 'lbp-text' || this.name == 'lbp-form-button') {
      this.commonStyle.height = 50
    }
    if (this.name == 'lbp-form-group' || this.name == 'lbp-form-checkbox-group' || this.name == 'lbp-form-radio-group') {
      this.commonStyle.height = 130
    }
    if (this.name == 'lbp-linkWay') {
      this.commonStyle.width = 0;
      this.commonStyle.height = 0;

    }
    this.events = []
    this.animations = ele.animations || []
  }

  // init prop of plugin
  getDefaultPluginProps(propsConfig) {
    const pluginProps = {
      uuid: this.uuid
    }
    Object.keys(propsConfig).forEach(key => {
      // #6
      if (key === 'name') {
        console.warn('Please do not use {name} as plugin prop')
        return
      }
      const defaultValue = propsConfig[key].default
      pluginProps[key] = typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })
    return pluginProps
  }
  // getDefaultPluginProps (editorConfig) {
  //   // init prop of plugin
  //   const propConf = editorConfig.propsConfig
  //   const pluginProps = {}
  //   Object.keys(propConf).forEach(key => {
  //     // #6
  //     if (key === 'name') {
  //       console.warn('Please do not use {name} as plugin prop')
  //       return
  //     }
  //     pluginProps[key] = propConf[key].defaultPropValue
  //   })
  //   return pluginProps
  // }

  getStyle({ position = 'static', isRem = false } = {}) {
    if (this.name === 'lbp-background') {
      return {
        width: '100%',
        height: '100%'
      }
    }

    const pluginProps = this.pluginProps
    const commonStyle = this.commonStyle
    let style = {
      top: parsePx(pluginProps.top || commonStyle.top, isRem),
      left: parsePx(pluginProps.left || commonStyle.left, isRem),
      width: parsePx(pluginProps.width || commonStyle.width, isRem),
      height: parsePx(pluginProps.height || commonStyle.height, isRem),
      fontSize: parsePx(pluginProps.fontSize || commonStyle.fontSize, isRem),
      color: pluginProps.color || commonStyle.color,
      // backgroundColor: pluginProps.backgroundColor || commonStyle.backgroundColor,
      textAlign: pluginProps.textAlign || commonStyle.textAlign,
      'z-index': commonStyle.zindex,
      position
    }
    return style
  }

  getProps({ mode = 'edit' } = {}) {
    return {
      ...this.pluginProps,
      disabled: disabledPluginsForEditMode.includes(this.name) && mode === 'edit'
    }
  }

  getClass() {

  }

  getData() {

  }

  getAttrs() {
    return {
      'data-uuid': this.uuid
    }
  }

  getPreviewData({ position = 'static', isRem = false, mode = 'preview' } = {}) {
    const style = this.getStyle({ position })
    const data = {
      style,
      props: this.getProps({ mode }),
      attrs: this.getAttrs()
    }
    return data
  }

  clone({ zindex = this.commonStyle.zindex + 1 } = {}) {
    return new Element({
      zindex,
      name: this.name,
      pluginProps: this.pluginProps,
      commonStyle: {
        ...this.commonStyle,
        top: this.commonStyle.top + 20,
        left: this.commonStyle.left + 20
      }
    })
  }
}

export default Element
