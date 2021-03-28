import React, { Component } from 'react'
import { pathOr } from 'ramda'
import { Input, Button } from '../index'
import autoBind from 'auto-bind'

export class Form extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
    const {
      inputs,
      required = false,
      btnClassName,
      btnStyle = {},
      btnProps = {},
      style = {},
      className,
      onSubmit,
      onChange
    } = props

    this.state = {
      required
    }

    this.handleChangeFunc = onChange
    this.onSubmitFunc = onSubmit
    this.style = style
    this.className = className
    this.btnProps = btnProps
    this.required = required
    this.btnClassName = btnClassName
    this.btnStyle = btnStyle
    this.inputs = inputs[0] ? inputs : []

    this.styleObj = { ...style, width: '200px' }
  }

  handleSubmit(e) {
    e.preventDefault()
    const formInputs = Array.from(e.target.querySelectorAll('input'))
    const formValues = {}
    formInputs.map((input, index) => {
      const { value } = input
      let label = pathOr('', ['labels', 0, 'textContent'], input)
      label = label
        ? label
            .replace(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g, '')
            .replace(/\s/g, '_')
            .toLowerCase()
        : index + 1

      if (label && value) {
        formValues[label] = value
      }
    })

    if (this.onSubmitFunc) {
      this.onSubmitFunc(e, formValues)
    }
  }

  handleChange(e) {
    if (this.state.required) {
      e.persist()
      const formInputs = Array.from(e.target.form.querySelectorAll('input'))
      const isCompleted = formInputs
        .map((input) => {
          if (input.required) {
            return !!input.value
          } else {
            return true
          }
        })
        .every((value) => value === true)

      this.setState({ required: !isCompleted })
    }

    if (this.onChangeFunc) {
      this.onChangeFunc(e)
    }
  }
  // TODO: Fix required/disabled form button issue with this.props
  render() {
    return (
      <form
        style={this.styleObj}
        className={this.className}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      >
        {this.inputs.map((props = {}) => {
          const { id } = props
          return <Input key={id} {...props} />
        })}
        <Button
          type='submit'
          text='submit'
          className={this.btnClassName}
          style={this.btnStyle}
          disabled={this.state.required}
          {...this.btnProps}
        />
      </form>
    )
  }
}
