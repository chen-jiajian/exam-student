import { post } from '@/utils/request'

export default {
  list: query => post('/api/admin/subject/list'),
  pageList: query => post('/api/admin/subject/page', query),
  edit: query => post('/api/admin/subject/edit', query),
  select: id => post('/api/admin/subject/select/' + id),
  deleteSubject: id => post('/api/admin/subject/delete/' + id)
}
