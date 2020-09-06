import { post } from '@/utils/request'

export default {
  page: query => post('/api/admin/knowledge/page', query),
  edit: query => post('/api/admin/knowledge/edit', query),
  select: id => post('/api/admin/knowledge/select/' + id),
  delete: id => post('/api/admin/knowledge/delete/' + id)
}
