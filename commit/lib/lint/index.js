module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\(\（](.*)[\)\）])?[\:\：] (.*)/,
      headerCorrespondence: [
        'type',
        'scope',
        'subject'
      ],
      referenceActions: [
        'close',
        'closes',
        'closed',
        'fix',
        'fixes',
        'fixed',
        'resolve',
        'resolves',
        'resolved'
      ],
      issuePrefixes: ['#'],
      noteKeywords: ['BREAKING CHANGE', '不兼容变更'],
      fieldPattern: /^-(.*?)-$/,
      revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
      revertCorrespondence: ['header', 'hash'],
      warn() {},
      mergePattern: null,
      mergeCorrespondence: null
    },
  },
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        '新功能',
        'feat',
        '修复',
        'fix',
        '性能优化',
        'perf',
        '代码样式',
        'style',
        '文档',
        'docs',
        '测试',
        'test',
        '重构',
        'refactor',
        '构建',
        'build',
        '持续集成',
        'ci',
        '杂',
        'chore',
        '撤销',
        'revert'
      ],
    ],
  },
};
