import { UserOutlined } from '@ant-design/icons'
import { Card, Avatar } from 'antd'
import { useUnit } from 'effector-react/compat'
import React from 'react'

import { $viewerName, $viewerPhoto } from '../../../entities/viewer'
import { SignOutButton } from '../../../features/sign-out'

import styles from './card.module.css'

interface Props {
  className?: string
}

export const SidebarUserCard: React.FC<Props> = (props) => {
  const photoUrl = useUnit($viewerPhoto)
  const name = useUnit($viewerName)

  if (photoUrl === null || name === null) {
    return null
  }

  return (
    <Card
      size="small"
      bordered={false}
      className={props.className}
      bodyStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '10px',
      }}
    >
      <Avatar icon={<UserOutlined />} src={photoUrl} />

      <p className={styles.card__username}>{name}</p>

      <SignOutButton className={styles.card__button} />
    </Card>
  )
}

SidebarUserCard.displayName = 'SidebarUserCard'
