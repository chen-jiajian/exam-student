<template>
  <div class="dashboard-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="group" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              班级总数
            </div>
            <count-to :start-val="0" :end-val="classesCount" :duration="2600" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" >
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="users" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              班级总人数
            </div>
            <count-to :start-val="0" :end-val="userCount" :duration="3000" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="doexampaper" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              试卷总数
            </div>
            <count-to :start-val="0" :end-val="examPaperCount" :duration="3600" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="doquestion" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              题目总数
            </div>
            <count-to :start-val="0" :end-val="questionCount" :duration="3200" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" style="padding-right: 10px;">
        <div id="echarts-classes-user"   style="width: 100%;height:400px;background: white;padding-top: 20px;" v-loading="loading"/>
      </el-col>
      <el-col :span="12" style="padding-left: 10px;">
        <div id="echarts-classes-paper" style="width: 100%;height:400px;background: white;padding-top: 20px;" v-loading="loading"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import resize from './components/mixins/resize'
import CountTo from 'vue-count-to'
import dashboardApi from '@/api/dashboard'
export default {
  mixins: [resize],
  components: {
    CountTo
  },
  data () {
    return {
      classesCount: 0,
      userCount: 0,
      examPaperCount: 0,
      questionCount: 0,
      loading: false
    }
  },
  mounted () {
    let _this = this
    this.loading = true
    dashboardApi.index().then(re => {
      let response = re.response
      _this.classesCount = response.classesCount
      _this.userCount = response.userCount
      _this.examPaperCount = response.examPaperCount
      _this.questionCount = response.questionCount
      // eslint-disable-next-line no-undef
      let echartsClassesUser = echarts.init(document.getElementById('echarts-classes-user'), 'macarons')
      echartsClassesUser.setOption(this.option('班级人数分布', '班级人数', response.classUserPie))

      // eslint-disable-next-line no-undef
      let echartsClassesPaper = echarts.init(document.getElementById('echarts-classes-paper'), 'macarons')
      echartsClassesPaper.setOption(this.option('班级试卷分布', '试卷数', response.classPaperPie))

      this.loading = false
    })
  },
  methods: {
    option (title, seriesName, data) {
      return {
        title: {
          text: title,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: seriesName,
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .dashboard-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }

  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }

  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }

  .echarts-line{
    background:#fff;
    padding:16px 16px 0;
    margin-bottom:32px;
  }

</style>
