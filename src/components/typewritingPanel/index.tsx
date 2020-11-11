import React from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'
import { Form, Input, Button } from 'antd'

const TypewritingPanel: React.FC = inject('store')(observer((props: any) => {
    const { store } = props
    const [form] = Form.useForm()

    const onFinish = ({ message }: { message: string }) => {
        if (!message) return
        console.log(message)
        store.addMessage()
        form.resetFields()
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter') {
            form.submit()
        }
    }

    return (
        <div className={ styles.container }>
            <Form form={ form } name='add-message' onFinish={ onFinish }>
                <Form.Item name='message' label=''>
                    <Input.TextArea placeholder='输入信息，按 Enter 提交' bordered={ false }
                                    onKeyPress={ handleKeyPress }/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>发送</Button>
                </Form.Item>
            </Form>
        </div>
    )
}))

export default TypewritingPanel
