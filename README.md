## 脚本参数解析插件

### 调用示例
```js
const ParseScriptArgs = require('../main')
let args = (new ParseScriptArgs())
    .addArg('-name', true, null, '脚本名称')
    .addArg('-host', false, '127.0.0.1', '脚本IP')
    .addArg('-port', false, 8000, '脚本端口')
    .addArg('-pass', false, '', '脚本密码')
    .parseArgs()

console.log(args)
```

### 运行调用示例
```shell
node tests/test.js -name test-server
```

### 返回结果
```js
args = { name: 'test-server', host: '127.0.0.1', port: 8000, pass: '' }
```