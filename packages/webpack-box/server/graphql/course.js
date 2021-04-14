import {
  // graphql,
  // GraphQLNonNull,
  // GraphQLSchema,
  // isOutputType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} from 'graphql'

import mongoose from 'mongoose'

const Course = mongoose.model('Course')

const objType = new GraphQLObjectType({
  name: 'meta',
  fields: {
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
})

const CourseType = new GraphQLObjectType({
  name: 'Course',
  fields: {
    _id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    },
    page: {
      type: GraphQLInt
    },
    author: {
      type: new GraphQLList(GraphQLString)
    },
    meta: {
      type: objType
    }
  }
})

export const course = {
  type: new GraphQLList(CourseType),
  args: {},
  resolve(root, params, options) {
    return Course.find({}).exec()
  }
}
