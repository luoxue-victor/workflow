import {
  // graphql,
  // GraphQLSchema,
  // isOutputType
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import mongoose from 'mongoose'

const Info = mongoose.model('Info')

// 定义日期时间 类型
const objType = new GraphQLObjectType({
  name: 'mete',
  fields: {
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
})

// 定义Info的数据类型
export const InfoType = new GraphQLObjectType({
  name: 'Info',
  fields: {
    _id: {
      type: GraphQLID
    },
    height: {
      type: GraphQLString
    },
    weight: {
      type: GraphQLString
    },
    hobby: {
      type: new GraphQLList(GraphQLString)
    },
    meta: {
      type: objType
    }
  }
})

// 批量查询
export const infos = {
  type: new GraphQLList(InfoType),
  args: {},
  resolve(root, params, options) {
    return Info.find({}).exec()
  }
}

// 根据id查询单条info记录
export const info = {
  type: InfoType,
  // 传进来的参数
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID) // 参数不为空
    }
  },
  resolve(root, params, options) {
    return Info.findOne({ _id: params.id }).exec() // 查询单条数据
  }
}
