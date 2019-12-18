import playIcon from './play.svg'
import './styles/video.scss'
// 这里有个动画演示，可以用来学习 CSS：《CSS制作播放、暂停按钮》https://codepen.io/chriscoyier/full/lotjh
//<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=k0027nolupz" allowFullScreen="true"></iframe>
export default {
  name: 'lbp-video',
  props: {
    src: {
      type: String,
      // default: `<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=k0027nolupz" allowFullScreen="true"></iframe>`,
      default:'',
      editor: {
        type: 'a-input',
        label: '视频url',
        prop: {
          type: 'textarea'
        },
        extra: (h) => {
          return <a href='https://github.com/ly525/luban-h5/issues/85' target='_blank'>教程(Tutorial)</a>
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    src () {
      this.appendIframe()
    }
  },
  mounted () {
    this.appendIframe()
  },
  methods: {
    appendIframe () {
      if (this.src) {
        this.$el.innerHTML = this.src
      }
    }
  },
  render (h) {
    const style = this.disabled ? { 'pointer-events': 'none','height':'100%' } : {'height':'100%' }
    return (
      <div class="lbc-video" style={style}>
        {
          <video controls="controls" playsinline="true" webkit-playsinline="" width="100%" height="100%" poster={playIcon}><source src="" type="video/mp4" /></video>
           
        }
      </div>
    )
  },
  editorConfig: {
    components: {
    }
  }
}
