const obj = {
  foo: {
    bar: {
      baz: 2
    }
  }
}

console.log(obj.foo.bar?.baz) // obj && obj.foo && obj.foo.bar && obj.foo.bar.baz
console.log(obj.foo.err?.baz) // obj && obj.foo && obj.foo.err && obj.foo.err.baz