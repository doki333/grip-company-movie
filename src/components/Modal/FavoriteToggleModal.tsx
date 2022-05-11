import React from 'react'
import { PortalCreate } from './PortalCreate'
import styles from './modal.module.scss'

export const FavoriteToggleModal = () => {
  return (
    <PortalCreate>
      <div className={styles.modalWrapper}>
        <div className={styles.modalInner}>
          <header>
            <h1>Hello</h1>
          </header>
          <main>
            <button type='button'>hello</button>
            <button type='button'>bye</button>
          </main>
        </div>
      </div>
    </PortalCreate>
  )
}
