import React from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'
import { Form, Input, Button } from 'antd'

const TypewritingPanel: React.FC = inject('store')(observer((props: any) => {
    const onFinish = ({ message }: { message: string }) => {
        if (!message) return
        console.log(message)
    }

    return (
        <div className={ styles.container }>
            <Form name='add-message' onFinish={ onFinish }>
                <Form.Item name='message' label=''>
                    <Input.TextArea placeholder='输入信息' bordered={ false }/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>发送</Button>
                </Form.Item>
            </Form>
        </div>
    )
}))

export default TypewritingPanel
