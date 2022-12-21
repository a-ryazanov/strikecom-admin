import { LoadingOutlined } from '@ant-design/icons'
import { Spin, SpinProps } from 'antd'
import React from 'react'

export const Loader: React.FC<SpinProps> = (props) => {
  return (
    <Spin
      className={props.className}
      indicator={<LoadingOutlined spin />}
      delay={props.delay}
      size={props.size}
    />
  )
}

Loader.displayName = 'Loader'
