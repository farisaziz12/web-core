import React, { Component } from 'react'
import styles from './main.module.css'

export class Button extends Component {
  constructor(props) {
    super(props)
    const {
      children,
      text,
      hex,
      className,
      onClick,
      disabled,
      size,
      style,
      center,
      left,
      right,
      border,
      type
    } = props

    const borderColor = hex && border ? `solid 3px ${hex}` : ''
    const backgroundColor = hex && !border ? hex : '#808080'
    const color = hex && border ? hex : '#FFFFFF'

    this.styleObj = {
      ...style,
      backgroundColor,
      color,
      border: borderColor
    }

    this.children = children
    this.text = text
    this.className = className
    this.onClickFunc = onClick
    this.disabled = disabled
    this.size = size
    this.type = type
    this.center = center
    this.right = right
    this.left = left

    this.renderButton = this.renderButton.bind(this)
  }

  onClick(e) {
    if (this.onClickFunc) {
      this.onClickFunc(e)
    }
  }

  getClasses = () => {
    const classes = []
    if (this.className) {
      classes.push(this.className)
    }
    if (styles[this.size]) {
      classes.push(styles[this.size])
    } else {
      classes.push(styles.default)
    }
    if (this.disabled) {
      classes.push(styles.disabled)
    }
    if (this.center) {
      classes.push(styles.center)
    }
    if (this.right) {
      classes.push(styles.right)
    }
    if (this.left) {
      classes.push(styles.left)
    }
    return classes.join(' ')
  }

  renderButton() {
    return (
      <button
        disabled={this.disabled}
        className={this.getClasses()}
        style={this.styleObj}
        onClick={(e) => this.onClick(e)}
        type={this.type}
      >
        {this.text || this.children}
      </button>
    )
  }

  render() {
    return this.renderButton()
  }
}
