<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="100px" v-loading="formLoading" :rules="rules">
      <el-form-item label="年级：" prop="level" required>
        <el-select v-model="form.level" placeholder="年级"  @change="levelChange">
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科：" prop="subjectId" required>
        <el-select v-model="form.subjectId" placeholder="学科" @change="subjectChange">
          <el-option v-for="item in subjectFilter" :key="item.id" :value="item.id" :label="item.name+' ( '+item.levelName+' )'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="知识点树：" required>
        <el-tree :data="knowledge"  :props="defaultProps"  style="margin-top: 7px"  node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span style="margin-left: 30px;">
              <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
            </span>
          </span>
        </el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addRoot">添加根节点</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog  :visible.sync="dialog.visible"  append-to-body :close-on-click-modal="false"   :show-close="false" center>
      <el-form>
        <el-form-item label="知识点名称：" label-width="100px">
          <el-input v-model="form.name"  clearable></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;margin-left: -100px">
          <el-button type="primary" @click="confirm">确 定</el-button>
          <el-button @click="dialog.visible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import knowledgeApi from '@/api/knowledge'

export default {
  data () {
    return {
      defaultProps: {
        label: 'name',
        children: 'child'
      },
      form: {
        id: null,
        level: null,
        subjectId: null,
        name: '',
        parentId: null
      },
      dialog: {
        visible: false
      },
      currentItem: null,
      knowledge: [],
      formLoading: false,
      subjectFilter: null,
      rules: {
        level: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        subjectId: [
          { required: true, message: '请选择学科', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    let id = this.$route.query.id
    let _this = this
    this.initSubject(function () {
      if (id && parseInt(id) !== 0) {
        let subject = _this.subjects.filter(data => data.id === id)[0]
        _this.subjectFilter = _this.subjects.filter(data => data.level === subject.level)
        _this.form.level = subject.level
        _this.form.subjectId = subject.id
        _this.subjectChange()
      }
    })
  },
  methods: {
    confirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          knowledgeApi.edit(this.form).then(re => {
            if (re.code === 1) {
              if (this.currentItem === null) {
                this.knowledge.push(re.response)
              } else {
                if (!this.currentItem.child) {
                  this.$set(this.currentItem, 'child', [])
                }
                this.currentItem.child.push(re.response)
              }
              this.dialog.visible = false
              this.formLoading = false
            } else {
              this.$message.error(re.message)
            }
          })
        } else {
          return false
        }
      })
    },
    addRoot () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.currentItem = null
          this.form.name = ''
          this.dialog.visible = true
        } else {
          return false
        }
      })
    },
    append (data) {
      this.currentItem = data
      this.form.parentId = data.id
      this.form.name = ''
      this.dialog.visible = true
    },
    remove (node, data) {
      const parent = node.parent
      const child = parent.data.child || parent.data
      const index = child.findIndex(d => d.id === data.id)
      knowledgeApi.delete(data.id).then(re => {
        child.splice(index, 1)
      })
    },
    resetForm () {
      this.$refs['form'].resetFields()
    },
    levelChange () {
      this.form.subjectId = null
      this.subjectFilter = this.subjects.filter(data => data.level === this.form.level)
    },
    subjectChange () {
      knowledgeApi.select(this.form.subjectId).then(re => {
        this.knowledge = re.response
        this.formLoading = false
      })
    },
    ...mapActions('exam', { initSubject: 'initSubject' }),
    ...mapActions('tagsView', { delCurrentView: 'delCurrentView' })
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      levelEnum: state => state.user.levelEnum
    }),
    ...mapState('exam', { subjects: state => state.subjects })
  }
}
</script>
