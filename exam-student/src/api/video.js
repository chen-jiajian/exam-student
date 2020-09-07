import { post } from '@/utils/request'

export default {
  pageList: query => post('/api/student/video/pageList', query)
}
