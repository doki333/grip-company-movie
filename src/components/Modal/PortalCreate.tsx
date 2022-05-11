import React from 'react'
import ReactDOM from 'react-dom'

export const PortalCreate = ({ children }: any) => {
  const el = document.getElementById('modal')
  return el ? ReactDOM.createPortal(children, el) : null
}
