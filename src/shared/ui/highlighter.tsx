import React from 'react'
import Highlight from 'react-highlight-words'

interface Props {
  value: string
  search: string
}

export const Highlighter: React.FC<Props> = (props) => (
  <Highlight
    textToHighlight={props.value}
    searchWords={[props.search]}
    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    autoEscape
  />
)
