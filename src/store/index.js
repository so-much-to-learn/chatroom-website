import { action, observable } from 'mobx'

class AppStore {
    @observable time = '2020年10月27日 下午1:41:38'
    @observable todos = ['add item']

    @action addTodo(todo) {
        this.todos.push(todo)
    }

    @action removeTodo(todo) {
        this.todos.pop()
    }

    @action resetTodo(todo) {
        this.todos = []
    }

    @action changeTime() {
        this.time = new Date().toLocaleTimeString()
    }
}

const store = new AppStore()

export default store
