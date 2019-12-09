import { mapState, mapActions } from 'vuex'
import undoRedoHistory from '../../../store/plugins/undo-redo/History'

import '../styles/index.scss'
import 'animate.css'

import RenderEditCanvas from './canvas/edit'
import RenderPreviewCanvas from './canvas/preview'
import RenderPropsEditor from './edit-panel/props'
import RenderScriptEditor from './edit-panel/script'
import RenderAnimationEditor from './edit-panel/animation'
import RenderActoionEditor from './edit-panel/action'
import RenderBackgroundEditor from './edit-panel/background'
import RenderShortcutsPanel from './shortcuts-panel/index'
import RenderPageManager from './page-manager/index'
import PreviewDialog from './modals/preview.vue'

import LogoOfHeader from '@/components/common/header/logo.js'
import ExternalLinksOfHeader from '@/components/common/header/links.js'
import LangSelect from '@/components/common/header/LangSelect.vue'
import Feedback from '@/components/common/feedback/index'

// const sidebarMenus = [
//   {
//     i18nLabel: 'editor.sidebar.components',
//     label: '组件列表',
//     value: 'pluginList',
//     antIcon: 'bars'
//   },
//   {
//     i18nLabel: 'editor.sidebar.pages',
//     label: '页面管理',
//     value: 'pageManagement',
//     antIcon: 'snippets'
//   },
//   {
//     i18nLabel: 'editor.sidebar.templates',
//     label: '免费模板',
//     value: 'freeTemplate',
//     antIcon: 'appstore'
//   }
// ]

const fixedTools = [
  {
    i18nTooltip: 'editor.fixedTool.undo',
    'tooltip': '撤消', // TODO 支持快捷键
    'text': '撤消',
    'icon': 'mail-reply',
    'action': () => undoRedoHistory.undo()
  },
  {
    i18nTooltip: 'editor.fixedTool.redo',
    'tooltip': '恢复',
    'text': '恢复',
    'icon': 'mail-forward',
    'action': () => undoRedoHistory.redo()
  },
  {
    i18nTooltip: 'editor.fixedTool.preview',
    'tooltip': '刷新预览',
    'text': '刷新预览',
    'icon': 'eye',
    'action': function () { this.previewVisible = true }
  },
  {
    i18nTooltip: 'editor.fixedTool.copyCurrentPage',
    'tooltip': '复制当前页',
    'text': '复制当前页',
    'icon': 'copy',
    'action': function () { this.pageManager({ type: 'copy' }) }
  },
  {
    i18nTooltip: 'editor.fixedTool.importPSD',
    'tooltip': '导入PSD',
    'text': 'Ps',
    'icon': '',
    'action': '',
    'disabled': true
  },
  {
    i18nTooltip: 'editor.fixedTool.zoomOut',
    'tooltip': '放大画布',
    'text': '放大画布',
    'icon': 'plus',
    'action': function () { this.scaleRate += 0.25 }
  },
  {
    i18nTooltip: 'editor.fixedTool.zoomIn',
    'tooltip': '缩小画布',
    'text': '缩小画布',
    'icon': 'minus',
    'action': function () { this.scaleRate -= 0.25 }
  },
  {
    i18nTooltip: 'editor.fixedTool.issues',
    'tooltip': 'issues',
    'text': '常见问题',
    'icon': 'question',
    'action': function () { window.open('https://github.com/ly525/luban-h5/issues/110') }
  }
]

export default {
  name: 'Editor',
  components: {
    LogoOfHeader,
    ExternalLinksOfHeader,
    LangSelect
  },
  data: () => ({
    activeMenuKey: 'pluginList',
    isPreviewMode: false,
    activeTabKey: '属性',
    previewVisible: false,
    scaleRate: 1
  }),
  computed: {
    ...mapState('editor', {
      editingPage: state => state.editingPage,
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages,
      work: state => state.work
    }),
    ...mapState('loading', ['saveWork_loading', 'setWorkAsTemplate_loading', 'uploadWorkCover_loading'])
  },
  methods: {
    ...mapActions('editor', [
      'elementManager',
      'pageManager',
      'saveWork',
      'createWork',
      'fetchWork',
      'setWorkAsTemplate',
      'setEditingElement',
      'setEditingPage'
    ]),
    ...mapActions('loading', {
      updateLoading: 'update'
    }),
    /**
     * !#zh 点击插件，copy 其基础数据到组件树（中间画布）
     * #!en click the plugin shortcut, create new Element with the plugin's meta data
     * pluginInfo {Object}: 插件列表中的基础数据, {name}=pluginInfo
     */
    clone ({ name }) {
      this.elementManager({
        type: 'add',
        value: { name }
      })
    },
    _renderMenuContent () {
      return (
        <a-tabs
          style="height: 100%;"
          tabBarGutter={10}
        >
          <a-tab-pane key="plugin-list" tab={this.$t('editor.sidebar.components')}>
            <RenderShortcutsPanel pluginsList={this.pluginsList} handleClickShortcut={this.clone} />
          </a-tab-pane>
          <a-tab-pane key='page-manager' tab={this.$t('editor.sidebar.pages')}>
            <RenderPageManager
              pages={this.pages}
              editingPage={this.editingPage}
              onSelectMenuItem={(menuKey) => {
                this.pageManager({ type: menuKey })
              }}
              onEditTitle={({ pageIndexForEditingTitle, newTitle }) => {
                this.pageManager({ type: 'editTitle', value: { pageIndexForEditingTitle, newTitle } })
                this.saveWork({ isSaveCover: false })
              }}
              onSelectPage={(pageIndex) => { this.setEditingPage(pageIndex) }}
            />
          </a-tab-pane>
        </a-tabs>
      )
      // switch (this.activeMenuKey) {
      //   case sidebarMenus[0].value:
      //     return (
      //       <a-tabs
      //         style="height: 100%;"
      //         tabBarGutter={10}
      //       >
      //         <a-tab-pane key="plugin-list" tab={this.$t('editor.sidebar.components')}>
      //           <RenderShortcutsPanel pluginsList={this.pluginsList} handleClickShortcut={this.clone} />
      //         </a-tab-pane>
      //         <a-tab-pane key='page-manager' tab={this.$t('editor.sidebar.pages')}>
      //           <RenderPageManager
      //             pages={this.pages}
      //             editingPage={this.editingPage}
      //             onSelectMenuItem={(menuKey) => {
      //               this.pageManager({ type: menuKey })
      //             }}
      //             onEditTitle={({ pageIndexForEditingTitle, newTitle }) => {
      //               this.pageManager({ type: 'editTitle', value: { pageIndexForEditingTitle, newTitle } })
      //               this.saveWork({ isSaveCover: false })
      //             }}
      //             onSelectPage={(pageIndex) => { this.setEditingPage(pageIndex) }}
      //           />
      //         </a-tab-pane>
      //       </a-tabs>
      //     )
      //   case sidebarMenus[1].value:
      //     return (
      //       <RenderPageManager
      //         pages={this.pages}
      //         editingPage={this.editingPage}
      //         onSelectMenuItem={(menuKey) => {
      //           this.pageManager({ type: menuKey })
      //         }}
      //         onSelectPage={(pageIndex) => { this.setEditingPage(pageIndex) }}
      //       />
      //     )
      //   default:
      //     return null
      // }
    }
  },
  render (h) {
    return (
      <a-layout id="luban-editor-layout" style={{ height: '100vh' }}>
        <a-layout-header class="header">
          <LogoOfHeader />
          <LangSelect style="float: right;cursor: pointer;" />
          {/* we can show the plugins shortcuts here */}
          <a-menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'right', background: 'transparent' }}
          >
            {/* 保存、预览、发布、设置为模板 */}
            <a-menu-item key="1" class="transparent-bg"><a-button type="primary" size="small" onClick={() => { this.previewVisible = true }}>{this.$t('editor.header.preview')}</a-button></a-menu-item>
            <a-menu-item key="2" class="transparent-bg"><a-button size="small" onClick={() => this.saveWork({ isSaveCover: true })} loading={this.saveWork_loading || this.uploadWorkCover_loading}>{this.$t('editor.header.save')}</a-button></a-menu-item>
            {/* <a-menu-item key="3" class="transparent-bg"><a-button size="small">发布</a-button></a-menu-item> */}
            <a-menu-item key="3" class="transparent-bg">
              <a-dropdown-button onClick={() => {}} size="small">
                {/* 发布 */}
                {this.$t('editor.header.publish')}
                <a-menu slot="overlay" onClick={({ key }) => {
                  switch (key) {
                    case 'setAsTemplate':
                      this.updateLoading({ type: 'setWorkAsTemplate_loading', value: true })
                      this.saveWork().then(() => {
                        this.setWorkAsTemplate()
                      })
                  }
                }}>
                  <a-menu-item key="setAsTemplate">
                    <a-spin spinning={this.setWorkAsTemplate_loading} size="small">
                      {/* 设置为模板 */}
                      <a-icon type="cloud-upload" />{this.$t('editor.header.setAsTemplate')}
                    </a-spin>
                  </a-menu-item>
                  {/* <a-menu-item key="2"><a-icon type="user" />2nd menu item</a-menu-item> */}
                  {/* <a-menu-item key="3"><a-icon type="user" />3rd item</a-menu-item> */}
                </a-menu>
              </a-dropdown-button>
            </a-menu-item>
          </a-menu>
          <ExternalLinksOfHeader />
        </a-layout-header>
        <a-layout>
          {/* <a-layout-sider collapsedWidth={40} style="background: #fff" collapsed>
            <a-menu
              mode="inline"
              defaultSelectedKeys={['pluginList']}
              style={{ height: '100%', borderRight: 1 }}
              onSelect={({ key }) => { this.activeMenuKey = key }}
            >
              {
                sidebarMenus.map(menu => (
                  <a-menu-item key={menu.value}>
                    <a-icon type={menu.antIcon} />
                    <span>{this.$t(menu.i18nLabel)}</span>
                  </a-menu-item>
                ))
              }
            </a-menu>
          </a-layout-sider> */}
          <a-layout-sider width="240" theme='light' style={{ background: '#fff', padding: '12px' }}>
            { this._renderMenuContent() }
          </a-layout-sider>
          <a-layout style="padding: 0 0 24px">
            <a-layout-content style={{ padding: '24px', margin: 0, minHeight: '280px' }}>
              <div style="text-align: center;">
                <a-radio-group
                  size="small"
                  value={this.isPreviewMode}
                  onInput={isPreviewMode => {
                    this.isPreviewMode = isPreviewMode
                    if (isPreviewMode) {
                      // 当切换到预览模式的时候，清空当前编辑元素
                      this.setEditingElement() // 相当于  setEditingElement(null)
                    }
                  }}
                >
                  {/* 编辑模式、预览模式 */}
                  <a-radio-button label={false} value={false}>{this.$t('editor.centerPanel.mode.edit')}</a-radio-button>
                  <a-radio-button label={true} value={true}>{this.$t('editor.centerPanel.mode.preview')}</a-radio-button>
                </a-radio-group>
              </div>
              <div class='canvas-wrapper' style={{ transform: `scale(${this.scaleRate})` }}>
                {/* { this.isPreviewMode ? this.renderPreview(h, this.elements) : this.renderCanvas(h, this.elements) } */}
                { this.isPreviewMode
                  ? <RenderPreviewCanvas elements={this.elements}/>
                  : <RenderEditCanvas
                    class="edit-mode"
                    elements={this.elements}
                  />
                }
              </div>
            </a-layout-content>
          </a-layout>
          <a-layout-sider width="40" theme='light' style={{ background: '#fff', border: '1px solid #eee' }}>
            {/* <div>
              <a-button shape="circle" icon="search" type="link" />
            </div> */}
            <a-button-group style={{ display: 'flex', flexDirection: 'column' }}>
              {
                fixedTools.map(tool => (
                  // <a-tooltip effect="dark" placement="left" title={tool.tooltip}>
                  <a-tooltip effect="dark" placement="left" title={this.$t(tool.i18nTooltip)}>
                    <a-button block class="transparent-bg" type="link" size="small" style={{ height: '40px', color: '#000' }} onClick={() => tool.action && tool.action.call(this) } disabled={!!tool.disabled}>
                      { tool.icon ? <i class={['shortcut-icon', 'fa', `fa-${tool.icon}`]} aria-hidden='true'/> : tool.text }
                    </a-button>
                    { tool.icon === 'minus' && <div style={{ fontSize: '12px', textAlign: 'center' }}>{this.scaleRate * 100}%</div> }
                  </a-tooltip>
                ))
              }
            </a-button-group>
          </a-layout-sider>
          <a-layout-sider width="300" theme='light' style={{ background: '#fff', padding: '0 12px' }}>
            <a-tabs
              style="height: 100%;"
              tabBarGutter={10}
              onChange={activeTabKey => {
                this.activeTabKey = activeTabKey
                if (activeTabKey === 'background') {
                  const bgElement = this.elements.find(e => e.name === 'lbp-background')
                  this.setEditingElement(bgElement)
                }
              }}
            >
              {/*
                #!zh tab 标题：
                #!en tab title
                  ElementUI：label
                  Ant Design Vue：tab
              */}
              <a-tab-pane key="属性"><span slot="tab">{this.$t('editor.editPanel.tab.prop')}</span><RenderPropsEditor/></a-tab-pane>
              <a-tab-pane label="动画" key='动画' tab={this.$t('editor.editPanel.tab.animation')}><RenderAnimationEditor /></a-tab-pane>
              <a-tab-pane label="动作" key='动作' tab={this.$t('editor.editPanel.tab.action')}>{ this.activeTabKey === '动作' && <RenderActoionEditor/> }</a-tab-pane>
              <a-tab-pane label="脚本" key='脚本' tab={this.$t('editor.editPanel.tab.script')}><RenderScriptEditor/></a-tab-pane>
              <a-tab-pane label="背景" key='background' tab={this.$t('editor.editPanel.tab.background')}><RenderBackgroundEditor/></a-tab-pane>
            </a-tabs>
          </a-layout-sider>

        </a-layout>
        {
          <PreviewDialog
            work={this.work}
            visible={this.previewVisible}
            handleClose={() => { this.previewVisible = false }}
          />
        }
        <Feedback />
      </a-layout>
    )
  },
  created () {
    // event bus for editor
    window.getEditorApp = this
    let workId = this.$route.params.workId
    console.log(workId)
    if (workId) {
      this.fetchWork(workId)
    } else {
      this.createWork()
    }
  }
}
