import Page from './page.js'

class Work {
  constructor (work = {}) {
    this.title = work.title || '标题'
    this.description = work.description || '描述'
    this.pages = work.pages || [new Page()]

    // this.id = this.id
    // TODO 用id 并不是一个好办法，有心人会得知整个系统中共有多少作品等额外信息，尽量防止信息泄漏
    // this.key = this.key
    this.cover_image_url = ''
    // TODO 后期可以添加一个类似项目组的概念，每个项目组下可以有多个作品
    // this.project_id = 1
    let dat = new Date()
    var formatDate = function (date) {  
      var y = date.getFullYear();  
      var m = date.getMonth() + 1;  
      m = m < 10 ? '0' + m : m;  
      var d = date.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      return y + '-' + m + '-' + d;  
  };  
    this.create_time = formatDate(dat)
    this.update_time = formatDate(dat)
    this.is_publish = false
    this.is_template = false
    this.user_id =window.location.href.split('/')[3].split('#')[0]
    this.preview_url =''
    this.status=0
    this.review_reason = ''
  }
}

export default Work
