import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'UserPage',
    meta: {
      title: '用户管理',
      icon: 'users'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/list'),
        name: 'UserStudentPageList',
        meta: { title: '学生列表', noCache: true }
      }
    ]
  },
  {
    path: '/classes',
    component: Layout,
    name: 'ClassesPage',
    meta: {
      title: '班级管理',
      icon: 'group'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/classes/list'),
        name: 'ClassesListPage',
        meta: { title: '班级列表', noCache: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/classes/edit'),
        name: 'ClassesEditPage',
        meta: { title: '班级创建', noCache: true }
      }
    ]
  },
  {
    path: '/paper',
    component: Layout,
    name: 'PaperPage',
    meta: {
      title: '卷库管理',
      icon: 'paper'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/paper/list'),
        name: 'ExamPaperPageList',
        meta: { title: '试卷列表', noCache: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/paper/edit'),
        name: 'ExamPaperEdit',
        meta: { title: '试卷创编', noCache: true }
      }
    ]
  },
  {
    path: '/question',
    component: Layout,
    name: 'QuestionPage',
    meta: {
      title: '题库管理',
      icon: 'question'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/question/list'),
        name: 'ExamQuestionPageList',
        meta: { title: '题目列表', noCache: true }
      },
      {
        path: 'edit/singleChoice',
        component: () => import('@/views/question/edit/single-choice'),
        name: 'singleChoicePage',
        meta: { title: '单选题创编', noCache: true }
      },
      {
        path: 'edit/multipleChoice',
        component: () => import('@/views/question/edit/multiple-choice'),
        name: 'multipleChoicePage',
        meta: { title: '多选题创编', noCache: true }
      },
      {
        path: 'edit/trueFalse',
        component: () => import('@/views/question/edit/true-false'),
        name: 'trueFalsePage',
        meta: { title: '判断题创编', noCache: true }
      },
      {
        path: 'edit/gapFilling',
        component: () => import('@/views/question/edit/gap-filling'),
        name: 'gapFillingPage',
        meta: { title: '填空题创编', noCache: true }
      },
      {
        path: 'edit/shortAnswer',
        component: () => import('@/views/question/edit/short-answer'),
        name: 'shortAnswerPage',
        meta: { title: '简答题创编', noCache: true }
      }
    ]
  },
  {
    path: '/answer',
    component: Layout,
    name: 'AnswerPage',
    meta: {
      title: '答卷管理',
      icon: 'answer'
    },
    alwaysShow: true,
    children: [
      {
        path: 'judgeList',
        component: () => import('@/views/answer/judge/list'),
        name: 'AnswerJudgePageList',
        meta: { title: '批改列表', noCache: true }
      },
      {
        path: 'judge',
        component: () => import('@/views/answer/judge/edit'),
        name: 'AnswerJudgePage',
        meta: { title: '批改试卷', noCache: true, activeMenu: '/answer/judgeList' },
        hidden: true
      },
      {
        path: 'completeList',
        component: () => import('@/views/answer/complete/list'),
        name: 'AnswerCompletePageList',
        meta: { title: '试卷完成', noCache: true }
      },
      {
        path: 'completeRead',
        component: () => import('@/views/answer/complete/read'),
        name: 'AnswerCompleteRead',
        meta: { title: '查看试卷', noCache: true, activeMenu: '/answer/completeList' },
        hidden: true
      }
    ]
  },
  {
    path: '/analyze',
    component: Layout,
    name: 'AnalyzePager',
    alwaysShow: true,
    meta: {
      title: '成绩分析',
      icon: 'analyze'
    },
    children: [
      {
        path: 'paper/list',
        component: () => import('@/views/analyze/list'),
        name: 'AnalyzePagerPageList',
        meta: { title: '试卷列表', noCache: true }
      },
      {
        path: 'paper/classes',
        component: () => import('@/views/analyze/paperClasses'),
        name: 'AnalyzePaperClassesPageList',
        meta: { title: '试卷班级成绩', noCache: true, activeMenu: '/analyze/paper/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人简介', icon: 'user', noCache: true }
      }
    ]
  },
  { path: '/answer/print',
    hidden: true,
    component: () => import('@/views/answer/complete/print'),
    meta: { title: '试卷结果打印', noCache: true }
  },
  { path: '/paper/print',
    hidden: true,
    component: () => import('@/views/paper/print'),
    meta: { title: '试卷打印', noCache: true }
  },
  { path: '*',
    hidden: true,
    component: () => import('@/views/error-page/404'),
    meta: { title: '404', noCache: true }
  }
]

const router = new Router({
  routes: constantRoutes
})

export {
  constantRoutes,
  router
}
