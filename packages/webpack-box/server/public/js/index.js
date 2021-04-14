window.onload = function () {
  $('#btn2').click(() => {
    $.ajax({
      url: '/student',
      data: {},
      success(res) {
        if (res.success) {
          renderStudent(res.student)
        }
      }
    })
  })

  $('#btn1').click(() => {
    $.ajax({
      url: '/course',
      data: {
        query: `query{
            course{
              desc
            }
          }`
      },
      success(res) {
        if (res.success) {
          console.log(res)
          renderCourse(res.data)
        }
      }
    })
  })

  function renderStudent(data) {
    let str = ''
    data.forEach((item) => {
      str += `<li>姓名：${item.name}，性别：${item.sex}，年龄：${item.age}</li>`
    })
    $('#studentList').html(str)
  }

  function renderCourse(data) {
    let str = ''
    data.forEach((item) => {
      str += `<li>课程：${item.title}，简介：${item.desc}</li>`
    })
    $('#courseList').html(str)
  }

  $('#btn3').click(() => {
    $.ajax({
      url: '/graphql',
      data: {
        query: `query{
            student{
              _id
              name
              sex
              age
            }
            course{
              title
              desc
            }
          }`
      },
      success(res) {
        renderStudent(res.data.student)
        renderCourse(res.data.course)
      }
    })
  })

  $('#btn4').click(() => {
    $.ajax({
      url: '/savescourse',
      type: 'POST',
      data: {
        title: '语文',
        desc: 'asdasd',
        page: 20,
        author: 'luoxue'
      },
      success(res) {
        console.log(res, '插入课程成功')
      }
    })
  })
}
