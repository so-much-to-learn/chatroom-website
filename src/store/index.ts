import { action, computed, observable } from 'mobx'
import * as Api from 'apis'
import { USER_INFO } from 'constants/browser'

class AppStore {
    constructor() {
        this._getUserInfo()
    }

    /**
     * 用户信息
     * @type {userInfo}
     */
    @observable
    userInfo: userInfo = {
        uid: null,
        username: null
    }

    /**
     * 聊天室信息
     * @type {chatroomInfoItem[]}
     */
    @observable
    chatroomList: chatroomInfoItem[] = [
        {
            id: 1,
            name: '不秃顶交流群',
            messageList:
                [
                    { id: 123, personName: '小明', message: '为了让 CSS 也能适用软件工程方法，程序员想了各种办法' },
                    { id: 124, personName: '小红', message: 'CSS Modules 很容易学，因为它的规则少，同时又非常有用' }
                ]
        },
        {
            id: 2,
            name: '中年大叔交流群',
            messageList:
                [
                    { id: 223, personName: '小明', message: '你来报考什么部门？我来报考咱们公司的对外发言人。那好吧，我问你。我听说你在家打老婆孩子。' },
                    {
                        id: 224,
                        personName: '小红',
                        message: '你的这种问题充满对我家的偏见和不知道哪里来的傲慢，我们家欢迎一切善意的建议，但是拒绝一切无端的指责，所以请你不要再有样不负责任的疑问。'
                    },
                    {
                        id: 254,
                        personName: '小明',
                        message: '学过网页开发就会知道，CSS 不能算编程语言，只是网页样式的一种描述方法。'
                    }
                ]
        },
        {
            id: 3,
            name: '国际局势讨论群',
            messageList:
                [
                    { id: 323, personName: '小明', message: '与智者同行，你会不同凡响；与高人为伍，你能登上巅峰。' },
                    {
                        id: 324,
                        personName: '小红',
                        message: '说得对。但我认为母猪产后护理，首先要从产前做起，母猪产前四五天要逐渐减少饲喂量，其目的是减少腹部压力，产前吃得少，产后才能吃得多。若产前吃得多，不仅会使产程过长，而且还会造成抑郁症'
                    }
                ]
        }
    ]

    // 计算属性： 获取左侧群列表信息
    @computed
    get chatroomNameList(): chatroomNameItem[] {
        return this.chatroomList.map(T => ({
            id: T.id,
            name: T.name,
            recentMessage: T.messageList.slice(-1)[0]?.message
        }))
    }

    @action
    addMessage(chatroomId: number, messageObj: messageItem) {
        console.log('addMessage')
    }

    // 清空用户信息
    @action
    resetUserInfo(): void {
        this.userInfo = { uid: null, username: null }
    }

    // 用户登录
    @action
    async userLogin({ username, password }: loginQuery = {}) {
        const { data: userInfo } = await Api.userLogin({ username, password })
        sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo))
        return this.userInfo = userInfo
    }

    // 获取保存在sessionStorage中的用户信息，刷新页面的时候不需要重新登录
    _getUserInfo() {
        const value = sessionStorage.getItem(USER_INFO)
        this.userInfo = value ? JSON.parse(value) : value
    }
}

const store: AppStore = new AppStore()

export default store
