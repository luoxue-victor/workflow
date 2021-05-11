function createTag(React, tags = {}) {
  if (!tags) {
      return;
  }
  const createElement = React.createElement;
  React.createElement = function (type, props, ...children) {
      if (tags[type]) {
          return createElement(tags[type], props, ...children);
      }
      return createElement(type, props, ...children);
  }
}

const elements = [/* 'git', 'branch', 'path', 'hidden' */]

elements.forEach(e => {
  createTag(React, {
    [e]: (props)=>{
      return props.children;
    },
  })
})