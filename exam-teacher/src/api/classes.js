import { post } from '@/utils/request'

export default {
  pageList: query => post('/api/teacher/classes/page', query),
  selectClasses: id => post('/api/teacher/classes/select/' + id),
  edit: query => post('/api/teacher/classes/edit', query),
  deleteClasses: id => post('/api/teacher/classes/deleteClasses/' + id),
  getAllClasses: () => post('/api/teacher/classes/selectAll'),
  classesUserPageList: query => post('/api/teacher/classes/page/classesUser', query),
  removeOutUser: id => post('/api/teacher/classes/removeOutUser/' + id)
}
