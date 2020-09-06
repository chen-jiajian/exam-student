<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="100px" v-loading="formLoading" :rules="rules">
      <el-form-item label="学科：" prop="subjectId" required>
        <el-select v-model="form.subjectId" placeholder="学科">
          <el-option v-for="item in subjectFilter" :key="item.id" :value="item.id"
                     :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试卷类型：" prop="paperType" required>
        <el-select v-model="form.paperType" placeholder="试卷类型">
          <el-option v-for="item in paperTypeEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级列表：" prop="classes" required>
        <el-checkbox-group v-model="form.classes">
          <el-checkbox v-for="item in classes" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="试卷名称："  prop="name" required>
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item :key="index" :label="'标题'+(index+1)+'：'" required v-for="(titleItem,index) in form.titleItems">
        <el-input v-model="titleItem.name" style="width: 80%"/>
        <el-button type="text" class="link-left" style="margin-left: 20px" size="mini" @click="addQuestion(titleItem)">
          添加题目
        </el-button>
        <el-button type="text" class="link-left" size="mini" @click="form.titleItems.splice(index,1)">删除</el-button>
        <el-card class="exampaper-item-box" v-if="titleItem.questionItems.length!==0">
          <el-form-item :key="questionIndex" :label="'题目'+(questionIndex+1)+'：'"
                        v-for="(questionItem,questionIndex) in titleItem.questionItems" style="margin-bottom: 15px">
            <el-row>
              <el-col :span="23">
                <QuestionShow :qType="questionItem.questionType" :question="questionItem"/>
              </el-col>
              <el-col :span="1">
                <el-button type="text" size="mini" @click="titleItem.questionItems.splice(questionIndex,1)">删除
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item label="建议时长：" prop="suggestTime" required>
        <el-input v-model="form.suggestTime" placeholder="分钟"/>
      </el-form-item>
      <el-form-item label="题目乱序：" prop="random">
        <el-switch v-model="form.random"></el-switch>
      </el-form-item>
      <el-form-item label="隐藏解析：" prop="hideAnswer">
        <el-switch v-model="form.hideAnswer"></el-switch>
      </el-form-item>
      <el-form-item label="隐藏总分：" prop="hideScore">
        <el-switch v-model="form.hideScore"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="success" @click="addTitle">添加标题</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="questionPage.showDialog"  width="70%">
      <el-form :model="questionPage.queryParam" ref="queryForm" :inline="true">
        <el-form-item label="ID：">
          <el-input v-model="questionPage.queryParam.id"  clearable></el-input>
        </el-form-item>
        <el-form-item label="题型：">
          <el-select v-model="questionPage.queryParam.questionType" clearable>
            <el-option v-for="item in questionTypeEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科：">
                <el-select v-model="questionPage.queryParam.subjectId" clearable>
                  <el-option v-for="item in subjectFilter" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input v-model="questionPage.queryParam.title"  clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="questionPage.listLoading" :data="questionPage.tableData"
                @selection-change="handleSelectionChange" border fit highlight-current-row style="width: 100%">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="id" label="Id" width="60px"/>
        <el-table-column prop="questionType" label="题型" :formatter="questionTypeFormatter" width="70px"/>
        <el-table-column prop="shortTitle" label="题干" show-overflow-tooltip/>
      </el-table>
      <pagination v-show="questionPage.total>0" :total="questionPage.total"
                  :page.sync="questionPage.queryParam.pageIndex" :limit.sync="questionPage.queryParam.pageSize"
                  @pagination="search"/>
      <span slot="footer" style="float:left">
        <el-input v-model="questionPage.randomSize" :disabled="!questionPage.random"  placeholder="随机数量" type="number" style="width: 50%;float: left" ></el-input>
        <el-switch v-model="questionPage.random" active-color="#13ce66" inactive-color="#ff4949" active-value="随机" style="float: left;padding: 6% 10px 10px;"></el-switch>
      </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="questionPage.showDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmQuestionSelect">确定</el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters, mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import QuestionShow from '../question/components/Show'
import examPaperApi from '@/api/examPaper'
import questionApi from '@/api/question'
import classesApi from '@/api/classes'

export default {
  components: { Pagination, QuestionShow },
  data () {
    return {
      form: {
        id: null,
        subjectId: null,
        paperType: 3,
        limitDateTime: [],
        name: '',
        suggestTime: null,
        titleItems: [],
        classes: [],
        random: false,
        hideAnswer: false,
        hideScore: false
      },
      subjectFilter: null,
      classes: [],
      formLoading: false,
      rules: {
        subjectId: [
          { required: true, message: '请选择学科', trigger: 'change' }
        ],
        paperType: [
          { required: true, message: '请选择试卷类型', trigger: 'change' }
        ],
        classes: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' }
        ],
        suggestTime: [
          { required: true, message: '请输入建议时长', trigger: 'blur' }
        ]
      },
      questionPage: {
        multipleSelection: [],
        showDialog: false,
        queryParam: {
          id: null,
          questionType: null,
          subjectId: 1,
          title: null,
          pageIndex: 1,
          pageSize: 5
        },
        listLoading: false,
        tableData: [],
        total: 0,
        random: false,
        randomSize: null
      },
      currentTitleItem: null
    }
  },
  created () {
    let id = this.$route.query.id
    let _this = this
    this.initSubject(function () {
      _this.subjectFilter = _this.subjects
    })

    classesApi.getAllClasses().then(re => {
      _this.classes = re.response
    })

    if (id && parseInt(id) !== 0) {
      _this.formLoading = true
      examPaperApi.select(id).then(re => {
        _this.form = re.response
        _this.formLoading = false
      })
    }
  },
  methods: {
    submitForm () {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          examPaperApi.edit(this.form).then(re => {
            if (re.code === 1) {
              _this.$message.success(re.message)
              _this.delCurrentView(_this).then(() => {
                _this.$router.push('/paper/list')
              })
            } else {
              _this.$message.error(re.message)
              this.formLoading = false
            }
          }).catch(e => {
            this.formLoading = false
          })
        } else {
          return false
        }
      })
    },
    addTitle () {
      this.form.titleItems.push({
        name: '',
        questionItems: []
      })
    },
    addQuestion (titleItem) {
      this.questionPage.queryParam.subjectId = this.form.subjectId
      this.questionPage.random = false
      this.questionPage.randomSize = null
      this.currentTitleItem = titleItem
      this.questionPage.showDialog = true
      this.search()
    },
    removeTitleItem (titleItem) {
      this.form.titleItems.remove(titleItem)
    },
    removeQuestion (titleItem, questionItem) {
      titleItem.questionItems.remove(questionItem)
    },
    queryForm () {
      this.questionPage.queryParam.pageIndex = 1
      this.search()
    },
    confirmQuestionSelect () {
      let _this = this
      if (this.questionPage.random) {
        // 随机
        this.questionPage.multipleSelection.sort(() => Math.random() - 0.5)
      }
      let questionSize = this.questionPage.random && this.questionPage.randomSize > 0 && this.questionPage.randomSize < this.questionPage.multipleSelection.length ? this.questionPage.randomSize : this.questionPage.multipleSelection.length
      for (let i = 0; i < questionSize; i++) {
        questionApi.select(this.questionPage.multipleSelection[i].id).then(re => {
          _this.currentTitleItem.questionItems.push(re.response)
        })
      }
      this.questionPage.showDialog = false
    },
    search () {
      // this.questionPage.queryParam.subjectId = this.form.subjectId
      this.questionPage.listLoading = true
      questionApi.pageList(this.questionPage.queryParam).then(data => {
        const re = data.response
        this.questionPage.tableData = re.list
        this.questionPage.total = re.total
        this.questionPage.queryParam.pageIndex = re.pageNum
        this.questionPage.listLoading = false
      })
    },
    handleSelectionChange (val) {
      this.questionPage.multipleSelection = val
    },
    questionTypeFormatter (row, column, cellValue, index) {
      return this.enumFormat(this.questionTypeEnum, cellValue)
    },
    subjectFormatter (row, column, cellValue, index) {
      return this.subjectEnumFormat(cellValue)
    },
    resetForm () {
      this.$refs['form'].resetFields()
    },
    ...mapActions('exam', { initSubject: 'initSubject' }),
    ...mapActions('tagsView', { delCurrentView: 'delCurrentView' })
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      questionTypeEnum: state => state.exam.question.typeEnum,
      paperTypeEnum: state => state.exam.examPaper.paperTypeEnum
    }),
    ...mapState('exam', { subjects: state => state.subjects })
  }
}
</script>

<style lang="scss">
  .exampaper-item-box {
    .q-title {
      margin: 0px 5px 0px 5px;
    }
    .q-item-content {
    }
  }
</style>
