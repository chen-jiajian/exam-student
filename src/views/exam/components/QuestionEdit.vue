<template>
  <div style="line-height:1.8">
    <div v-if="qType==1" v-loading="qLoading">
      <div class="q-title" v-html="question.title"/>
      <div class="q-content">
        <el-radio-group v-model="answer.content" @change="answer.completed = true" border size="medium">
          <el-radio  v-for="item in question.items"  :key="item.prefix"  :label="item.prefix" size="medium">
            <span class="question-prefix">{{item.prefix}}.</span>
            <span v-html="item.content" class="q-item-span-content"></span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-else-if="qType==2" v-loading="qLoading">
      <div class="q-title" v-html="question.title"/>
      <div class="q-content">
        <el-checkbox-group v-model="answer.contentArray" @change="answer.completed = true" >
          <el-checkbox v-for="item in question.items" :label="item.prefix" :key="item.prefix"  >
            <span class="question-prefix">{{item.prefix}}.</span>
            <span v-html="item.content" class="q-item-span-content"></span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div v-else-if="qType==3" v-loading="qLoading">
      <div class="q-title" v-html="question.title" style="display: inline;margin-right: 10px"/>
      <span style="padding-right: 10px;">(</span>
      <el-radio-group v-model="answer.content" @change="answer.completed = true" >
        <el-radio  v-for="item in question.items"  :key="item.prefix"  :label="item.prefix" >
          <span v-html="item.content" class="q-item-span-content"></span>
        </el-radio>
      </el-radio-group>
      <span style="padding-left: 10px;">)</span>
    </div>
    <div v-else-if="qType==4" v-loading="qLoading">
      <div class="q-title" v-html="question.title"/>
      <div>
        <el-form-item :label="item.prefix" :key="item.prefix"  v-for="item in question.items"  label-width="50px" style="margin-top: 10px;margin-bottom: 10px;">
          <div class="edit-preview">
            <div class="edit-preview-prefix">
              <el-input v-model="answer.contentArray[item.prefix-1]"  class="editor-input"   placeholder="填写答案"  @focus="inputClick(answer.contentArray,item.prefix-1)"   @change="answer.completed = true" />
            </div>
            <div v-html="answer.contentArray[item.prefix-1]" class="edit-preview-content"></div>
          </div>
        </el-form-item>
      </div>
    </div>
    <div v-else-if="qType==5" v-loading="qLoading">
      <div class="q-title" v-html="question.title"/>
      <div class="edit-preview" style="padding: 10px 0">
         <div class="edit-preview-prefix">
           <el-input   v-model="answer.content"  placeholder="填写答案"  class="editor-input"    @focus="inputClick(answer,'content')"   @change="answer.completed = true"/>
         </div>
         <div v-html="answer.content" class="edit-preview-content"></div>
      </div>
    </div>
    <div v-else>
    </div>
    <el-dialog  :visible.sync="richEditor.dialogVisible"  append-to-body :close-on-click-modal="false" style="width: 100%;height: 100%"   :show-close="false" center>
      <Ueditor @ready="editorReady"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editorConfirm">确 定</el-button>
        <el-button @click="richEditor.dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Ueditor from '@/components/Ueditor'

export default {
  components: {
    Ueditor
  },
  name: 'QuestionEdit',
  data () {
    return {
      richEditor: {
        dialogVisible: false,
        object: null,
        parameterName: '',
        instance: null
      }
    }
  },
  props: {
    question: {
      type: Object,
      default: function () {
        return {}
      }
    },
    answer: {
      type: Object,
      default: function () {
        return { id: null, content: '', contentArray: [] }
      }
    },
    qLoading: {
      type: Boolean,
      default: false
    },
    qType: {
      type: Number,
      default: 0
    }
  },
  methods: {
    editorReady (instance) {
      this.richEditor.instance = instance
      let currentContent = this.richEditor.object[this.richEditor.parameterName]
      if (currentContent !== null && currentContent !== undefined) {
        this.richEditor.instance.setContent(currentContent)
      }
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
        _this.richEditor.object[_this.richEditor.parameterName] = content
        _this.richEditor.dialogVisible = false
      })
    }
  }
}
</script>
