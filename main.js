const _ = require('lodash')
class ParseScriptArgs {

    constructor() {
        this.rules = []
    }
    /**
     * 添加要校验的参数
     * @param {String} name 参数名
     * @param {Boolean} required 是否为必填参数
     * @param {*} defaultValue 默认值 默认 ''
     * @param {String} help 参数说明
     * @returns 
     */
    addArg (name, required = true, defaultValue = '', help = '') {
        try {
            let nameReg = new RegExp(/^\-[\w\-]+$/)
            if (nameReg.test(name) === false) {
                throw new Error(`The format of name is incorrect and cannot be \'${name}\'. The \'-\' prefix must support the [a-z、A-Z、0-9、-、_] format`)
            }
            this.rules.push(
                {
                    name: name,
                    required: required,
                    defaultValue: defaultValue,
                    help: help,
                }
            )

            return this
        } catch (e) {
            console.log(`ERROR: ${e.message}`)
            process.exit(500)
        }
    }

    /**
     * 解析参数
     */
    parseArgs () {
        try {
            // 深拷贝参数数组
            let args = _.cloneDeep(process.argv)

            // 去除node路径、脚本路径
            args.splice(0, 2)

            if (args[0] === '--help' || args[0] === '-h') {
                return this.printHelp()
            }

            // 初始化变量
            let nameIndex;
            let valueIndex;
            let value;
            let parseArgs = {}

            this.rules.forEach((v) => {
                // 判断 name 是否存在
                nameIndex = args.indexOf(v.name)
                if (nameIndex === -1) {
                    if (v.required === true) {
                        throw new Error(`${v.name} is not defined. ${v.name} is a required parameter`)
                    }

                    // 计算参数值下标
                    valueIndex = -1
                } else {
                    // 计算参数值下标
                    valueIndex = nameIndex + 1
                }

                // 判断参数值是否存在 , 不存在给默认值
                value = args[valueIndex]

                if (value === undefined) {
                    value = v.defaultValue
                }

                parseArgs[v.name.substr(1)] = value
            })
            return parseArgs
        } catch (e) {
            console.log(`ERROR: ${e.message}`)
            process.exit(500)
        }
    }

    /**
     * 打印 help
     */
    printHelp () {
        let usage = []
        let argumentsList = [
            '-h, --help     show this help message and exit'
        ]

        console.log(`\n-------------------- help --------------------\n`)

        this.rules.forEach((v) => {
            if (v.required === true) {
                usage.push(`${v.name} ${_.toUpper(v.name.substr(1))}`)
            } else {
                usage.push(`[${v.name} ${_.toUpper(v.name.substr(1))}]`)
            }

            argumentsList.push(`${v.name} ${_.toUpper(v.name.substr(1))}     ${v.help}`)
        })
        console.log(`usage: ${usage.join(' ')}\n`)

        console.log(`optional arguments:\n${argumentsList.join('\n')}`)

        console.log(`\n-------------------- help --------------------\n`)

        process.exit(0)
    }

}

module.exports = ParseScriptArgs