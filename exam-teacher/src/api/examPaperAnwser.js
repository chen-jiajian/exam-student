import { post } from '@/utils/request'

export default {
  judgePageList: query => post('/api/teacher/examPaperAnswer/page/judge', query),
  completePageList: query => post('/api/teacher/examPaperAnswer/page/complete', query),
  read: id => post('/api/teacher/examPaperAnswer/read/' + id),
  edit: form => post('/api/teacher/examPaperAnswer/edit', form)
}
