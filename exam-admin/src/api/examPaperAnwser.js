import { post } from '@/utils/request'

export default {
  judgePageList: query => post('/api/admin/examPaperAnswer/page/judge', query),
  completePageList: query => post('/api/admin/examPaperAnswer/page/complete', query),
  read: id => post('/api/admin/examPaperAnswer/read/' + id),
  edit: form => post('/api/admin/examPaperAnswer/edit', form)
}
