import mongoose from 'mongoose'

const Course = mongoose.model('Course')

export const saveCourse = async (ctx, next) => {
  const opts = ctx.request.body

  const course = new Course(opts)
  const saveCourse = await course.save()

  if (saveCourse) {
    ctx.body = {
      success: true,
      data: saveCourse
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

export const fetchCourse = async (ctx, next) => {
  const courses = await Course.find({})
  if (courses.length) {
    ctx.body = {
      success: true,
      data: courses
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}
