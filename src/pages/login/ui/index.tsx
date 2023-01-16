import { Row, Col, Image } from 'antd'
import React from 'react'

import { AuthForm } from '../../../features/auth/by-email'
import { SignInWithGoogleButton } from '../../../features/auth/by-google'

import './index.css'
import Logo from './logo.png'

export const LoginPage: React.FC = () => {
  return (
    <>
      <Row justify="center" className="logo">
        <Col span={2}>
          <Image src={Logo} preview={false} />
        </Col>
      </Row>

      <Row justify="center">
        <Col span={6}>
          <AuthForm extra={<SignInWithGoogleButton />} />
        </Col>
      </Row>
    </>
  )
}

LoginPage.displayName = 'LoginPage'
