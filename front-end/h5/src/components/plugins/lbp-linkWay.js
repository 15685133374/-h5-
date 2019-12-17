import commonProps from './common/props.js'
import { Z_FIXED } from 'zlib'

export default {
  name: 'lbp-linkWay',
  render () {
    const {
      color,
      textAlign,
      backgroundColor,
      fontSize,
      lineHeight,
      borderColor,
      borderRadius,
      borderWidth,
      text1,
      text2
    //   text
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
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'space-around',
      position: 'fixed!important',
      bottom: '0px!important',
      left: 0,
      height: 40,
      width:'100%',
      zIndex:999
    }

    // const style1 = {
    //   width: '100% ',
    //   height: 30 + 'px ',
    //   position: 'fixed',
    //   bottom: '0px',
    //   left: '0px'
    // }
    return (
          <ul class='linkway' style={style}>
        <li ><i class="fa fa-wechat" aria-hidden="true"></i> <p>{text1}</p></li>
        <li><i class="fa fa-phone" aria-hidden="true"></i><p>{text2}</p></li>
        </ul>
        )
  },
  props: {
    // text: commonProps.text(),
    text1: commonProps.text1(),
    text2: commonProps.text2(),
    vertical: commonProps.vertical,
    backgroundColor: commonProps.backgroundColor,
    color: commonProps.color,
    fontSize: commonProps.fontSize,
    lineHeight: commonProps.lineHeight,
    borderWidth: commonProps.borderWidth,
    borderRadius: commonProps.borderRadius,
    borderColor: commonProps.borderColor,
    textAlign: commonProps.textAlign()
  }
}
