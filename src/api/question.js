import { post } from '@/utils/request'

export default {
  pageList: query => post('/api/student/question/page', query)
}
