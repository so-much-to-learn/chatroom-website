import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
export default class Home extends Component {
    handleTodo(type) {
        const { store } = this.props
        switch (type) {
            case 'add':
                store.addTodo('一个新任务')
                console.log(store)
                break
            case 'remove':
                store.removeTodo()
                break
            case 'reset':
                console.log('reset')
                store.resetTodo()
                break
            default:
                console.log('noop')
        }
    }

    componentDidMount() {
        console.log('prop', this.props.store)
    }

    handleChangeTime = () => {
        this.props.store.changeTime()
        console.log(this.props.store.time)
    }

    render() {
        const { store } = this.props
        console.log({ store })
        return (
          <div className='home'>
              { store.time }
              <div className='btns'>
                  <button onClick={ this.handleTodo.bind(this, 'add') }>添加一条任务</button>
                  <button onClick={ this.handleTodo.bind(this, 'remove') }>删除一条任务</button>
                  <button onClick={ this.handleTodo.bind(this, 'reset') }>重制任务</button>
              </div>
              { store.todos.map((item, idx) =>
                <div key={ idx }>{ item }</div>)
              }
              <button onClick={ () => this.handleChangeTime() }>changeTime</button>
          </div>
        )
    }
}


