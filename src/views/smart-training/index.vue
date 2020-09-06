<template>
  <div style="margin-top: 10px" class="app-contain">
    <div style="display: flex;flex-direction: row">
      <div style="width: 450px;margin-right: 30px">
        <el-card style="width: 450px;padding: 20px;">
          <el-form label-width="90px">
            <div style="overflow-y:scroll;height:500px;padding-right: 20px">
              <div v-for="item in buildParam.subjectList">
                <el-form-item :label="item.name">
                  <el-slider v-model="item.proportion" :step="1" :min="0" :max="20" show-stops></el-slider>
                </el-form-item>
              </div>
            </div>
            <!--<el-form-item label="难度：" class="smart-rate">
              <el-rate v-model="buildParam.difficult"></el-rate>
            </el-form-item>-->
            <el-form-item>
              <el-button type="primary" @click="buildPaper">生成试卷</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      <div style="flex: 1">
        <el-card>
          <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row style="width: 100%">
            <el-table-column prop="name" label="名称"  />
            <el-table-column prop="subjectName" label="学科" width="70"/>
            <el-table-column prop="createTime" label="创建时间" width="170"/>
            <el-table-column align="right" width="70">
              <template slot-scope="{row}">
                <router-link target="_blank" :to="{path:'/do',query:{id:row.id}}">
                  <el-button type="text" class="button">开始做题</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :background="false" :page.sync="queryParam.pageIndex"
                      :limit.sync="queryParam.pageSize"
                      @pagination="search" style="margin-top: 20px"/>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import { scrollTo } from '@/utils/scroll-to'
import subjectApi from '@/api/subject'
import examPaperApi from '@/api/examPaper'

export default {
  components: { Pagination },
  data () {
    return {
      buildParam: {
        subjectId: null,
        subjectList: [],
        difficult: 2
      },
      queryParam: {
        paperType: 7,
        subjectId: null,
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: false,
      tableData: [],
      total: 0,
      subjectList: []
    }
  },
  created () {
    this.initSubject()
  },
  methods: {
    initSubject () {
      let _this = this
      subjectApi.list().then(re => {
        _this.subjectList = re.response
        _this.subjectList.forEach(e => {
          _this.buildParam.subjectList.push({ 'subjectId': e.id, 'name': e.name, 'proportion': 2 })
        })
        _this.search()
        scrollTo(0, 800)
      })
    },
    search () {
      this.listLoading = true
      let _this = this
      examPaperApi.pageList(this.queryParam).then(data => {
        const re = data.response
        _this.tableData = re.list
        _this.total = re.total
        _this.queryParam.pageIndex = re.pageNum
        _this.listLoading = false
      })
    },
    buildPaper () {
      let _this = this
      examPaperApi.build(this.buildParam).then(function (result) {
        if (result && result.code === 1) {
          _this.$message.success(result.response)
          _this.search()
        } else {
          _this.$message.error(result.message)
        }
      })
    },
    statusTagFormatter (status) {
      return this.enumFormat(this.statusTag, status)
    },
    statusTextFormatter (status) {
      return this.enumFormat(this.statusEnum, status)
    }
  },
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapState('enumItem', {
      statusEnum: state => state.exam.examPaperAnswer.statusEnum,
      statusTag: state => state.exam.examPaperAnswer.statusTag
    })
  }
}
</script>

<style lang="scss">
  .smart-rate {
    .el-rate {
      line-height: 2.3 !important;
    }
  }
</style>
