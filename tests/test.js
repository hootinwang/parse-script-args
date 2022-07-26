const ParseScriptArgs = require('../main')
let args = (new ParseScriptArgs())
    .addArg('-name', true, null, '脚本名称')
    .addArg('-host', false, '127.0.0.1', '脚本IP')
    .addArg('-port', false, 8000, '脚本端口')
    .addArg('-pass', false, '', '脚本密码')
    .parseArgs()

console.log('------------------console------------------', args)