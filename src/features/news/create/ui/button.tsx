import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import { openCreateNewsModal } from './modal'

export const CreateNewsButton: React.FC = () => {
  return (
    <Button onClick={openCreateNewsModal} icon={<PlusOutlined />} type="primary" htmlType="button">
      Создать
    </Button>
  )
}

CreateNewsButton.displayName = 'CreateNewsButton'
