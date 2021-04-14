import mongoose from 'mongoose'

const { Schema } = mongoose
// const ObjectId = Schema.Types.ObjectId

const CourseSchema = new Schema({
  title: String,
  desc: String,
  page: Number,
  author: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

CourseSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Course', CourseSchema)
