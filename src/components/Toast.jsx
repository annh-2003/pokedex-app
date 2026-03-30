import { useState, useEffect } from 'react'
import styles from './Toast.module.css'

function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 2500)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`${styles.toast} ${styles[type]} ${visible ? styles.show : styles.hide}`}>
      <span>{message}</span>
      <button className={styles.closeBtn} onClick={onClose}>&times;</button>
    </div>
  )
}

export default Toast
