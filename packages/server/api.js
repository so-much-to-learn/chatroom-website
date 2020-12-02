const Data = require('./data')
const Mock = require('mockjs')
const Utils = require('./utils')

const respWithCode = (data, code = 20000, message = '') => ({ code, data, message })

module.exports = {
    login: req => {
        const { username, password } = req.body
        const storeUser = Data.userList.find(user => user.username === username)
        if (storeUser) {
            if (storeUser.password === password) {
                const { uid } = storeUser
                return respWithCode({ uid, username })
            }
            return respWithCode(null, 40001, '密码不正确')
        }
        return respWithCode(null, 40002, '用户没有注册')
    },
    regist: req => {
        const { username, password } = req.body
        if (Data.userList.find(user => user.username === username)) {
            return respWithCode(null, 40003, '用户名重复')
        }
        const uid = Utils.randomNum(Data.userList.map(user => user.uid))
        Data.userList.push({ username, password, uid })
        console.log(Data.userList)
        return respWithCode({ uid, username })
    },
    chatroomInfoList: req => respWithCode(Data.chatroomInfoItems)
}
