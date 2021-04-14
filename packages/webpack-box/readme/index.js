const fs = require('fs')
const path = require('path')

const readmePath = path.join(__dirname, '..', 'README.md')
const templatePath = path.join(__dirname, 'template.md')
const pluginDirPath = path.join(__dirname, '..', 'config')

let tempalteContent = ''
let pluginsContent = ''

tempalteContent = fs.readFileSync(templatePath, { encoding: 'utf-8' })
const pluginPaths = fs.readdirSync(pluginDirPath)

pluginPaths.forEach((_) => {
  const _path = path.join(pluginDirPath, _)
  const content = fs.readFileSync(_path, { encoding: 'utf-8' })

  const match = content.match(/(\/\*)[\s\S]+(\*\/)/)
  const getValue = (type, str) => {
    const m = str.match(new RegExp(`\@${type}.+[\n]`))
    return m && m[0].replace(`@${type}`, '').trim()
  }

  if (match) {
    const name = getValue('name', match[0])
    const description = getValue('description', match[0])
    pluginsContent += `- [${name}](./config/${_}) ${description}\n`
  }
})

fs.writeFileSync(readmePath, tempalteContent.replace(/\{\{plugins\}\}/g, pluginsContent))
