<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="100px" v-loading="formLoading" :rules="rules">
      <el-form-item label="年级：" prop="level" required>
        <el-select v-model="form.level" placeholder="年级" @change="levelChange">
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科：" prop="subjectId" required>
        <el-select v-model="form.subjectId" placeholder="学科">
          <el-option v-for="item in subjectFilter" :key="item.id" :value="item.id"
                     :label="item.name+' ( '+item.levelName+' )'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称：" prop="name" required>
        <el-input v-model="form.name" placeholder="名称"/>
      </el-form-item>
      <el-form-item label="封面：" prop="poster" required>
        <el-upload style="float: left;" accept=".jpg,.png"  :data="{folder:'image'}" action="/api/admin/upload/file"
                   :show-file-list="false" :on-progress="uploadProgress" :on-success="uploadImageSuccess">
          <el-button size="mini" type="success" class="link-left">上传图片</el-button>
        </el-upload>
        <el-image  style="float: left;margin-left: 30px;width: 220px; height: 124px"  :src="form.poster" :preview-src-list="[form.poster]"/>
      </el-form-item>
      <el-form-item label="视频：" prop="src" required>
        <el-upload style="float: left;" accept=".mp4" :data="{folder:'video'}" action="/api/admin/upload/file"
                   :show-file-list="false" :on-progress="uploadProgress" :on-success="uploadVideoSuccess">
          <el-button size="mini" type="success" class="link-left">上传视频</el-button>
        </el-upload>
        <div style="margin-left: 30px;width: 400px;float: left">
          <video-player class="video-player vjs-custom-skin"  style="object-fit:fill;"   ref="videoPlayer" :playsinline="true" :options="playerOptions"/>
        </div>
      </el-form-item>
      <el-form-item label="试卷：" prop="examPaperName" required>
        <el-button size="mini" type="success" class="link-left" @click="selectPaper">选择试卷</el-button>
        <label style="margin-left: 30px" >{{form.examPaperName}}</label>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="paperPage.showDialog"  width="70%">
      <el-form :model="paperPage.queryParam" ref="queryForm" :inline="true">
        <el-form-item label="试卷ID：">
          <el-input v-model="paperPage.queryParam.id" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectPaper">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="paperPage.listLoading"  @row-click="clickPaper" :data="paperPage.tableData" border fit highlight-current-row style="width: 100%" >
        <el-table-column prop="id" label="Id" width="90px"/>
        <el-table-column prop="name" label="名称"  />
        <el-table-column prop="createTime" label="创建时间" width="160px"/>
      </el-table>
      <pagination v-show="paperPage.total>0" :total="paperPage.total" :page.sync="paperPage.queryParam.pageIndex" :limit.sync="paperPage.queryParam.pageSize"
                  @pagination="search"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import videoApi from '@/api/video'
import examPaperApi from '@/api/examPaper'

export default {
  components: { Pagination },
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: '' // url地址
        }],
        poster: '', // 你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      form: {
        id: null,
        name: null,
        poster: '',
        src: null,
        level: null,
        subjectId: null,
        examPaperId: null,
        examPaperName: null
      },
      subjectFilter: null,
      formLoading: false,
      rules: {
        level: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        subjectId: [
          { required: true, message: '请选择学科', trigger: 'change' }
        ]
      },
      paperPage: {
        showDialog: false,
        queryParam: {
          id: null,
          subjectId: null,
          paperType: 1,
          pageIndex: 1,
          pageSize: 5
        },
        listLoading: false,
        tableData: [],
        total: 0
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
      _this.formLoading = true
      videoApi.select(id).then(re => {
        _this.form = re.response
        _this.form.poster = re.response.poster
        _this.playerOptions.poster = re.response.poster
        _this.playerOptions.sources[0].src = re.response.src
        _this.formLoading = false
      })
    }
  },
  methods: {
    levelChange () {
      this.form.subjectId = null
      this.subjectFilter = this.subjects.filter(data => data.level === this.form.level)
    },
    selectPaper () {
      this.paperPage.queryParam.pageIndex = 1
      this.paperPage.queryParam.subjectId = this.form.subjectId
      this.paperPage.showDialog = true
      this.search()
    },
    clickPaper (row, column, event) {
      this.form.examPaperId = row.id
      this.form.examPaperName = row.name
      this.paperPage.showDialog = false
    },
    search () {
      this.paperPage.listLoading = true
      examPaperApi.pageList(this.paperPage.queryParam).then(data => {
        const re = data.response
        this.paperPage.tableData = re.list
        this.paperPage.total = re.total
        this.paperPage.queryParam.pageIndex = re.pageNum
        this.paperPage.listLoading = false
      })
    },
    submitForm () {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          this.form.levelName = this.enumFormat(this.levelEnum, this.form.level)
          videoApi.edit(this.form).then(data => {
            if (data.code === 1) {
              _this.$message.success(data.message)
              _this.delCurrentView(_this).then(() => {
                _this.$router.push('/video/list')
              })
            } else {
              _this.$message.error(data.message)
              _this.formLoading = false
            }
          }).catch(e => {
            _this.formLoading = false
          })
        } else {
          return false
        }
      })
    },
    uploadProgress () {
      this.loading = this.$loading({
        lock: true,
        text: '文件上传中…',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      })
    },
    uploadImageSuccess (re, file) {
      this.loading.close()
      if (re.code === 1) {
        this.playerOptions.poster = re.response
        this.form.poster = re.response
      } else {
        this.$message.error(re.message)
      }
    },
    uploadVideoSuccess (re, file) {
      this.loading.close()
      if (re.code === 1) {
        this.form.src = re.response
        this.playerOptions.sources[0].src = re.response
      } else {
        this.$message.error(re.message)
      }
    },
    resetForm () {
      this.$refs['form'].resetFields()
    },
    ...mapActions('exam', { initSubject: 'initSubject' }),
    ...mapActions('tagsView', { delCurrentView: 'delCurrentView' })
  },
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapState('exam', { subjects: state => state.subjects }),
    ...mapState('enumItem', {
      levelEnum: state => state.user.levelEnum
    })
  }
}
</script>

<style lang="scss">

</style>
