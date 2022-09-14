import { forwardRef } from 'react'
import styles from './Spinner.module.scss'

export const Spinner = forwardRef<HTMLDivElement>((props, ref) => {
  return <div ref={ref} className={styles.spinnerWrapper} />
})

Spinner.displayName = 'Spinner'
