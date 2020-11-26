import React, { useState, useRef, useContext, useEffect } from 'react'
import styles from './index.module.scss'
import { Form, Input, Button, Tabs, Checkbox, message } from 'antd'
import * as Api from 'apis'
import { RouteComponentProps } from 'react-router'
import { Context, ACTIONS } from 'context/index'

const { TabPane } = Tabs

const UsernameLocalKey = 'last_login_username'

interface loginFormData {
  username: string
  password: string
  remember: boolean
}

interface registFormData {
  username: string
  password: string
  passwordConfirm: string
}

const Login: React.FC<RouteComponentProps> = (props) => {
  const { history } = props
  const { state, dispatch } = useContext(Context)
  const [loginForm] = Form.useForm()
  const [registForm] = Form.useForm()
  const [activeKey, setActiveKey] = useState('login')
  const [usernameInit, setUsernameInit] = useState(
    localStorage.getItem(UsernameLocalKey) || ''
  ) // username初始值

  /* region Methods */
  const onLoginFormReset = () => loginForm.resetFields()
  const onRegistFormReset = () => registForm.resetFields()

  useEffect(() => {
    dispatch({ type: ACTIONS.RESET_USER_INFO })
  }, [])

  const onLogin = (formData: loginFormData) => {
    const { remember, username, password } = formData
    remember && window.localStorage.setItem(UsernameLocalKey, username)
    Api.userLogin({ username, password })
      .then((userInfo) => {
        dispatch({ type: ACTIONS.USER_LOGIN, payload: { userInfo } })
        history.push('/')
      })
      .catch((err) => console.error('Error: 登录出错 ', err))
  }

  const onTabsChange = (activeKey: string) => {
    setActiveKey(activeKey)
    if (activeKey === 'login') {
      onRegistFormReset()
    } else {
      onLoginFormReset()
    }
  }

  const onRegist = (formData: registFormData) => {
    const { username } = formData
    Api.userRegist(formData)
      .then(() => {
        window.localStorage.setItem(UsernameLocalKey, username)
        setUsernameInit(username)
        setActiveKey('login')
        onRegistFormReset()
        loginForm.setFieldsValue({
          remember: true,
          username,
        })
        message.success('注册成功，现在登录吧')
      })
      .catch((err) => console.error('Error: 注册失败 ', err))
  }
  /* endregion  */

  /* region 样式配置 */
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }
  /* endregion 样式配置 */

  return (
    <div className={styles.container}>
      <Tabs
        defaultActiveKey='login'
        activeKey={activeKey}
        className={styles.tab}
        onChange={onTabsChange}
      >
        <TabPane tab='登录' key='login'>
          <Form
            name='login'
            form={loginForm}
            {...formLayout}
            initialValues={{ remember: true, username: usernameInit }}
            onFinish={onLogin}
          >
            <Form.Item
              label='用户名：'
              name='username'
              tooltip='选中「记住我」下次将自动填写用户名'
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='密码：'
              name='password'
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked' {...tailLayout}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
              <Button htmlType='button' onClick={onLoginFormReset}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab='注册' key='regist'>
          <Form
            name='regist'
            form={registForm}
            {...formLayout}
            onFinish={onRegist}
          >
            <Form.Item
              label='用户名：'
              name='username'
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='密码：'
              name='password'
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label='确认密码：'
              name='passwordConfirm'
              rules={[
                { required: true, message: '请输入确认密码' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    )
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
              <Button htmlType='button' onClick={onRegistFormReset}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Login
