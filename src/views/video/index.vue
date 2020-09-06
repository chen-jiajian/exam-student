<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-row>
      <label>学科：</label>
      <el-radio-group v-model="queryParam.subjectId" size="mini" @change="subjectChange" style="margin-left: 10px">
        <el-radio v-for="item in subjectList" size="mini" :key="item.id" :label="item.id">{{item.name}}</el-radio>
      </el-radio-group>
    </el-row>
    <el-row>
      <div style="padding: 20px;" v-loading="listLoading">
        <el-card :key="item.id" v-for="item in tableData" class="video-card">
          <div style="display: flex;flex-direction: column">
            <div style="width: 380px;float: left;">
              <video-player class="video-player vjs-custom-skin" style="object-fit:fill;" ref="videoPlayer"
                            :playsinline="true" :options="playerOption(item.src, item.poster)"/>
            </div>
            <label style="margin-top: 20px;padding: 0px 10px;">{{item.name}}</label>
            <div style="padding: 0px 10px;display: flex;flex-direction: row">
              <span style="color: #999;flex: 1;line-height: 36px;font-size: 13px">{{item.examPaperName}}</span>
              <router-link target="_blank" :to="{path:'/do',query:{id:item.examPaperId}}">
                <el-button type="text" class="button">开始做题</el-button>
              </router-link>
            </div>
          </div>
        </el-card>
      </div>
    </el-row>
    <el-row style="text-align: center">
      <pagination v-show="total>0" :total="total" :background="false" :page.sync="queryParam.pageIndex"
                  :limit.sync="queryParam.pageSize"
                  @pagination="search" style="margin-top: 20px"/>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import videoApi from '@/api/video'
import subjectApi from '@/api/subject'

export default {
  components: { Pagination },
  data () {
    return {
      queryParam: {
        subjectId: 0,
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: false,
      subjectList: [],
      tableData: [],
      total: 0
    }
  },
  created () {
    this.initSubject()
  },
  methods: {
    initSubject () {
      let _this = this
      subjectApi.list().then(re => {
        _this.subjectList = re.response
        let subjectId = _this.subjectList[0].id
        _this.queryParam.subjectId = subjectId
        _this.tabId = subjectId.toString()
        _this.search()
      })
    },
    search () {
      this.listLoading = true
      videoApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    playerOption (src, poster) {
      return {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'none', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: src // url地址
        }],
        poster: poster, // 你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    },
    subjectChange (tab, event) {
      this.search()
    }
  }
}
</script>

<style lang="scss">
  .video-card {
    width: 380px;
    margin: 15px;
    float: left;

    .el-card__body {
      padding: 0px !important;
    }
  }
</style>
