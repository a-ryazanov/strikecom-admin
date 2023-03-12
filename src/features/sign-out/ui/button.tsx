import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useUnit } from 'effector-react'
import React from 'react'

import { signOut, $isSignOutProcessing } from '../model'

interface Props {
  className?: string
}

export const SignOutButton: React.FC<Props> = (props) => {
  const [onClick, isLoading] = useUnit([signOut, $isSignOutProcessing])

  return (
    <Button
      type="link"
      icon={<LogoutOutlined />}
      loading={isLoading}
      onClick={onClick}
      className={props.className}
    />
  )
}

SignOutButton.displayName = 'SignOutButton'
