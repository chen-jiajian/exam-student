<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-tabs tab-position="left"  v-model="tabId"  @tab-click="subjectChange" >
      <el-tab-pane :label="item.name"  :key="item.id" :name="item.id" v-for="item in subjectList" style="margin-left: 20px;" >
        <el-card  :key="index" :label="index + 1 +'.'"
                        v-for="(questionItem, index) in questions"
                        class="exam-question-item" label-width="50px" style="margin: 20px">
            <QuestionEdit :qType="questionItem.questionType" :question="questionItem"
                          :answer="answerItems[startIndex + index]"/>
          <div v-if="showAnswer" style="line-height: 1.8">
            <div class="question-answer-show-item" style="margin-top: 20px">
              <span class="question-show-item">难度：</span>
              <el-rate disabled v-model="questionItem.difficult" class="question-show-item"></el-rate>
            </div>
            <br/>
            <div class="question-answer-show-item" style="line-height: 1.8">
              <span class="question-show-item">解析：</span>
              <span v-html="questionItem.analyze" class="q-item-span-content" />
            </div>
            <div class="question-answer-show-item" style="display: flex">
              <span class="question-show-item">正确答案：</span>
              <div style="flex: 1">
                <span v-if="questionItem.questionType==1||questionItem.questionType==2 ||questionItem.questionType==5" v-html="questionItem.correct" class="q-item-span-content"/>
                <span v-if="questionItem.questionType==3" v-html="trueFalseFormatter(questionItem)" class="q-item-span-content"/>
                <span v-if="questionItem.questionType==4">
             <div v-for="item in questionItem.correctArray" :key="item" v-html="item" />
          </span>
              </div>
            </div>
          </div>
        </el-card>
        <el-switch style="float: right;margin-right: 20px"
          v-model="showAnswer"
          active-text="显示答案"
          inactive-text="隐藏答案">
        </el-switch>
        <pagination v-show="total>0" :total="total" :background="false" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize" :page-sizes="[1, 2, 3, 4]"
                    layout="total, sizes, prev, pager, next, jumper" @pagination="search" style="margin-top: 20px"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import QuestionEdit from '../exam/components/QuestionEdit'
import subjectApi from '@/api/subject'
import questionApi from '@/api/question'

export default {
  components: { Pagination, QuestionEdit },
  data () {
    return {
      queryParam: {
        subjectId: 0,
        pageIndex: 1,
        pageSize: 2
      },
      tabId: '',
      listLoading: false,
      subjectList: [],
      questions: [],
      answerItems: [],
      total: 0,
      startIndex: 0,
      showAnswer: false
    }
  },
  created () {
    this.initSubject()
  },
  methods: {
    trueFalseFormatter (question) {
      return question.items.filter(d => d.prefix === question.correct)[0].content
    },
    initSubject () {
      let _this = this
      subjectApi.list().then(re => {
        _this.subjectList = re.response
        let subjectId = _this.subjectList[0].id
        _this.queryParam.subjectId = subjectId
        _this.tabId = subjectId.toString()
        _this.search()
        _this.resetAnswer()
      })
    },
    search () {
      this.listLoading = true
      questionApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.questions = re.list
        this.total = re.total
        this.startIndex = re.startRow - 1
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    paperTypeChange (val) {
      this.search()
    },
    resetAnswer () {
      this.answerItems = []
      for (let i = 0; i < this.total; i++) {
        this.answerItems.push({ content: null, contentArray: [], completed: false })
      }
    },
    subjectChange (tab, event) {
      this.queryParam.subjectId = Number(this.tabId)
      this.search()
      this.resetAnswer()
    }
  },
  computed: {
    ...mapState('enumItem', {
      paperTypeEnum: state => state.exam.examPaper.paperTypeEnum
    })
  }
}
</script>
