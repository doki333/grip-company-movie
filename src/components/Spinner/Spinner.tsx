import React from 'react'
import styles from './Spinner.module.scss'

export const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <span className={styles.spinner} />
    </div>
  )
}
