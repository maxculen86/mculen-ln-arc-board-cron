'use strict'

import React, { PureComponent } from 'react'
import ButtonComponent from '../components/button'

export default class Button extends PureComponent {
  render() {
    return (
      <ButtonComponent
        {...this.props}
      >
        {this.props.children}
      </ButtonComponent>)
  }
}