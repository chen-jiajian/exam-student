import { post } from '@/utils/request'

export default {
  list: query => post('/api/admin/video/list'),
  pageList: query => post('/api/admin/video/page', query),
  edit: query => post('/api/admin/video/edit', query),
  select: id => post('/api/admin/video/select/' + id),
  deleteVideo: id => post('/api/admin/video/delete/' + id)
}
