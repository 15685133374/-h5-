<!--
 * @Author: ly525
 * @Date: 2019-12-01 18:11:50
 * @LastEditors: ly525
 * @LastEditTime: 2019-12-08 15:28:42
 * @FilePath: /luban-h5/front-end/h5/src/views/work-manager/form-stat/detail.vue
 * @Github: https://github.com/ly525/luban-h5
 * @Description:
    #!zh: 某个作品的的表单统计页
    #!en: forms for the work
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 -->

<script>
import { mapState, mapActions } from 'vuex'
import ExportJsonExcel from "js-export-excel"
export default {
  components: {
  },
  data: () => ({
  }),
  computed: {
    ...mapState('editor', ['formDetailOfWork']),
    /**
     * columns demo: [{"1565369322603":"abc"},{"1565595388440":"ddd"},{"1565595388440":"acd"},{"1565596393441":"b","1565596397671":"a"},{"1565596393441":"b","1565596397671":"a"}]
     */
    columns () {
      const { uuidMap2Name } = this.formDetailOfWork
      // the uuid for input plugin
      return Object.entries(uuidMap2Name).map(([uuid, inputName]) => ({
        title: inputName,
        key: `uuid-${uuid}`,
        dataIndex: `uuid-${uuid}`
      }))
    },
    

    /**
     * rows demo: [{"title":"姓名","key":"1565596393441"},{"title":"学校","key":"1565596397671"}]
     *
     * formRecords example: <[{
        "id": 4,
        "form": {
          "1565595388440": "ddd",
          1234: 'abc'
        },
        "work": 8,
        "created_at": "2019-08-11T07:36:54.521Z",
        "updated_at": "2019-08-11T07:36:54.526Z"
      }]>
    */
    rows () {
      const { formRecords, uuidMap2Name } = this.formDetailOfWork
      const rows = formRecords.map(({ form, id }) => {
        const row = {}
        Object.entries(form).forEach(([uuid, inputValue = '-']) => {
          if (uuidMap2Name[uuid]) {
            row[`uuid-${uuid}`] = inputValue
            row.id = id
          }
        })
        return row
      })
      return rows.filter(row => Object.keys(row).length)
    },
 
  },
  methods: {
    ...mapActions('editor', [
      'fetchFormsOfWork'
    ]),
    downloadExcel(){
      const datas = this.rows;//表格数据
      const titles = this.columns;
      let headers = new Array();//表头
      let content = new Array();
      titles.forEach(ele =>{
        headers.push(ele.title)
      })
      console.log('原始数据',datas)
      for(let d in datas){
        if(d=='id'){
          delete datas[d]
        }
      }
        var option={};
        console.log('data',datas);
        let item = [];
        // var json = {颜色: "1708480395608103", 蓝色: "1708742016288631"};
        // var keyArr = Object.keys(json);
        // var val = json[keyArr[0]];
        if (datas) {
          datas.forEach(data => {
              delete data.id
              let keyArr =Object.values(data);
              console.log('keyArr',keyArr);
             item.push(keyArr)
              
          });
        }

        console.log('数据',item)
        option.fileName = '组织信息'
        option.datas=[
        {
          sheetData:item,
          sheetName:'sheet',
          // sheetFilter:headers,
          sheetHeader:headers,
        }
        ];

        var toExcel = new ExportJsonExcel(option); 
        toExcel.saveExcel();        
      }
  },
  render (h) {
    return (
      <div class="works-wrapper ">
        <a-table columns={this.columns} dataSource={this.rows} row-key="id" scopedSlots={{
          action: function (props) {
            // 查看数据
            return [<router-link to={{ name: 'stat-detail', params: { id: props.id } }} >{this.$t('basicData.viewData')}</router-link>]
            
          }
        }}>
        
        </a-table>
      <Button v-show={this.rows.length >0} onClick={this.downloadExcel}>导出</Button>
      </div>
    )
    
  },
  created () {
    const workId = this.$route.params.id
    this.fetchFormsOfWork(workId)
  }
}
</script>