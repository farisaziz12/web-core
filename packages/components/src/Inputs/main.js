const autoBind = require('auto-bind')
import React, { Component } from 'react'
import { propOr } from 'ramda'
import styles from './main.module.css'

export class Input extends Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.state = {
      value: '',
      showError: false
    }

    const {
      className,
      onChange,
      disabled,
      size,
      style = {},
      center,
      placeholder,
      type,
      id,
      name,
      label,
      borderHex,
      borderSize,
      borderType,
      required,
      labelSize,
      validation
    } = props

    const regex = propOr(undefined, 'regex', validation)
    const error = propOr(undefined, 'error', validation)
    const validationCallback = propOr(undefined, 'callback', validation)

    this.className = className
    this.onChangeFunc = onChange
    this.disabled = disabled
    this.size = size
    this.type = type
    this.center = center
    this.placeholder = placeholder
    this.id = id
    this.name = name
    this.label = label
    this.required = required
    this.labelSize = labelSize
    this.regex = regex
    this.error = error
    this.validationCallback = validationCallback

    this.onChange = this.onChange.bind(this)

    const border = `${borderType || 'solid'} ${borderSize || '2px'}px ${
      borderHex || '#808080'
    }`

    this.labelFontSize = this.labelSize
      ? { fontSize: `${this.labelSize}`, paddingBottom: this.labelSize }
      : {}

    this.styleObj = {
      ...style,
      border
    }
  }

  onChange(e) {
    const { value } = e.target
    this.setState({ value })

    if (this.regex) {
      if (this.regex.test(value) || value === '') {
        this.setState({ showError: false })
      } else {
        this.setState({ showError: true })
      }
    } else if (this.validationCallback) {
      if (this.validationCallback(value) || value === '') {
        this.setState({ showError: false })
      } else {
        this.setState({ showError: true })
      }
    }

    if (this.onChangeFunc) {
      this.onChangeFunc(e, value)
    }
  }

  getInputClasses = () => {
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
    return classes.join(' ')
  }

  getContainerClasses() {
    const classes = [styles.container]

    if (styles[this.size]) {
      classes.push(styles[`container-${this.size}`])
    }

    if (this.center) {
      classes.push(styles.center)
    } else {
      classes.push(styles.left)
    }

    return classes.join(' ')
  }

  render() {
    const showError = this.error && this.state.showError
    return (
      <div className={this.getContainerClasses()}>
        {this.label && (
          <label htmlFor={this.id} style={this.labelFontSize}>
            {this.label}
          </label>
        )}
        <input
          onChange={this.onChange}
          placeholder={this.placeholder}
          type={this.type}
          id={this.id}
          name={this.name}
          value={this.state.value}
          style={this.styleObj}
          className={this.getInputClasses()}
          disabled={this.disabled}
          required={this.required}
        />
        {showError && <p className={styles.error}>{this.error}</p>}
      </div>
    )
  }
}
