import React from 'react'
import { NavTab } from 'components/LayOut/NavTab/NavTab'
import styles from './LayOut.module.scss'

interface layoutTypes {
  children: React.ReactNode
  title: string
}

export const LayOut = ({ children, title }: layoutTypes) => {
  return (
    <div className={styles.layOutWrapper}>
      <h1>{title}</h1>
      {children}
      <NavTab />
    </div>
  )
}
