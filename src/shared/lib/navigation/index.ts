import type { NavigateOptions } from '@tanstack/router'
import { createEffect } from 'effector'

export const navigateFx = createEffect<NavigateOptions, void>()

export const absolutePath = (pathname: string): string => `/${pathname}`
