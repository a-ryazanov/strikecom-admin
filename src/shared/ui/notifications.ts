import { message } from 'antd'
import { createEffect } from 'effector'

interface MessagePayload {
  text: string
}

export const showErrorMessageFx = createEffect<MessagePayload, void>(async ({ text }) => {
  await message.error({
    type: 'error',
    content: text,
  })
})
