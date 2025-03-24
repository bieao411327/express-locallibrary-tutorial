const Book = require('../models/book');
const { body, param, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler');

exports.index = (req, res) => {
  res.send('未实现');
}

// 显示完成的副本列表
exports.book_list = asyncHandler(async (req, res) => {
  const allooks = await Book.find({}).sort({ title: 1 }).populate('author').populate('genre').exec()
  res.status(200).send({
    success: true,
    message: null,
    data: allooks
  })
})

// 为副本显示详细信息的页面
exports.book_detail = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由GET显示创建作者的表单
exports.book_create_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由post处理作者创建操作
exports.book_create_post = [
  body('title', '标题不能为空').trim().isLength({ min: 1 }).escape(),
  body('author', '作者不能为空').trim().isLength({ min: 1 }).escape(),
  body('summary', '简介不能为空').trim().isLength({ min: 1 }).escape(),
  body('isbn', '国际编码不能为空').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),
  asyncHandler(async (req, res) => {
    const { title, author, summary, isbn, genre } = req.body
    const errors = validationResult(req);
    const book = new Book({
      title,
      author,
      summary,
      isbn,
      genre
    })
    if (!errors.isEmpty()) {
      const message = errors.array().map(item => item.msg).join(';')
      res.status(200).send({
        success: false,
        message,
        data: null
      })
    } else {
      await book.save()
      res.status(200).send({
        success: true,
        message: null,
        data: null
      })
    }
  })
]

// 由GET显示删除作者的表单
exports.book_delete_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由post处理作者删除操作
exports.book_delete_post = [
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
      await Book.deleteOne({ _id: req.params.id })
      res.status(200).send({
        success: true,
        message: null,
        data: null
      })
    }
  })
]

// 由GET显示更新作者的表单
exports.book_update_get = asyncHandler((req, res) => {
  res.send('未实现');
})

// 由POST处理作者更新操作
exports.book_update_post = [
  body('title', '标题不能为空').trim().isLength({ min: 1 }).escape(),
  body('author', '作者不能为空').trim().isLength({ min: 1 }).escape(),
  body('summary', '简介不能为空').trim().isLength({ min: 1 }).escape(),
  body('isbn', '国际编码不能为空').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

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
      await Book.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).send({
        success: true,
        message: null,
        data: null
      })
    }
  })
]