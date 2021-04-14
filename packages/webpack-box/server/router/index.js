import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import { saveInfo, fetchInfo } from '../controllers/info'
import { saveStudent, fetchStudent, fetchStudentDetail } from '../controllers/student'
import { saveCourse, fetchCourse } from '../controllers/course'
// 引入Schema
import schema from '../graphql/schema'

const router = require('koa-router')()

// 设置每一个路由对应的相对的控制器
router.post('/saveinfo', saveInfo)
  .get('/info', fetchInfo)
  .post('/savestudent', saveStudent)
  .get('/student', fetchStudent)
  .get('/studentDetail', fetchStudentDetail)
  .post('/savescourse', saveCourse)
  .get('/course', fetchCourse)

router.post('/graphql', async (ctx, next) => {
  await graphqlKoa({ schema })(ctx, next) // 使用schema
})
  .get('/graphql', async (ctx, next) => {
    await graphqlKoa({ schema })(ctx, next) // 使用schema
  })
  .get('/graphiql', async (ctx, next) => {
    await graphiqlKoa({ endpointURL: '/graphql' })(ctx, next) // 重定向到graphiql路由
  })

module.exports = router
