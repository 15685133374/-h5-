export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: () => {}
    },
    uploadSuccess: {
      type: Function,
      default: () => {}
    },
    beforeUpload: {
      type: Function,
      default: (file) => file
    }
  },
  computed: {
  },
  data: () => ({
    loading: false
  }),
  methods: {
    handleBeforeUpload (file) {
      return this.beforeUpload(file)
    },
    handleChange (info) {
      this.loading = true
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.loading = false
        this.uploadSuccess(info)
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  },
  render (h) {
    return (
      <a-upload
        name="files"
        action="/upload"
        // multiple="true"
        beforeUpload={this.handleBeforeUpload}
        onChange={this.handleChange}>
        <slot>
          <a-button>
            <a-icon type="upload" /> 点击上传
          </a-button>
        </slot>
      </a-upload>
    )
  },
  mounted () {
  }
}
