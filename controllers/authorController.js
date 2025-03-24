const Author = require('../models/author');
const Book = require('../models/book');
const { body, param, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler');

// 显示完成的作者列表
exports.author_list = asyncHandler(async (req, res) => {
  const result = await Author.find({}).sort({ 'family_name': 'asc' }).exec()
  res.status(200).send({
    success: true,
    message: null,
    data: result
  })
})

// 为每位作者显示详细信息的页面
exports.author_detail = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由GET显示创建作者的表单
exports.author_create_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由post处理作者创建操作
exports.author_create_post = [
  body('first_name').trim().isLength({ min: 1 }).escape().withMessage('名必须是明确的'),
  body('family_name').trim().isLength({ min: 1 }).escape().withMessage('姓必须是明确的'),
  body('date_of_birth', '日期格式不对').notEmpty(),

  asyncHandler(async (req, res) => {
    const { first_name, family_name, date_of_birth, date_of_death } = req.body
    const errors = validationResult(req);
    const author = new Author({
      first_name,
      family_name,
      date_of_birth,
      date_of_death
    })
    if (!errors.isEmpty()) {
      const message = errors.array().map(item => item.msg).join(';')
      res.status(200).send({
        success: false,
        message,
        data: null
      })
    } else {
      await author.save()
      res.status(200).send({
        success: true,
        message: null,
        data: null
      })
    }
  })
]

// 由GET显示删除作者的表单
exports.author_delete_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由post处理作者删除操作
exports.author_delete_post = [
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
      const authorBooks = await Book.find({ author: req.params.id }, 'title')
      if (!!authorBooks.length) {
        res.status(200).send({
          success: false,
          message: `以下书籍引用该作者：${authorBooks.map((res) => res.title).join(',')}`,
          data: null
        })
      } else {
        await Author.deleteOne({ _id: req.params.id })
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
exports.author_update_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由POST处理作者更新操作
exports.author_update_post = [
  param('id', 'id缺失').trim().notEmpty(),
  body('first_name').trim().isLength({ min: 1 }).escape().withMessage('名必须是明确的'),
  body('family_name').trim().isLength({ min: 1 }).escape().withMessage('姓必须是明确的'),
  body('date_of_birth', '日期格式不对').notEmpty(),

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
      await Author.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).send({
        success: true,
        message: null,
        data: null
      })
    }
  })
]