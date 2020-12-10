import React, { useEffect, useMemo, useContext } from 'react';
import styles from './index.module.scss';
import { Form, Input, Button } from 'antd';
import { DispatchContext, StateContext, ACTIONS } from 'context/index';
import { USER_SEND_MESSAGE } from 'constants/browser';

const TypewritingPanel: React.FC = (props) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [state.currentChatroom]);

  const onFinish = ({ message }: { message: string }) => {
    state.currentChatroom &&
    state.imCore.sendGroupMessage(state.currentChatroom.id, message);
    form.resetFields();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter') {
      form.submit();
    }
  };

  return (
    <div className={ styles.container }>
      <Form form={ form } name='add-message' onFinish={ onFinish }>
        <Form.Item name='message' label=''>
          <Input.TextArea
            placeholder='输入信息，按 Enter 提交'
            bordered={ false }
            onKeyPress={ handleKeyPress }
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            发送
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TypewritingPanel;
