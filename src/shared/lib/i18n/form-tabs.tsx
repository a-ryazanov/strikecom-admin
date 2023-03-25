import upperFirst from '@tinkoff/utils/string/upperFirst'
import { Form, Input, TabsProps } from 'antd'
import React from 'react'

import { Locale, localeTranslations } from './locale'

export const getLocaleFormTabs = (): TabsProps['items'] =>
  Object.values(Locale)
    .filter((locale) => locale !== Locale.ALL)
    .map((locale) => ({
      key: locale,
      label: localeTranslations[locale],
      children: (
        <>
          <Form.Item label="Заголовок" name={`title${upperFirst(locale)}`}>
            <Input />
          </Form.Item>

          <Form.Item label="Содержание" name={`content${upperFirst(locale)}`}>
            <Input.TextArea />
          </Form.Item>
        </>
      ),
    }))
