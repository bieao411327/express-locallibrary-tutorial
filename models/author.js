const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 模式定义
const AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: String }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

// 虚拟字段 - 名字
AuthorSchema.virtual('name').get(function () {
  return `${this.family_name}, ${this.first_name}`;
})
// 虚拟字段 - URL
AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`
})

module.exports = mongoose.model('Author', AuthorSchema);