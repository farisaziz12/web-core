import React from 'react'
import { Button } from './main'

export class ShowButton extends Button {
  constructor(props) {
    super(props)
    const { onClick, children } = props

    this.onClickFunc = onClick
    this.children = children
  }

  state = { show: false }

  onClick(e) {
    if (this.onClickFunc) {
      this.onClickFunc(e)
    } else {
      this.setState((prevState) => {
        return { show: !prevState.show }
      })
    }
  }

  render() {
    const { show } = this.state
    return (
      <div>
        {show && this.children}
        {this.renderButton()}
      </div>
    )
  }
}
