import React from 'react'
import styles from './main.module.css'

export function Button({
  children,
  text,
  hex: backgroundColor,
  className,
  onClick,
  disabled,
  size,
  style
}) {
  const styleObj = {
    ...style,
    backgroundColor
  }

  const getStyles = () => {
    if (styles[size]) {
      return styles[size]
    } else {
      return styles.default
    }
  }

  const classes = `${className} ${getStyles()} ${disabled && styles.disabled}`

  return (
    <button
      disabled={disabled}
      className={classes}
      style={styleObj}
      onClick={(e) => onClick(e)}
    >
      {children || text}
    </button>
  )
}
