const Data = require('./data')
const Mock = require('mockjs');

const respWithCode = data => ({
    code: 20000,
    data
})

module.exports = {
    login: req => {
        const { username } = req.body
        return respWithCode(Mock.mock({
            uid: '@id',
            username
        }))
    },
    regist: req => {
        return 'error'
    },
    chatroomInfoList: req => respWithCode(Data.chatroomInfoItems)
}
