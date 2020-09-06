<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="用户名：">
        <el-input v-model="queryParam.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="班级：">
        <el-select v-model="queryParam.classes" placeholder="年级"  clearable>
          <el-option v-for="item in classesEnum" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-popover placement="bottom" trigger="click">
          <a target="_blank" href="http://xdd.file.alvisu.com/template/学生导入模板.xlsx" style="float: left;margin-left: 5px;">
            <el-button size="mini"  type="success">模板下载</el-button>
          </a>
          <el-upload  style="float: left;margin-left: 5px;" accept=".xlsx" action="/api/teacher/upload/excel/student" :show-file-list="false" :on-progress="uploadProgress"
                      :on-success="uploadExcelSuccess">
            <el-button  size="mini" type="success"  class="link-left">模板导入</el-button>
          </el-upload>
          <el-button slot="reference" type="primary" class="link-left">导入</el-button>
        </el-popover>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id" />
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="realName" label="真实姓名" />
      <el-table-column prop="userLevel" label="学级"  :formatter="levelFormatter"/>
      <el-table-column prop="sex" label="性别" width="60px;" :formatter="sexFormatter"/>
      <el-table-column prop="phone" label="手机号"/>
      <el-table-column prop="joinTime" label="加入时间" width="160px"/>
      <el-table-column prop="classesName" label="班级" width="160px"/>
      <el-table-column width="90px" label="操作" align="center">
        <template slot-scope="{row}">
          <el-button  size="mini" type="danger" @click="removeOutUser(row)" class="link-left">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
                @pagination="search"/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import classesApi from '@/api/classes'

export default {
  components: { Pagination },
  data () {
    return {
      queryParam: {
        userName: '',
        classes: null,
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: false,
      tableData: [],
      total: 0,
      classesEnum: []
    }
  },
  created () {
    this.initClasses()
    this.search()
  },
  methods: {
    initClasses () {
      let _this = this
      classesApi.getAllClasses().then(re => {
        _this.classesEnum = re.response
      })
    },
    search () {
      this.listLoading = true
      classesApi.classesUserPageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    removeOutUser (row) {
      let _this = this
      classesApi.removeOutUser(row.id).then(re => {
        if (re.code === 1) {
          _this.search()
          _this.$message.success(re.message)
        } else {
          _this.$message.error(re.message)
        }
      })
    },
    submitForm () {
      this.queryParam.pageIndex = 1
      this.search()
    },
    uploadProgress () {
      this.loading = this.$loading({
        lock: true,
        text: '文件上传中…',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      })
    },
    uploadExcelSuccess (re, file) {
      this.loading.close()
      if (re.code === 1) {
        window.location.href = re.response
      } else {
        this.$message.error(re.message)
      }
    },
    levelFormatter  (row, column, cellValue, index) {
      return this.enumFormat(this.levelEnum, cellValue)
    },
    sexFormatter  (row, column, cellValue, index) {
      return this.enumFormat(this.sexEnum, cellValue)
    },
    statusFormatter (status) {
      return this.enumFormat(this.statusEnum, status)
    },
    statusTagFormatter (status) {
      return this.enumFormat(this.statusTag, status)
    },
    statusBtnFormatter (status) {
      return this.enumFormat(this.statusBtn, status)
    }
  },
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapState('enumItem', {
      sexEnum: state => state.user.sexEnum,
      statusEnum: state => state.user.statusEnum,
      statusTag: state => state.user.statusTag,
      statusBtn: state => state.user.statusBtn,
      levelEnum: state => state.user.levelEnum
    })
  }
}
</script>
