import React from 'react'
import styles from './LayOut.module.scss'
import { Spinner } from './Spinner/Spinner'

interface layoutTypes {
  children: React.ReactNode
  title: string
}

export const LayOut = ({ children, title }: layoutTypes) => {
  return (
    <div className={styles.layOutWrapper}>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
