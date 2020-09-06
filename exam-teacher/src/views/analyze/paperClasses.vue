<template>
  <div class="dashboard-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="item in classAvg" :key="item.name">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <div>{{item.name}}</div>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              平均分
            </div>
            <span class="card-panel-num">{{item.avgScore}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="echarts-line" v-for="(item,index) in classesScore" :key="index">
      <div :id="'echarts-'+index" style="width: 100%;height:400px;" v-loading="loading"/>
    </el-row>
  </div>
</template>

<script>
import analyzeApi from '@/api/analyze'

export default {
  data () {
    return {
      classAvg: [{ name: 'demo', avgScore: '0' }],
      classesScore: [],
      loading: false
    }
  },
  created () {
    // init echarts div
    for (let i = 0; i < 20; i++) {
      this.classesScore.push({ name: i, x: [1], y: [2] })
    }
  },
  mounted () {
    let id = this.$route.query.id
    let _this = this
    if (id && parseInt(id) !== 0) {
      _this.loading = true
      analyzeApi.paperClasses(id).then(re => {
        _this.classAvg = re.response.classAvg
        _this.classesScore = re.response.classesScore
        for (let i = 0; i < _this.classesScore.length; i++) {
          let item = _this.classesScore[i]
          // eslint-disable-next-line no-undef
          let chart = echarts.init(document.getElementById('echarts-' + i), 'macarons')
          chart.setOption(this.option(item.name, item.x, item.y))
        }
        _this.loading = false
      })
    }
  },
  methods: {
    option (title, x, y) {
      return {
        title: {
          text: title,
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: x,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '分数',
            type: 'bar',
            barWidth: '60%',
            data: y
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

      .card-panel-icon-wrapper {
        float: left;
        margin: 26px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        font-size: 18px;
        width: 150px;
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

  .echarts-line {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
