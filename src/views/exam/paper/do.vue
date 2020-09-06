<template>
  <div>
    <el-row  class="do-exam-title">
      <el-col :span="24">
<!--        <div v-if="!form.random">-->
<!--          <span :key="item.itemOrder"  v-for="item in answer.answerItems">-->
<!--             <el-tag :type="questionCompleted(item.completed)" class="do-exam-title-tag" @click="goAnchor('#question-'+item.itemOrder)">{{item.itemOrder}}</el-tag>-->
<!--         </span>-->
<!--        </div>-->
        <span class="do-exam-time">
          <label>剩余时间：</label>
          <label>{{formatSeconds(remainTime)}}</label>
        </span>
      </el-col>
    </el-row>
<!--    <el-row  class="do-exam-title-hidden">-->
<!--      <el-col :span="24">-->
<!--        <span :key="item.itemOrder"  v-for="item in answer.answerItems">-->
<!--             <el-tag  class="do-exam-title-tag" >{{item.itemOrder}}</el-tag>-->
<!--        </span>-->
<!--        <span class="do-exam-time">-->
<!--          <label>剩余时间：</label>-->
<!--        </span>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <div class="topic-card-btn">
<!--      <el-button @click="questionCard = true">答题卡</el-button>-->
    </div>
    <el-container  class="app-item-contain">
      <el-row class="topic-btn">
        <el-button type="primary" @click="lastTopic">上一题</el-button>
        <el-button @click="nextTopic">下一题</el-button>
        <el-button @click="questionCard = true">答题卡</el-button>
      </el-row>
      <el-header class="align-center">
        <h1>{{form.name}}</h1>
        <div>
          <span class="question-title-padding">试卷总分：{{form.score}}</span>
          <span class="question-title-padding">考试时间：{{form.suggestTime}}分钟</span>
        </div>
      </el-header>
      <el-main class="topic-main">
        <h3>
          <span v-if="!form.random">正常题型</span>
          <span v-else>随机题型</span>
          {{(currentIndex + 1) + ' / ' + normalQuestions.length}}</h3>
        <el-form :model="form" ref="form" v-loading="formLoading" label-width="100px" >
          <div class="exam-question-item">
            <span class="question-index">{{(currentIndex + 1)+'.'}}</span>
            <QuestionEdit :qType="topicItem.questionType" :question="topicItem"
                          :answer="answer.answerItems[topicItem.itemOrder-1]"/>
          </div>
<!--          <el-form-item :label="topicItem.itemOrder+'.'"-->
<!--                        class="exam-question-item" label-width="50px" :id="'question-'+ topicItem.itemOrder">-->
<!--            <QuestionEdit :qType="topicItem.questionType" :question="topicItem"-->
<!--                          :answer="answer.answerItems[topicItem.itemOrder-1]"/>-->
<!--          </el-form-item>-->
<!--          <el-row v-if="!form.random">-->
<!--            <el-row :key="index"  v-for="(titleItem,index) in form.titleItems">-->
<!--              <h3>{{titleItem.name}}</h3>-->
<!--              <el-card class="exampaper-item-box" v-if="titleItem.questionItems.length!==0">-->
<!--                <el-form-item :key="questionItem.itemOrder" :label="questionItem.itemOrder+'.'"-->
<!--                              v-for="questionItem in titleItem.questionItems"-->
<!--                              class="exam-question-item" label-width="50px" :id="'question-'+ questionItem.itemOrder">-->
<!--                  <QuestionEdit :qType="questionItem.questionType" :question="questionItem"-->
<!--                                :answer="answer.answerItems[questionItem.itemOrder-1]"/>-->
<!--                </el-form-item>-->
<!--              </el-card>-->
<!--            </el-row>-->
<!--          </el-row>-->
<!--          <el-row v-if="form.random">-->
<!--            <h3>随机题型</h3>-->
<!--            <el-card class="exampaper-item-box">-->
<!--              <el-form-item :key="questionItem.itemOrder" :label="index + 1 +'.'"-->
<!--                            v-for="(questionItem, index) in randomQuestions"-->
<!--                            class="exam-question-item" label-width="50px" :id="'question-'+ questionItem.itemOrder">-->
<!--                <QuestionEdit :qType="questionItem.questionType" :question="questionItem"-->
<!--                              :answer="answer.answerItems[questionItem.itemOrder-1]"/>-->
<!--              </el-form-item>-->
<!--            </el-card>-->
<!--          </el-row>-->

           <el-row class="do-align-center" v-if="currentIndex === normalQuestions.length - 1">
             <el-button type="primary" @click="submitForm">提交</el-button>
<!--             <el-button @click="cancelForm">取消</el-button>-->
           </el-row>
        </el-form>
      </el-main>
    </el-container>
    <el-dialog
        title="答题卡"
        :visible.sync="questionCard"
        width="50%">
      <div class="card-content">
        <span v-for="(i,idx) in normalQuestions" class="card-item" :key="i.itemOrder" @click="selectTopic(idx)">
          {{idx + 1}}
        </span>
      </div>
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="questionCard = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="questionCard = false">确 定</el-button>-->
<!--      </span>-->
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatSeconds, disableEvent, rsaDecryptStr, aesDecryptStr } from '@/utils'
import QuestionEdit from '../components/QuestionEdit'
import examPaperApi from '@/api/examPaper'
import examPaperAnswerApi from '@/api/examPaperAnswer'

export default {
  components: { QuestionEdit },
  data () {
    return {
      form: {},
      formLoading: false,
      answer: {
        questionId: null,
        doTime: 0,
        answerItems: []
      },
      timer: null,
      remainTime: 0,
      remainStoreKey: null,
      answerStoreKey: null,
      randomQuestions: [],
      normalQuestions: [],
      currentIndex: 0,
      questionCard: false // 答题卡
    }
  },
  created () {
    let id = this.$route.query.id
    this.remainStoreKey = 'xdd_remainTime' + '_' + id + '_' + this.userName
    this.answerStoreKey = 'xdd_answer' + '_' + id + '_' + this.userName
    let _this = this
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true
      examPaperApi.select(id).then(re => {
        let aesKey = rsaDecryptStr(process.env.VUE_APP_QuestionPrivateKey, re.message)
        let content = aesDecryptStr(aesKey, re.response)
        _this.form = JSON.parse(content)
        _this.remainTime = _this.form.suggestTime * 60
        _this.initAnswer()
        _this.timeReduce()
        _this.formLoading = false
      })
    }
  },
  mounted () {
    disableEvent()
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  },
  methods: {
    formatSeconds (theTime) {
      return formatSeconds(theTime)
    },
    timeReduce () {
      let _this = this
      this.timer = setInterval(function () {
        if (!_this.formLoading) {
          if (_this.remainTime <= 0) {
            _this.submitForm()
          } else {
            ++_this.answer.doTime
            --_this.remainTime
          }
        }
      }, 1000)
    },
    questionCompleted (completed) {
      return this.enumFormat(this.doCompletedTag, completed)
    },
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' })
    },
    initAnswer () {
      this.answer.id = this.form.id
      let titleItemArray = this.form.titleItems
      for (let tIndex in titleItemArray) {
        let questionArray = titleItemArray[tIndex].questionItems
        for (let qIndex in questionArray) {
          let question = questionArray[qIndex]
          this.randomQuestions.push(question)
          this.normalQuestions.push(question)
          this.answer.answerItems.push({ questionId: question.id, content: null, contentArray: [], completed: false, itemOrder: question.itemOrder })
        }
      }
      if (this.form.random) {
        this.normalQuestions.sort(() => Math.random() - 0.5)
        this.randomQuestions.sort(() => Math.random() - 0.5)
      }
    },
    submitForm () {
      let _this = this
      window.clearInterval(_this.timer)
      _this.formLoading = true
      examPaperAnswerApi.answerSubmit(this.answer).then(re => {
        if (re.code === 1) {
          _this.$alert('试卷得分：' + re.response + '分', '考试结果', {
            confirmButtonText: '返回考试记录',
            callback: action => {
              _this.$router.push('/record/index')
            }
          })
        } else {
          _this.$message.error(re.message)
        }
        _this.formLoading = false
      }).catch(e => {
        _this.formLoading = false
      })
    },
    cancelForm () {
      window.close()
    },
    selectTopic (index) {
      this.currentIndex = index
      this.questionCard = false
    },
    lastTopic () {
      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.$message('已经是第一道题了')
      }
    },
    nextTopic () {
      if (this.currentIndex < this.normalQuestions.length - 1) {
        this.currentIndex++
      } else {
        this.$message('已经是最后一道题了')
      }
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doCompletedTag: state => state.exam.question.answer.doCompletedTag
    }),
    ...mapState('user', {
      userName: state => state.userName
    }),
    topicItem (index) {
      return this.normalQuestions[this.currentIndex]
    }
  }
}
</script>

<style lang="scss" scoped>
  .align-center {
    text-align: center
  }

  .exam-question-item {
    padding: 10px;
    display: flex;
    font-size: 24px;
    .question-index {
      line-height: 51px;
      width: 30px;
    }

    .el-form-item__label {
      font-size: 15px !important;
    }
  }
  .topic-main {
    margin: 100px 0;
  }
  .topic-card-btn {
    position: fixed;
    right: 20px;
    top: 400px;
  }
  .topic-btn {
    position: absolute;
    right: 40px;
    top: 113px;
  }
  .card-content {
    overflow: hidden;
    .card-item {
      margin: 8px;
      float: left;
      width: 34px;
      height: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #f5f5f5;
      border-radius: 50%;
      /*box-shadow: 0 0 8px 8px #f2f2f2;*/
      cursor: pointer;
    }
    .card-item:hover{
      opacity: 0.7;
    }
    .card-item:active{
      opacity: 1;
    }
  }
  .question-title-padding {
    padding-left: 25px;
    padding-right: 25px;
  }
</style>
