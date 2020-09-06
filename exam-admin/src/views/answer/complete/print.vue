<template>
<div>
  <el-container  class="app-item-contain">
    <el-header class="align-center">
      <h1>{{form.name}}</h1>
      <div>
        <span class="question-title-padding">试卷得分：{{answer.score}}</span>
        <span class="question-title-padding">试卷耗时：{{formatSeconds(answer.doTime)}}</span>
        <span class="question-title-padding">提交人：{{answer.createUser}}</span>
      </div>
    </el-header>
    <el-main>
      <el-form :model="form" ref="form" v-loading="formLoading" label-width="100px">
        <el-row :key="index"  v-for="(titleItem,index) in form.titleItems">
          <h3>{{titleItem.name}}</h3>
          <el-card class="exampaper-item-box" v-if="titleItem.questionItems.length!==0">
            <el-form-item :key="questionItem.itemOrder" :label="questionItem.itemOrder+'.'"
                          v-for="questionItem in titleItem.questionItems"
                          class="exam-question-item"  label-width="50px" :id="'question-'+ questionItem.itemOrder">
              <QuestionAnswerShow :qType="questionItem.questionType" :question="questionItem"  :answer="answer.answerItems[questionItem.itemOrder-1]"/>
            </el-form-item>
          </el-card>
        </el-row>
        <el-row class="do-align-center" v-show="printShow">
          <el-button type="primary" @click="printPage">打印</el-button>
          <el-button @click="cancelForm">取消</el-button>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatSeconds } from '@/utils'
import QuestionAnswerShow from '@/components/QuestionAnswerShow'
import examPaperAnswerApi from '@/api/examPaperAnwser'
export default {
  components: { QuestionAnswerShow },
  data () {
    return {
      form: {},
      formLoading: false,
      printShow: true,
      answer: {
        id: null,
        score: 0,
        doTime: 0,
        answerItems: [],
        doRight: false
      }
    }
  },
  created () {
    let id = this.$route.query.id
    let _this = this
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true
      examPaperAnswerApi.read(id).then(re => {
        _this.form = re.response.paper
        _this.answer = re.response.answer
        _this.formLoading = false
      })
    }
  },
  methods: {
    formatSeconds (theTime) {
      return formatSeconds(theTime)
    },
    questionDoRightTag (status) {
      return this.enumFormat(this.doRightTag, status)
    },
    printPage () {
      this.printShow = false
      setTimeout(function () {
        window.print()
      }, 1000)
    },
    cancelForm () {
      window.close()
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doRightTag: state => state.exam.question.answer.doRightTag
    })
  }
}
</script>

<style lang="scss" scoped>

/*  @page {
    margin: 25px;
  }*/

  .align-center {
    text-align: center
  }

  .exam-question-item{
    padding: 10px;
    .el-form-item__label{
      font-size: 15px !important;
    }
  }

  .question-title-padding{
    padding-left: 25px;
    padding-right: 25px;
  }
</style>
