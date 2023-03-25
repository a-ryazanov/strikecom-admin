import { Tabs, Form, Input } from 'antd'
import React from 'react'

import { getLocaleFormTabs } from '../../../../shared/lib/i18n'
import { DatePicker } from '../../../../shared/ui'
import { initialFormValues } from '../config'

export const CreateNewsForm: React.FC = () => {
  return (
    <Form name="createNews" layout="vertical" initialValues={initialFormValues}>
      <Tabs size="middle" type="card" items={getLocaleFormTabs()} />

      <Form.Item label="Дата" name="date">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Ссылка на источник" name="sourceLink">
        <Input />
      </Form.Item>
    </Form>
  )
}

CreateNewsForm.displayName = 'CreateNewsForm'
