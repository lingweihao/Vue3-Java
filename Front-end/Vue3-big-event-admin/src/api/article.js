import request from '@/utils/request'

// import { useUserStore } from '@/stores/modules/user.js'
// 分类: 获取文章分类
export const artGetChannelsService = () => request.get('/category')

// 分类: 添加文章分类
export const artAddChannelService = (data) => request.post('/category', data)

// 分类: 编辑文章分类
export const artEditChannelService = (data) => request.put('/category', data)

// 分类: 删除文章分类
export const artDelChannelService = (id) => {
  return request.delete('/category?id=' + id)
}

// 文章: 获取文章列表
export const artGetListService = (params) => {
  return request.get('/article', { params })
}

// 文章: 添加文章
// 注意： data需要是一个formData格式对象
export const artPublishService = (data) => request.post('/article', data)

// 文章：获取文章详情
export const artGetDetailService = (id) =>
  request.get('/article/detail', {
    params: { id }
  })

// 文章：编辑文章
export const artEditService = (data) => {
  request.put('/article', data), console.log(data)
}

//文章分类列表查询
export const articleCategoryListService = () => {
  return request.get('/category')
}

//文章分类添加
export const articleCategoryAddService = (categoryData) => {
  return request.post('/category', categoryData)
}

//文章分类修改
export const articleCategoryUpdateService = (categoryData) => {
  return request.put('/category', categoryData)
}

//文章分类删除
export const articleCategoryDeleteService = (id) => {
  return request.delete('/category?id=' + id)
}

//文章列表查询
export const articleListService = (params) => {
  return request.get('/article', { params: params })
}

//文章添加
export const articleAddService = (articleData) => {
  return request.post('/article', articleData)
}

//文章删除
export const articleDeleteService = (id) => {
  return request.delete('/article', { params: { id } })
}
