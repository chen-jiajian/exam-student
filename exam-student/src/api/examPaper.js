import { post } from '@/utils/request'

export default {
  select: id => post('/api/student/exam/paper/select/' + id),
  pageList: query => post('/api/student/exam/paper/pageList', query),
  build: query => post('/api/student/exam/paper/build', query)
}
