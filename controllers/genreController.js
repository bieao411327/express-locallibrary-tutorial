const Genre = require('../models/genre');
const Book = require('../models/book');
const { body, param, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler');

// 显示完成的副本列表
exports.genre_list = asyncHandler(async (req, res) => {
  const result = await Genre.find({}).exec()
  res.status(200).send({
    success: true,
    message: null,
    data: result
  })
})

// 为副本显示详细信息的页面
exports.genre_detail = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由GET显示创建作者的表单
exports.genre_create_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由post处理作者创建操作
exports.genre_create_post = [
  body('name', '类目名字不能少于2个字符').trim().isLength({ min: 2 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({ name: req.body.name })
    if (!errors.isEmpty()) {
      const message = errors.array().map(item => item.msg).join(';')
      res.status(200).send({
        success: false,
        message,
        data: null
      })
    } else {
      const genreExists = await Genre.findOne({ name: req.body.name }).collation({ locale: 'en', strength: 2 })
      if (genreExists) {
        res.status(200).send({
          success: false,
          message: '已存在相同的类目',
          data: null
        })
      } else {
        await genre.save()
        res.status(200).send({
          success: true,
          message: null,
          data: null
        })
      }
    }
  })]

// 由GET显示删除作者的表单
exports.genre_delete_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由post处理作者删除操作
exports.genre_delete_post = [
  param('id', 'id缺失').trim().notEmpty(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array().map(item => item.msg).join(';')
      res.status(200).send({
        success: false,
        message,
        data: null
      })
    } else {
      const genreBooks = await Book.find({ genre: req.params.id }, 'title')
      if (!!genreBooks.length) {
        res.status(200).send({
          success: false,
          message: `以下书籍引用该类目：${genreBooks.map((res) => res.title).join(',')}`,
          data: null
        })
      } else {
        await Genre.deleteOne({ _id: req.params.id })
        res.status(200).send({
          success: true,
          message: null,
          data: null
        })
      }
    }
  })
]

// 由GET显示更新作者的表单
exports.genre_update_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由POST处理作者更新操作
exports.genre_update_post = [
  param('id', 'id缺失').trim().notEmpty(),
  body('name', '类目名字不能少于2个字符').trim().isLength({ min: 2 }).escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array().map(item => item.msg).join(';')
      res.status(200).send({
        success: false,
        message,
        data: null
      })
    } else {
      await Genre.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).send({
        success: true,
        message: null,
        data: null
      })
    }
  })
]