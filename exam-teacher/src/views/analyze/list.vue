<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="试卷ID：">
        <el-input v-model="queryParam.id" clearable></el-input>
      </el-form-item>
      <el-form-item label="学科：" >
        <el-select v-model="queryParam.subjectId"  clearable>
          <el-option v-for="item in subjects" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <router-link :to="{path:'/paper/edit'}" class="link-left">
          <el-button type="primary">添加</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id" width="90px"/>
      <el-table-column prop="subjectId" label="学科" :formatter="subjectFormatter" width="120px" />
      <el-table-column prop="name" label="名称"  />
      <el-table-column prop="createTime" label="创建时间" width="160px"/>
      <el-table-column  label="操作" align="center"  width="110px">
        <template slot-scope="{row}">
          <router-link :to="{path:'/analyze/paper/classes', query:{id:row.id}}" class="link-left">
            <el-button size="mini">成绩分析</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
                @pagination="search"/>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import examPaperApi from '@/api/examPaper'

export default {
  components: { Pagination },
  data () {
    return {
      queryParam: {
        id: null,
        subjectId: null,
        pageIndex: 1,
        pageSize: 10
      },
      subjectFilter: null,
      listLoading: false,
      tableData: [],
      total: 0
    }
  },
  created () {
    this.initSubject()
    this.search()
  },
  methods: {
    submitForm () {
      this.queryParam.pageIndex = 1
      this.search()
    },
    search () {
      this.listLoading = true
      examPaperApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    subjectFormatter  (row, column, cellValue, index) {
      return this.subjectEnumFormat(cellValue)
    },
    ...mapActions('exam', { initSubject: 'initSubject' })
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapGetters('exam', ['subjectEnumFormat']),
    ...mapState('exam', { subjects: state => state.subjects })
  }
}
</script>
