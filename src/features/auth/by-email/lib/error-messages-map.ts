import { AuthErrorCodes } from 'firebase/auth'

export const errorMessagesMap: Record<string, string> = {
  [AuthErrorCodes.INVALID_PASSWORD]: 'Неверный пароль',
  [AuthErrorCodes.USER_DELETED]: 'Неверная почта',
}
