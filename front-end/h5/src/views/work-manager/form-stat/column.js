export const columns = [
  {
    title: '序号',
    // dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '浏览量(PV)',
    dataIndex: 'pv',
    key: 'pv'
  },
  {
    title: '用户浏览量(UV)',
    dataIndex: 'uv',
    key: 'uv'
  },
  // {
  //   // i18n for title
  //   title: '',
  //   key: 'formCount',
  //   dataIndex: 'formCount'
  // },
  {
    title: '行为(Action)',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export const data = [
  {
    key: '1',
    title: 'John Brown',
    pv: 32,
    uv: 32,
    formCount: 2
  },
  {
    key: '2',
    title: 'John Brown2',
    pv: 32,
    uv: 32,
    formCount: 2
  },
  {
    key: '3',
    title: 'John Brown3',
    pv: 32,
    uv: 32,
    formCount: 2
  }
]
