import { post } from '@/utils/request'

export default {
  select: id => post('/api/teacher/knowledge/select/' + id)
}
