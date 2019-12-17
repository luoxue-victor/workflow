window.onload = function () {
  $('#btn2').click(function() {
    $.ajax({
      url: '/student',
      data: {},
      success: function (res) {
        if (res.success) {
          renderStudent(res.student)
        }
      }
    })
  })

  $('#btn1').click(function() {
    $.ajax({
      url: '/course',
      data: {
        query: `query{
            course{
              desc
            }
          }`
      },
      success: function (res) {
        if (res.success) {
          console.log(res)
          renderCourse(res.data)
        }
      }
    })
  })

  function renderStudent (data) {
    var str = ''
    data.forEach(function(item) {
      str += '<li>姓名：' + item.name + '，性别：' + item.sex + '，年龄：' + item.age + '</li>'
    })
    $('#studentList').html(str)
  }

  function renderCourse (data) {
    var str = ''
    data.forEach(function(item) {
      str += '<li>课程：' + item.title + '，简介：' + item.desc + '</li>'
    })
    $('#courseList').html(str)
  }

  $('#btn3').click(function() {
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
      success: function (res) {
        renderStudent(res.data.student)
        renderCourse(res.data.course)
      }
    })
  })

  $('#btn4').click(function() {
    $.ajax({
      url: '/savescourse',
      type: 'POST',
      data: {
        title: '语文',
        desc: 'asdasd',
        page: 20,
        author: 'luoxue'
      },
      success: function (res) {
        console.log(res, '插入课程成功')
      }
    })
  })
}
