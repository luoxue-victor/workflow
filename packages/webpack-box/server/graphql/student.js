import {
  // graphql,
  // GraphQLSchema,
  // GraphQLNonNull,
  // isOutputType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} from 'graphql'

import mongoose from 'mongoose'

import { InfoType } from './info'

const Student = mongoose.model('Student')

// 定义Student的数据类型
const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    sex: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    info: {
      type: InfoType
    }
  }
})

// 查询
export const student = {
  type: new GraphQLList(StudentType),
  args: {},
  resolve(root, params, options) {
    return Student.find({}).populate({
      path: 'info',
      select: 'hobby height weight'
    }).exec()
  }
}
