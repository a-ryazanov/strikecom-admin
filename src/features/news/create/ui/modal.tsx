import { Modal } from 'antd'
import React from 'react'
import { CreateNewsForm } from './form'

export const openCreateNewsModal = (): void => {
  Modal.confirm({
    title: 'Создание новости',
    content: <CreateNewsForm />,
    icon: null,
    okText: 'Создать',
    cancelText: 'Отмена',
    width: 600,
    bodyStyle: { maxWidth: '100%' },
  })
}
