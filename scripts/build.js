process.on('unhandledRejection', up => { throw up })
const { execSync } = require('child_process')

const REACT_APP_BUILD_TIME = new Date().toISOString();
const REACT_APP_COMMIT_SHA_SHORT = execSync('git rev-parse --short HEAD').toString()
const REACT_APP_COMMIT_SHA_FULL = execSync('git rev-parse --verify HEAD').toString()

console.log(REACT_APP_BUILD_TIME, REACT_APP_COMMIT_SHA_SHORT, REACT_APP_COMMIT_SHA_FULL)

const env = {...process.env, REACT_APP_BUILD_TIME, REACT_APP_COMMIT_SHA_FULL, REACT_APP_COMMIT_SHA_SHORT};
const run = (cmd) => execSync(cmd, {stdio: 'inherit', env})

run(`npm run build:cra`)
