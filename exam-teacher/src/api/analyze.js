import { post } from '@/utils/request'

export default {
  paperClasses: id => post('/api/teacher/analyze/paperClasses/' + id)
}
