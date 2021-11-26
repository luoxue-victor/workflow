const exec = require('child_process').execSync;
const execa = require('execa');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const globby = require('globby');

const {
  success
} = require('../util/log');
const LOG = require('../util/log');

exports.getCurBranch = () => {
  return exec('git rev-parse --abbrev-ref HEAD').toString().trim();
}

exports.getCurBranchPromise = (context) => {
  return new Promise(async (resolve) => {
    const {
      stdout
    } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd: context || process.cwd()
    });
    resolve(stdout)
  })
}

exports.gitPull = async (context) => {
  const {
    stdout
  } = await execa('git', ['pull'], {
    cwd: context
  });
  return stdout
}

exports.gitDiff = async (context) => {
  const {
    stdout
  } = await execa('git', ['diff'], {
    cwd: context
  });
  return stdout
}

exports.gitPullOrigin = async (context, branch) => {
  const {
    stdout
  } = await execa('git', ['pull', 'origin', branch], {
    cwd: context
  });
  return stdout
}

exports.gitCheckout = async (context, branch) => {
  const {
    stdout
  } = await execa('git', ['checkout', branch], {
    cwd: context
  });
  return stdout
}

exports.gitLog = async (context, p, text) => {
  let {
    stdout
  } = await execa('git', ['log', `-S`, text, '--', p], {
    cwd: context
  });

  const data = {};

  if (stdout) {
    stdout = stdout.split('\n')

    stdout.slice(0, 3).forEach(_ => {
      if (/^commit/.test(_)) {
        data.commitId = _.replace('commit', '').trim();
      }

      if (/^Author/.test(_)) {
        data.Author = _.replace('Author:', '').trim();
      }

      if (/^Date/.test(_)) {
        data.Date = _.replace('Date:', '').trim();
      }
    })
  }

  return data
}

exports.getBundleDeps = () => {
  const bundleJsonPath = path.join(process.cwd(), 'bundle.json');
  const deps = require(bundleJsonPath).dependencies;
  const bundleNames = Object.keys(deps)
  const store = []

  bundleNames.forEach(bundleName => {
    const split = deps[bundleName].split('#')
    store.push({
      bundleName: bundleName,
      path: split[0],
      branch: split[1]
    })
  })
  return store
}

exports.isAjxBundle = () => {
  return fs.existsSync(path.join(process.cwd(), 'bundle.json'))
}

exports.copyToClipboard = (text) => {
  const context = path.join(__dirname, '..', 'clip.txt');
  fs.writeFileSync(context, text);
  execSync(`pbcopy < ${context}`);
  fs.removeSync(context);

  success(' 已复制到剪切板');
}

exports.addTemplate = (p) => {
  const src = path.join(__dirname, '..', 'template', p)
  const dest = path.join(process.cwd(), p)
  fs.copySync(src, dest)
}

exports.addGitignore = (text) => {
  const gitignorePath = path.join(process.cwd(), '.gitignore')

  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath).toString()

    if (!content.includes(text)) {
      fs.writeFileSync(gitignorePath, `${content} \n${text}`)
    }
  }
}

exports.gitClone = async (context, repo, branch, commitId, index) => {
  const existsDir = fs.existsSync(context);

  if (!existsDir) {
    fs.mkdirpSync(context);
  }

  const repoPath = path.join(context, repo.split('/')[1] || repo.split('/')[0])
  const existsRepo = fs.existsSync(repoPath);
  
  let isDone = false;

  function done() {
    if (index) {
      index.current ++ 
    }
    isDone = true;

    LOG.success(` ${existsRepo ? 'pull' : 'clone'} ${chalk.cyan(`[${repo}]`)} ${chalk.yellow(`[${branch}]`)} ${`${chalk.green(`[${index.current}/${index.all}]`)}`}`);
  }

  if (existsRepo) {
    const pull = async () => {
      const stdout = await exports.gitPull(repoPath)

      return stdout
    }

    const pullOrigin = async () => {
      const stdout = await exports.gitPullOrigin(repoPath, branch)
      
      return stdout
    }

    const checkout = async () => {
      const stdout = await exports.gitCheckout(repoPath, branch)
      
      return stdout
    }
    
    await pull();

    const currentBranch = await exports.getCurBranchPromise(repoPath)
    
    if (currentBranch === branch) {
      await pullOrigin()
    } else {
      await checkout()
      await pullOrigin()
    }

    done();
  } else {
    const url = `git@gitlab.alibaba-inc.com:${repo}.git`;

    const {
      stdout
    } = await execa('git', ['clone', url, '-b', branch], {
      cwd: context
    });
  
    if (stdout) {
      console.log(stdout)
    } else {
      done();
      // LOG.base(`切换到指定 commitId：${commitId}`);
      // const { stdout } = await execa('git', ['reset', '--hard', commitId], {
      //   cwd: context
      // });
  
      // console.log(stdout)
      // LOG.success(`切换 commitId：${commitId}`);
    }
  }

  return {
    context: path.join(context, repo.split('/')[1]),
    repo,
    branch,
    commitId,
    done
  }
}

exports.delay = (wait) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, wait);
  })
}

exports.getAllFiles = async (src = '') => {
  const resolvePath = '.';
  
  const excludes = [
    '!**/**.md',
    '!**/**.webp',
    '!**/**.png',
    '!**/**.jpg',
    '!**/**.jpeg',
    '!**/**.zip',
    '!**/**.json',
    '!**/**.css',
    '!**/**.less',
    '!**/**.svg',
    '!output',
  ]

  files = await globby([
    path.join(resolvePath, src),
    ...excludes
  ]);

  return files
}

exports.filingCabinet = (filePath) => {
  const content = fs.readFileSync(filePath).toString()
  const deps = []
  content.replace(/import[* \w{,}]+from([\_\-/@\w '".]+)/g, ($1, $2) => {
    if ($2) {
      deps.push($2.trim().replace(/['"]/g, ''))
    }
  })
  return deps
}