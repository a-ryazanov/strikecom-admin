import { GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useUnit } from 'effector-react'
import React from 'react'

import { signInWithGoogle } from '../model'

export const SignInWithGoogleButton: React.FC = () => {
  const onClick = useUnit(signInWithGoogle)

  return <Button onClick={onClick} icon={<GoogleOutlined />} shape="circle" />
}

SignInWithGoogleButton.displayName = 'SignInWithGoogleButton'
