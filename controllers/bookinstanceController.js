const Bookinstance = require('../models/bookinstance');
const asyncHandler = require('express-async-handler');

// 显示完成的副本列表
exports.bookinstance_list = (req, res) => {
  res.send('未实现');
}

// 为副本显示详细信息的页面
exports.bookinstance_detail = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由GET显示创建作者的表单
exports.bookinstance_create_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由post处理作者创建操作
exports.bookinstance_create_post = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由GET显示删除作者的表单
exports.bookinstance_delete_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由post处理作者删除操作
exports.bookinstance_delete_post = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由GET显示更新作者的表单
exports.bookinstance_update_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由POST处理作者更新操作
exports.bookinstance_update_post = asyncHandler((req, res) => {
  res.send('未实现');
})