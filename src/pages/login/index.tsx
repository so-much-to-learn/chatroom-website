import React from 'react'
import styles from './index.module.css'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button, Tabs, Checkbox } from 'antd'

const { TabPane } = Tabs

const UsernameLocalKey = 'last_login_username'

interface loginFormData {
    username: string
    password: string
    remember: boolean
}

const Login: React.FC = inject('store')(observer((props: any) => {
    const { store, history } = props

    const [form] = Form.useForm()
    const username = localStorage.getItem(UsernameLocalKey) || ''   // username初始值

    /* region Methods */
    const onReset = () => form.resetFields()

    const onFinish = (formData: loginFormData) => {
        const { remember, username, password } = formData
        remember &&
        window.localStorage.setItem(UsernameLocalKey, username)
        store.userLogin({ username, password })
            .then(() => history.push('/'))
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const onTabsChange = (activeKey: string) => {
        console.log({ activeKey })
    }
    /* endregion  */

    /* region 样式配置 */
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 }
    }
    /* endregion 样式配置 */

    return (
        <div className={ styles.container }>
            <Tabs defaultActiveKey='login'
                  className={ styles.tab }
                  onChange={ onTabsChange }>
                <TabPane tab='登录' key='login'>
                    <Form name='basic'
                          form={ form }
                          { ...formLayout }
                          initialValues={ { remember: true, username } }
                          onFinish={ onFinish }
                          onFinishFailed={ onFinishFailed }>
                        <Form.Item label='用户名：' name='username'
                                   tooltip='选中记住我下次将自动填写用户名'
                                   rules={ [{ required: true, message: '请输入用户名' }] }>
                            <Input/>
                        </Form.Item>

                        <Form.Item label='密码：' name='password'
                                   rules={ [{ required: true, message: '请输入密码' }] }>
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item name='remember' valuePropName='checked'
                                   { ...tailLayout }>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item { ...tailLayout }>
                            <Button type='primary' htmlType='submit'>提交</Button>
                            <Button htmlType='button' onClick={ onReset }>重制</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab='注册' key='regist'>
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                </TabPane>
            </Tabs>
        </div>
    )
}))

export default Login
