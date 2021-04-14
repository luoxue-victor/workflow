import mongoose from 'mongoose'

const Info = mongoose.model('Info')

// 保存Info信息
export const saveInfo = async (ctx, next) => {
  const opts = ctx.request.body
  const info = new Info(opts)
  const saveInfo = await info.save()
  if (saveInfo) {
    ctx.body = {
      success: true,
      data: saveInfo
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

// 获取所有info数据
export const fetchInfo = async (ctx, next) => {
  const infos = await Info.find({})

  if (infos.length) {
    ctx.body = {
      success: true,
      data: infos
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}
