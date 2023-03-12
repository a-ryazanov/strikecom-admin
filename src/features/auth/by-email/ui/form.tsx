import { Alert, Form, Input, Button, Card, Divider } from 'antd'
import { useUnit } from 'effector-react'
import React, { ReactNode } from 'react'

import { $isLoading, $errorMessage, submitForm } from '../model'

interface AuthFormProps {
  extra?: ReactNode
}

export const AuthForm: React.FC<AuthFormProps> = (props) => {
  const [isLoading, errorMessage, onFinish] = useUnit([$isLoading, $errorMessage, submitForm])

  return (
    <Card title="Забастком" extra={props.extra}>
      <Form
        onFinish={onFinish}
        disabled={isLoading}
        labelCol={{ span: 5 }}
        labelAlign="left"
        name="auth"
        size="large"
        requiredMark={false}
      >
        {errorMessage !== null && (
          <Form.Item>
            <Alert message={errorMessage} type="error" showIcon />
          </Form.Item>
        )}

        <Form.Item
          label="Почта"
          name="email"
          rules={[
            { required: true, message: 'Введите почту' },
            { type: 'email', message: 'Неверный формат почты' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Divider />

        <Form.Item noStyle>
          <Button loading={isLoading} type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

AuthForm.displayName = 'AuthForm'
