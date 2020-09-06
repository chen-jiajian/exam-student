<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="100px" v-loading="formLoading"  :rules="rules">
      <el-form-item label="学科：" prop="subjectId" required>
        <el-select v-model="form.subjectId" placeholder="学科" @change="subjectChange">
          <el-option v-for="item in subjects" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题干：" prop="title" required>
        <el-input v-model="form.title"   @focus="inputClick(form,'title')" />
      </el-form-item>
      <el-form-item label="标答：" required>
        <el-form-item :label="item.prefix" :key="item.prefix"  v-for="item in form.items"  label-width="50px" class="question-item-label">
          <el-input v-model="item.content"   @focus="inputClick(item,'content')"  class="question-item-content-input"  style="width: 80%"/>
          <span class="question-item-span">分数：</span><el-input-number v-model="item.score" :precision="1" :step="1" :max="100"  ></el-input-number>
        </el-form-item>
      </el-form-item>
      <el-form-item label="解析：" prop="analyze">
        <el-input v-model="form.analyze"  @focus="inputClick(form,'analyze')" />
      </el-form-item>
      <el-form-item label="分数：" prop="score" required>
        <el-input-number v-model="form.score" :precision="1" :step="1" :max="100"></el-input-number>
      </el-form-item>
      <!--<el-form-item label="难度：" required>
        <el-rate v-model="form.difficult" class="question-item-rate"></el-rate>
      </el-form-item>-->
      <el-form-item label="知识点：" class="tree-select-contain">
        <treeselect v-model="form.knowledgeIdList" :multiple="true" :options="knowledge"    :normalizer="normalizer"
                    :show-count="true" valueConsistsOf="LEAF_PRIORITY"    noOptionsText="没有可用知识点"  placeholder="知识点" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="success" @click="showQuestion">预览</el-button>
      </el-form-item>
    </el-form>
    <el-dialog  :visible.sync="richEditor.dialogVisible"  append-to-body :close-on-click-modal="false" style="width: 100%;height: 100%"   :show-close="false" center>
      <Ueditor @ready="editorReady"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editorConfirm">确 定</el-button>
        <el-button @click="richEditor.dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="questionShow.dialog" style="width: 100%;height: 100%">
      <QuestionShow :qType="questionShow.qType" :question="questionShow.question" :qLoading="questionShow.loading"/>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import QuestionShow from '../components/Show'
import Ueditor from '@/components/Ueditor'
import { mapGetters, mapState, mapActions } from 'vuex'
import questionApi from '@/api/question'
import knowledgeApi from '@/api/knowledge'

export default {
  components: {
    Treeselect, Ueditor, QuestionShow
  },
  data () {
    return {
      knowledge: [],
      normalizer (node) {
        if (node.child === null) {
          return {
            id: node.id,
            label: node.name
          }
        } else {
          return {
            id: node.id,
            label: node.name,
            children: node.child
          }
        }
      },
      form: {
        id: null,
        questionType: 4,
        subjectId: null,
        title: '',
        items: [],
        analyze: '',
        correct: '',
        score: '',
        difficult: 2,
        knowledgeIdList: []
      },
      subjectFilter: null,
      formLoading: false,
      rules: {
        subjectId: [
          { required: true, message: '请选择学科', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入题干', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入分数', trigger: 'blur' }
        ]
      },
      richEditor: {
        dialogVisible: false,
        object: null,
        parameterName: '',
        instance: null
      },
      questionShow: {
        qType: 0,
        dialog: false,
        question: null,
        loading: false
      }
    }
  },
  created () {
    let id = this.$route.query.id
    let _this = this
    this.initSubject(function () {
      _this.subjectFilter = _this.subjects
    })

    if (id && parseInt(id) !== 0) {
      this.formLoading = true
      questionApi.select(id).then(re => {
        this.form = re.response
        knowledgeApi.select(this.form.subjectId).then(re => {
          this.knowledge = re.response
        })
        this.formLoading = false
      })
    }
  },
  methods: {
    editorReady (instance) {
      this.richEditor.instance = instance
      let currentContent = this.richEditor.object[this.richEditor.parameterName]
      this.richEditor.instance.setContent(currentContent)
      this.richEditor.instance.focus()
    },
    inputClick (object, parameterName) {
      this.richEditor.object = object
      this.richEditor.parameterName = parameterName
      this.richEditor.dialogVisible = true
    },
    editorConfirm () {
      let _this = this
      this.richEditor.instance.getKfContent(function () {
        let content = _this.richEditor.instance.getContent()
        if (_this.richEditor.parameterName === 'title') { // 题干的正确答案重置
          if (_this.questionItemReset(content)) {
            _this.richEditor.object[_this.richEditor.parameterName] = content
            _this.richEditor.dialogVisible = false
          } else {
          }
        } else {
          _this.richEditor.object[_this.richEditor.parameterName] = content
          _this.richEditor.dialogVisible = false
        }
      })
    },
    questionItemReset (content) {
      let spanRegex = new RegExp('<span class="gapfilling-span (.*?)">(.*?)<\\/span>', 'g')
      let _this = this
      let newFormItem = []
      let gapfillingItems = content.match(spanRegex)
      if (gapfillingItems === null) {
        this.$message.error('请插入填空')
        return false
      }
      gapfillingItems.forEach(function (span, index) {
        let pairRegex = /<span class="gapfilling-span (.*?)">(.*?)<\/span>/
        pairRegex.test(span)
        newFormItem.push({ id: null, prefix: RegExp.$2, content: '', score: '0' })
      })

      newFormItem.forEach(function (item) {
        _this.form.items.some((oldItem, index) => {
          if (oldItem.itemUuid === item.itemUuid) {
            item.content = oldItem.content
            item.id = oldItem.id
            item.score = oldItem.score
            return true
          }
        })
      })
      _this.form.items = newFormItem
      return true
    },
    subjectChange () {
      this.form.knowledgeIdList = []
      knowledgeApi.select(this.form.subjectId).then(re => {
        this.knowledge = re.response
      })
    },
    submitForm () {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          questionApi.edit(this.form).then(re => {
            if (re.code === 1) {
              _this.$message.success(re.message)
              _this.delCurrentView(_this).then(() => {
                _this.$router.push('/question/list')
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
    showQuestion () {
      let _this = this
      this.questionShow.dialog = true
      this.questionShow.loading = true
      questionApi.select(this.form.id).then(re => {
        _this.questionShow.qType = re.response.questionType
        _this.questionShow.question = re.response
        _this.questionShow.loading = false
      })
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
      questionTypeEnum: state => state.exam.question.typeEnum
    }),
    ...mapState('exam', { subjects: state => state.subjects })
  }
}
</script>
