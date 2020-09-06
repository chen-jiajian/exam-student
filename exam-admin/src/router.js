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
    children: [
      {
        path: 'student/list',
        component: () => import('@/views/user/student/list'),
        name: 'UserStudentPageList',
        meta: { title: '学生列表', noCache: true }
      },
      {
        path: 'student/edit',
        component: () => import('@/views/user/student/edit'),
        name: 'UserStudentEdit',
        meta: { title: '学生创编', noCache: true, activeMenu: '/user/student/list' },
        hidden: true
      },
      {
        path: 'teacher/list',
        component: () => import('@/views/user/teacher/list'),
        name: 'UserTeacherPageList',
        meta: { title: '教师列表', noCache: true }
      },
      {
        path: 'teacher/edit',
        component: () => import('@/views/user/teacher/edit'),
        name: 'UserTeacherEdit',
        meta: { title: '教师创编', noCache: true, activeMenu: '/user/teacher/list' },
        hidden: true
      },
      {
        path: 'admin/list',
        component: () => import('@/views/user/admin/list'),
        name: 'UserAdminPageList',
        meta: { title: '管理员列表', noCache: true }
      },
      {
        path: 'admin/edit',
        component: () => import('@/views/user/admin/edit'),
        name: 'UserAdminEdit',
        meta: { title: '管理员创编', noCache: true, activeMenu: '/user/admin/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    name: 'SubjectPage',
    meta: {
      title: '学科管理',
      icon: 'education'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/subject/list'),
        name: 'SubjectListPage',
        meta: { title: '学科列表', noCache: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/subject/edit'),
        name: 'SubjectEditPage',
        meta: { title: '学科创编', noCache: true }
      }
    ]
  },
  {
    path: '/knowledge',
    component: Layout,
    name: 'KnowledgePage',
    meta: {
      title: '知识点管理',
      icon: 'star'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/knowledge/list'),
        name: 'KnowledgeListPage',
        meta: { title: '知识点列表', noCache: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/knowledge/edit'),
        name: 'KnowledgeEditPage',
        meta: { title: '知识点创编', noCache: true }
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
    path: '/task',
    component: Layout,
    name: 'TaskPage',
    meta: {
      title: '任务管理',
      icon: 'task'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/task/list'),
        name: 'TaskListPage',
        meta: { title: '任务列表', noCache: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/task/edit'),
        name: 'TaskEditPage',
        meta: { title: '任务创编', noCache: true }
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    name: 'VideoPage',
    meta: {
      title: '视频管理',
      icon: 'video'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/video/list'),
        name: 'VideoListPage',
        meta: { title: '视频列表', noCache: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/video/edit'),
        name: 'VideoEditPage',
        meta: { title: '视频创编', noCache: true }
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
    path: '/message',
    component: Layout,
    name: 'MessagePage',
    meta: {
      title: '消息中心',
      icon: 'message'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/message/list'),
        name: 'MessageListPage',
        meta: { title: '消息列表', noCache: true }
      },
      {
        path: 'send',
        component: () => import('@/views/message/send'),
        name: 'MessageSendPage',
        meta: { title: '消息发送', noCache: true }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    name: 'LogPage',
    meta: {
      title: '日志中心',
      icon: 'log'
    },
    alwaysShow: true,
    children: [
      {
        path: 'user/list',
        component: () => import('@/views/log/list'),
        name: 'LogUserPage',
        meta: { title: '用户日志', noCache: true }
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
